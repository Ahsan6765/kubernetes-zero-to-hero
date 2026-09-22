import { openModal } from "../components/modal.js";

const clusterResources = ["Pod", "Deployment", "Service", "Ingress", "ConfigMap", "Secret", "Node"];
const builderResources = ["Deployment", "Service", "Ingress", "ConfigMap", "Secret"];

function markClusterNode(node, title, content, variant = "idle") {
    node.classList.remove("node-idle", "node-ok", "node-failed");
    node.classList.add(`node-${variant}`);
    node.innerHTML = `
        <div class="node-header">${title}</div>
        <div class="node-items">${content}</div>
    `;
}

export function openClusterSimulation() {
    const modal = openModal(`
        <div class="simulation-panel">
            <div class="simulation-header">
                <div>
                    <div class="muted-kicker">SIMULATION</div>
                    <h2>Interactive Cluster Simulation</h2>
                </div>
                <span class="badge badge-beginner">Live</span>
            </div>

            <div class="sim-meta-row">
                <span class="chip chip-active">Scheduler</span>
                <span class="chip">Networking</span>
                <span class="chip">Resilience</span>
            </div>

            <div class="sim-steps" aria-label="Simulation stages">
                <div class="sim-step is-active" data-stage="0"><span>1</span>Place workload</div>
                <div class="sim-step" data-stage="1"><span>2</span>Run scheduling</div>
                <div class="sim-step" data-stage="2"><span>3</span>Expose traffic</div>
            </div>

            <div class="sim-layout">
                <div class="sim-palette">
                    <div class="muted-kicker">DRAG RESOURCES</div>
                    ${clusterResources
                        .map(
                            (resource) => `
                                <div class="sim-token" draggable="true" data-resource="${resource}">
                                    ${resource}
                                </div>
                            `
                        )
                        .join("")}
                </div>

                <div class="sim-board">
                    <div class="sim-node" data-node="node-a">
                        <div class="node-header">Node A</div>
                        <div class="node-items">Waiting for workload</div>
                    </div>
                    <div class="sim-node" data-node="node-b">
                        <div class="node-header">Node B</div>
                        <div class="node-items">Waiting for workload</div>
                    </div>
                    <div class="sim-node sim-node-ingress" data-node="ingress">
                        <div class="node-header">Ingress</div>
                        <div class="node-items">Traffic routing</div>
                    </div>
                </div>
            </div>

            <div class="sim-status-panel">
                <div class="sim-status" id="sim-status">
                    Drop workloads onto a node to see how Kubernetes schedules and exposes them.
                </div>
                <div class="sim-actions">
                    <button class="btn btn-primary" id="run-scheduler" type="button">Run scheduling</button>
                    <button class="btn btn-secondary" id="trigger-failure" type="button">Inject failure</button>
                    <button class="btn btn-secondary" id="reset-simulation" type="button">Reset board</button>
                </div>
            </div>
        </div>
    `);

    const statusEl = modal.querySelector("#sim-status");
    const simSteps = [...modal.querySelectorAll(".sim-step")];
    const nodeMap = {
        "node-a": modal.querySelector('[data-node="node-a"]'),
        "node-b": modal.querySelector('[data-node="node-b"]'),
        ingress: modal.querySelector('[data-node="ingress"]')
    };

    let clusterState = {
        "node-a": [],
        "node-b": [],
        ingress: []
    };

    const updateStatus = (message) => {
        if (statusEl) {
            statusEl.textContent = message;
        }
    };

    const getResourceSummary = () => {
        const podWorkloads = Object.values(clusterState).flat().filter((item) => ["Pod", "Deployment"].includes(item)).length;
        const serviceCount = Object.values(clusterState).flat().filter((item) => item === "Service").length;
        const ingressCount = clusterState.ingress.length;
        const nodeCount = Object.values(clusterState).filter((items) => items.length).length;

        return {
            podWorkloads,
            serviceCount,
            ingressCount,
            nodeCount,
            hasWorkload: podWorkloads > 0,
            hasService: serviceCount > 0,
            hasIngress: ingressCount > 0,
            isReady: podWorkloads > 0 && serviceCount > 0 && ingressCount > 0
        };
    };

    const updateSimulationStage = (index) => {
        simSteps.forEach((step, stepIndex) => {
            step.classList.toggle("is-active", stepIndex === index);
        });
    };

    const syncNodes = () => {
        Object.entries(nodeMap).forEach(([key, node]) => {
            if (!node) {
                return;
            }

            const items = clusterState[key];

            if (!items.length) {
                const label = key === "ingress" ? "Traffic routing" : "Waiting for workload";
                markClusterNode(node, key === "ingress" ? "Ingress" : key === "node-a" ? "Node A" : "Node B", label, "idle");
                return;
            }

            const list = items.map((item) => `<span class="resource-chip">${item}</span>`).join("");
            markClusterNode(node, key === "ingress" ? "Ingress" : key === "node-a" ? "Node A" : "Node B", list, key === "ingress" ? "ok" : "idle");
        });
    };

    modal.querySelectorAll(".sim-token").forEach((token) => {
        token.addEventListener("dragstart", (event) => {
            event.dataTransfer?.setData("text/plain", token.dataset.resource || "Pod");
        });

        token.addEventListener("dragend", () => {
            Object.values(nodeMap).forEach((node) => node?.classList.remove("node-hover"));
        });
    });

    Object.entries(nodeMap).forEach(([key, node]) => {
        if (!node) {
            return;
        }

        node.addEventListener("dragover", (event) => {
            event.preventDefault();
            node.classList.add("node-hover");
        });

        node.addEventListener("dragleave", () => {
            node.classList.remove("node-hover");
        });

        node.addEventListener("drop", (event) => {
            event.preventDefault();
            node.classList.remove("node-hover");

            const item = event.dataTransfer?.getData("text/plain") || "Pod";

            if (key === "ingress") {
                clusterState.ingress = [item];
                updateStatus(`${item} is now exposed through the ingress and ready for external traffic.`);
                updateSimulationStage(2);
            } else {
                clusterState[key] = [...new Set([...clusterState[key], item])];
                updateStatus(`${item} scheduled on ${key === "node-a" ? "Node A" : "Node B"}. The scheduler keeps the workload near the service path.`);
                updateSimulationStage(1);
            }

            syncNodes();
        });
    });

    modal.querySelector("#run-scheduler")?.addEventListener("click", () => {
        const hasWorkload = Object.values(clusterState).some((items) => items.length);

        if (!hasWorkload) {
            updateStatus("No workload is placed yet. Drag a Pod or Deployment onto a node first.");
            updateSimulationStage(0);
            return;
        }

        const summary = getResourceSummary();
        const nodeLabel = clusterState["node-a"].length ? "Node A" : "Node B";
        const workload = clusterState["node-a"].length ? clusterState["node-a"][0] : clusterState["node-b"][0];

        if (summary.isReady) {
            updateStatus(`${workload} is running on ${nodeLabel}. The Service and Ingress are healthy and traffic is exposed correctly.`);
            updateSimulationStage(2);
            return;
        }

        if (summary.hasWorkload && summary.hasService) {
            updateStatus(`${workload} is scheduled and the Service is active, but the workload still needs an Ingress path for external access.`);
            updateSimulationStage(1);
            return;
        }

        updateStatus(`${workload} is scheduled on ${nodeLabel}, but Kubernetes still needs a Service and external path to fully expose the app.`);
        updateSimulationStage(1);
    });

    modal.querySelector("#trigger-failure")?.addEventListener("click", () => {
        const targetNode = Math.random() > 0.5 ? "node-a" : "node-b";
        const failedResource = clusterState[targetNode][0] || "Pod";

        if (!clusterState[targetNode].length) {
            updateStatus("There is no workload on a node to fail. Place a resource before injecting a failure.");
            return;
        }

        const fallbackNode = targetNode === "node-a" ? "node-b" : "node-a";
        const fallbackResource = clusterState[fallbackNode][0] || "Pod";

        clusterState[targetNode] = [];
        if (!clusterState[fallbackNode].length) {
            clusterState[fallbackNode] = [failedResource];
        }

        markClusterNode(
            nodeMap[targetNode],
            targetNode === "node-a" ? "Node A" : "Node B",
            `<span class="resource-chip resource-chip-failed">${failedResource}</span> <span class="resource-chip resource-chip-warning">Failed</span>`,
            "failed"
        );

        if (nodeMap[fallbackNode]) {
            markClusterNode(
                nodeMap[fallbackNode],
                fallbackNode === "node-a" ? "Node A" : "Node B",
                `<span class="resource-chip">${fallbackResource}</span> <span class="resource-chip resource-chip-warning">Failover</span>`,
                "ok"
            );
        }

        updateStatus(`Failure detected on ${targetNode === "node-a" ? "Node A" : "Node B"}. Kubernetes relocates the workload to ${fallbackNode === "node-a" ? "Node A" : "Node B"} to preserve availability.`);
        updateSimulationStage(2);
    });

    modal.querySelector("#reset-simulation")?.addEventListener("click", () => {
        clusterState = {
            "node-a": [],
            "node-b": [],
            ingress: []
        };

        syncNodes();
        updateSimulationStage(0);
        updateStatus("Cluster reset. Drop new workloads onto the nodes to explore scheduling and networking again.");
    });

    updateSimulationStage(0);
    syncNodes();
}

