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
                </div>
            </div>
        </div>
    `);

    const statusEl = modal.querySelector("#sim-status");
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
            } else {
                clusterState[key] = [...new Set([...clusterState[key], item])];
                updateStatus(`${item} scheduled on ${key === "node-a" ? "Node A" : "Node B"}. The scheduler keeps the workload near the service path.`);
            }

            syncNodes();
        });
    });

    modal.querySelector("#run-scheduler")?.addEventListener("click", () => {
        const hasWorkload = Object.values(clusterState).some((items) => items.length);

        if (!hasWorkload) {
            updateStatus("No workload is placed yet. Drag a Pod or Deployment onto a node first.");
            return;
        }

        const nodeLabel = clusterState["node-a"].length ? "Node A" : "Node B";
        const workload = clusterState["node-a"].length ? clusterState["node-a"][0] : clusterState["node-b"][0];
        const ingressReady = clusterState.ingress.length > 0;

        if (ingressReady) {
            updateStatus(`${workload} is running on ${nodeLabel}. The Service is routing traffic to the pod through Ingress.`);
        } else {
            updateStatus(`${workload} is running on ${nodeLabel}. The pod is healthy, but no Service or Ingress is exposing it yet.`);
        }
    });

    modal.querySelector("#trigger-failure")?.addEventListener("click", () => {
        const targetNode = Math.random() > 0.5 ? "node-a" : "node-b";
        const failedResource = clusterState[targetNode][0] || "Pod";

        if (!clusterState[targetNode].length) {
            updateStatus("There is no workload on a node to fail. Place a resource before injecting a failure.");
            return;
        }

        markClusterNode(nodeMap[targetNode], targetNode === "node-a" ? "Node A" : "Node B", `<span class="resource-chip resource-chip-failed">${failedResource}</span> <span class="resource-chip resource-chip-warning">Failed</span>`, "failed");
        updateStatus(`Failure detected on ${targetNode === "node-a" ? "Node A" : "Node B"}. Kubernetes reschedules the workload to keep the service available.`);
    });

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

        const count = canvas.querySelectorAll(".builder-node").length;

        if (resource === "Deployment") {
            updateStatus("Deployment is in place. Add a Service so traffic can reach the pods.");
        } else if (resource === "Service") {
            updateStatus("Service is routing traffic between the Deployment and users.");
        } else if (resource === "Ingress") {
            updateStatus("Ingress is exposing the Service to the outside world.");
        } else if (count >= 3) {
            updateStatus("Architecture is forming correctly. Add ConfigMaps and Secrets to manage configuration and sensitive values.");
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
