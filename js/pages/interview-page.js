import { renderInterviewCard } from "../components/interview-card.js";

const questions = [
    {
        question: "What is Kubernetes?",
        difficulty: "Beginner",
        answer:
            "Kubernetes is a platform for managing containerized workloads using declarative configuration and automation."
    },
    {
        question: "What is a Pod?",
        difficulty: "Beginner",
        answer:
            "A Pod is the smallest deployable unit in Kubernetes and represents one or more containers that share networking and storage context."
    },
    {
        question: "Why does Kubernetes use Deployments?",
        difficulty: "Intermediate",
        answer:
            "Deployments provide declarative management of stateless application workloads, including replica management and controlled updates."
    },
    {
        question: "What problem does a Kubernetes Service solve?",
        difficulty: "Intermediate",
        answer:
            "A Service provides a stable network endpoint for accessing a dynamic set of Pods."
    },
    {
        question: "How do you debug a CrashLoopBackOff?",
        difficulty: "Advanced",
        answer:
            "Read kubectl describe for exit codes and probes, then kubectl logs --previous. Common causes are bad commands, missing config, or overly aggressive liveness probes."
    },
    {
        question: "What is the difference between a request and a limit?",
        difficulty: "Intermediate",
        answer:
            "Requests are used for scheduling and guaranteed capacity. Limits cap usage; exceeding a memory limit typically OOMKills the container."
    },
    {
        question: "When would you use a StatefulSet instead of a Deployment?",
        difficulty: "Advanced",
        answer:
            "When replicas need stable network identity, ordered start/stop, or dedicated persistent volumes — typical for databases and message brokers."
    }
];

export function renderInterviewPage(filter = "All") {
    const visible =
        filter === "All"
            ? questions
            : questions.filter((item) => item.difficulty === filter);

    return `
        <div class="page-header">
            <div class="page-title">Kubernetes Interview Preparation</div>
            <div class="page-subtitle">
                Practice conceptual, practical and scenario-based Kubernetes questions.
            </div>
        </div>

        <div class="filter-row" id="interview-filters">
            ${["All", "Beginner", "Intermediate", "Advanced"]
                .map(
                    (item) => `
                    <button
                        class="chip ${item === filter ? "chip-active" : ""}"
                        type="button"
                        data-filter="${item}"
                    >
                        ${item}
                    </button>
                `
                )
                .join("")}
        </div>

        <div class="interview-list">
            ${
                visible.length
                    ? visible.map(renderInterviewCard).join("")
                    : `<div class="empty-state"><p>No questions in this filter yet.</p></div>`
            }
        </div>
    `;
}

export function bindInterviewPageEvents() {
    document.querySelectorAll("#interview-filters [data-filter]").forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            const container = document.getElementById("main-content");

            if (!container) {
                return;
            }

            container.innerHTML = renderInterviewPage(filter);
            bindInterviewPageEvents();
        });
    });
}