export function openArchitectureBuilder() {
    const modal = openModal(`
        <div class="builder-panel">
            <div class="simulation-header">
                <div>
                    <div class="muted-kicker">VISUAL DESIGN</div>
                    <h2>Architecture Builder</h2>
                </div>
                <button class="btn btn-secondary" id="builder-reset" type="button">Reset</button>
            </div>

            <div class="sim-meta-row">
                <span class="chip chip-active">Blueprint</span>
                <span class="chip">Ingress</span>
                <span class="chip">Config</span>
            </div>

            <div class="builder-layout">
                <div class="builder-palette">
                    ${builderResources
                        .map(
                            (resource) => `
                                <button class="builder-component" data-resource="${resource}" type="button">
                                    ${resource}
                                </button>
                            `
                        )
                        .join("")}
                </div>

                <div class="builder-canvas" id="builder-canvas">
                    <div class="builder-empty">Add components to sketch a Kubernetes architecture.</div>
                </div>
            </div>

            <div class="sim-status-panel">
                <div class="sim-status" id="builder-status">
                    Start by placing a Deployment, then attach a Service and Ingress to form a working surface.
                </div>
            </div>
        </div>
    `);

    const canvas = modal.querySelector("#builder-canvas");
    const statusEl = modal.querySelector("#builder-status");

    const updateStatus = (text) => {
        if (statusEl) {
            statusEl.textContent = text;
        }
    };

    const addResource = (resource) => {
        if (!canvas) {
            return;
        }

        const emptyState = canvas.querySelector(".builder-empty");
        if (emptyState) {
            emptyState.remove();
        }

        const node = document.createElement("div");
        node.className = `builder-node resource-${resource.toLowerCase().replace(/\s+/g, "-")}`;
        node.textContent = resource;
        canvas.appendChild(node);

        const resources = Array.from(canvas.querySelectorAll(".builder-node")).map((item) => item.textContent.trim());
        const hasDeployment = resources.includes("Deployment");
        const hasService = resources.includes("Service");
        const hasIngress = resources.includes("Ingress");
        const hasConfig = resources.includes("ConfigMap");
        const hasSecret = resources.includes("Secret");

        if (hasDeployment && hasService && hasIngress) {
            updateStatus("Architecture is healthy. The deployment is exposed through the Service and Ingress path.");
        } else if (resource === "Deployment") {
            updateStatus("Deployment is in place. Add a Service so traffic can reach the pods.");
        } else if (resource === "Service") {
            updateStatus("Service is routing traffic between the Deployment and users.");
        } else if (resource === "Ingress") {
            updateStatus("Ingress is exposing the Service to the outside world.");
        } else if (hasConfig && hasSecret) {
            updateStatus("Configuration and secrets are layered in correctly for production-ready separation of concerns.");
        } else {
            updateStatus("Architecture is forming correctly. Add the missing layer to complete the deployment path.");
        }
    };

    modal.querySelectorAll(".builder-component").forEach((button) => {
        button.addEventListener("click", () => {
            addResource(button.dataset.resource || "Deployment");
        });
    });

    modal.querySelector("#builder-reset")?.addEventListener("click", () => {
        if (!canvas) {
            return;
        }

        canvas.innerHTML = '<div class="builder-empty">Add components to sketch a Kubernetes architecture.</div>';
        updateStatus("Start by placing a Deployment, then attach a Service and Ingress to form a working surface.");
    });
}
