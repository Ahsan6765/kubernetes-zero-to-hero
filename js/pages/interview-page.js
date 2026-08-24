import {
    renderInterviewCard
} from "../components/interview-card.js";

const questions = [
    {
        question:
            "What is Kubernetes?",

        difficulty:
            "Beginner",

        answer:
            "Kubernetes is a platform for managing containerized workloads using declarative configuration and automation."
    },

    {
        question:
            "What is a Pod?",

        difficulty:
            "Beginner",

        answer:
            "A Pod is the smallest deployable unit in Kubernetes and represents one or more containers that share networking and storage context."
    },

    {
        question:
            "Why does Kubernetes use Deployments?",

        difficulty:
            "Intermediate",

        answer:
            "Deployments provide declarative management of stateless application workloads, including replica management and controlled updates."
    },

    {
        question:
            "What problem does a Kubernetes Service solve?",

        difficulty:
            "Intermediate",

        answer:
            "A Service provides a stable network endpoint for accessing a dynamic set of Pods."
    }
];

export function renderInterviewPage() {

    return `
        <div class="page-header">

            <div class="page-title">
                Kubernetes Interview Preparation
            </div>

            <div class="page-subtitle">
                Practice conceptual, practical and
                scenario-based Kubernetes questions.
            </div>

        </div>

        <div style="
            display:flex;
            flex-direction:column;
            gap:14px;
        ">

            ${questions
                .map(renderInterviewCard)
                .join("")}

        </div>
    `;
}

export function bindInterviewPageEvents() {}