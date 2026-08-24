import {
    renderLabCard
} from "../components/lab-card.js";

const labs = [
    {
        id: "first-pod",
        icon: "☸",
        title: "Create Your First Pod",
        description:
            "Learn how Kubernetes creates and manages a basic Pod.",
        difficulty: "Beginner",
        duration: "10 min"
    },
    {
        id: "deployment",
        icon: "🚀",
        title: "Deploy an Application",
        description:
            "Create a Deployment and understand replicas.",
        difficulty: "Beginner",
        duration: "15 min"
    },
    {
        id: "service",
        icon: "🌐",
        title: "Expose an Application",
        description:
            "Understand how Services provide stable networking.",
        difficulty: "Intermediate",
        duration: "20 min"
    }
];

export function renderLabsPage() {

    return `
        <div class="page-header">

            <div class="page-title">
                Kubernetes Labs
            </div>

            <div class="page-subtitle">
                Practice what you learn through
                guided hands-on exercises.
            </div>

        </div>

        <div class="labs-grid">

            ${labs
                .map(renderLabCard)
                .join("")}

        </div>
    `;
}

export function bindLabsPageEvents() {

    document
        .querySelectorAll("[data-lab-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    alert(
                        "Interactive lab engine will be implemented in a later milestone."
                    );

                }
            );

        });
}