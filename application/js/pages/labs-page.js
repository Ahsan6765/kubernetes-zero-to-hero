import { labs } from "../data/labs.js";
import { renderLabCard } from "../components/lab-card.js";
import { closeModal, openModal } from "../components/modal.js";
import {
    isLabComplete,
    markLabComplete
} from "../features/labs-tracker.js";
import { escapeHtml } from "../utils/helpers.js";

export function renderLabsPage() {
    return `
        <div class="page-header">
            <div class="page-title">Kubernetes Labs</div>
            <div class="page-subtitle">
                Practice what you learn through guided, simulated kubectl sessions.
            </div>
        </div>

        <div class="labs-grid">
            ${labs.map((lab) => renderLabCard(lab, isLabComplete(lab.id))).join("")}
        </div>
    `;
}

export function bindLabsPageEvents() {
    document.querySelectorAll("[data-lab-id]").forEach((button) => {
        button.addEventListener("click", () => {
            const lab = labs.find((item) => item.id === button.dataset.labId);

            if (lab) {
                openLabRunner(lab);
            }
        });
    });
}

function openLabRunner(lab) {
    let stepIndex = 0;
    let revealed = false;

    const render = () => {
        const step = lab.steps[stepIndex];
        const last = stepIndex === lab.steps.length - 1;

        const modal = document.getElementById("global-modal");
        const body = modal?.querySelector(".lab-runner");

        const html = `
            <div class="lab-runner">
                <div class="muted-kicker">LAB ${stepIndex + 1} / ${lab.steps.length}</div>
                <h2>${escapeHtml(lab.title)}</h2>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.detail)}</p>

                <div class="lab-terminal">
                    <div class="terminal-header">
                        <span class="terminal-dot"></span>
                        <span class="terminal-dot"></span>
                        <span class="terminal-dot"></span>
                        <span class="terminal-title">kubectl</span>
                    </div>
                    <div class="terminal-body">
                        <div><span class="prompt">$</span> ${escapeHtml(step.command)}</div>
                        ${
                            revealed
                                ? `<pre class="terminal-output">${escapeHtml(step.output)}</pre>`
                                : ""
                        }
                    </div>
                </div>

                <div class="topic-actions">
                    <button class="btn btn-primary" id="lab-run" type="button">
                        ${revealed ? (last ? "Complete lab" : "Next step") : "Run command"}
                    </button>
                    <button class="btn btn-secondary" id="lab-close" type="button">Close</button>
                </div>
            </div>
        `;

        if (body) {
            body.outerHTML = html;
        } else {
            openModal(html);
        }

        document.getElementById("lab-close")?.addEventListener("click", closeModal);

        document.getElementById("lab-run")?.addEventListener("click", () => {
            if (!revealed) {
                revealed = true;
                render();
                return;
            }

            if (!last) {
                stepIndex += 1;
                revealed = false;
                render();
                return;
            }

            markLabComplete(lab.id);
            closeModal();

            const container = document.getElementById("main-content");

            if (container) {
                container.innerHTML = renderLabsPage();
                bindLabsPageEvents();
            }
        });
    };

    render();
}
