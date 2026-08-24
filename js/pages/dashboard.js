import {
    getAllTopics,
    getNextIncompleteTopic,
    roadmap
} from "../data/catalog.js";

import { labs } from "../data/labs.js";

import {
    calculateOverallProgress,
    getCompletedTopicCount
} from "../features/progress-tracker.js";

import { getCompletedLabCount } from "../features/labs-tracker.js";
import { navigate } from "../features/navigation.js";
import { renderProgressBar } from "../components/progress.js";
import { escapeHtml } from "../utils/helpers.js";

export function renderDashboard() {
    const progress = calculateOverallProgress(roadmap);
    const completed = getCompletedTopicCount(roadmap);
    const total = getAllTopics().length;
    const nextTopic = getNextIncompleteTopic();
    const labsDone = getCompletedLabCount(labs);

    return `
        <div class="page-header">
            <div class="page-title">Kubernetes Learning Dashboard</div>
            <div class="page-subtitle">
                Your journey from Kubernetes beginner to production-ready engineer.
            </div>
        </div>

        <div class="dashboard-grid">
            <section class="dashboard-hero">
                <span class="badge badge-beginner">ZERO → HERO</span>
                <h1>
                    Master Kubernetes
                    <span class="gradient-text">step by step.</span>
                </h1>
                <p>
                    Learn Kubernetes through concepts, architecture, hands-on labs,
                    simulations, troubleshooting and interview preparation.
                </p>
                <div class="hero-actions">
                    <button class="btn btn-primary" id="continue-learning" type="button">
                        Continue Learning →
                    </button>
                    <button class="btn btn-secondary" id="view-roadmap" type="button">
                        View Roadmap
                    </button>
                </div>
            </section>

            <section class="dashboard-progress-card card">
                <div class="section-title">Overall Progress</div>
                <div class="progress-percent">${progress}%</div>
                ${renderProgressBar(progress)}
                <div class="muted-meta">
                    ${completed} of ${total} topics completed
                </div>
            </section>

            <section class="stat-grid">
                ${statCard("Milestones", roadmap.length)}
                ${statCard("Topics", total)}
                ${statCard("Completed", completed)}
                ${statCard("Labs done", `${labsDone}/${labs.length}`)}
            </section>

            <section class="continue-card card">
                <div class="section-title">Continue Learning</div>
                <div class="next-topic-box">
                    <div class="muted-kicker">NEXT TOPIC</div>
                    <div class="next-topic-title">
                        ${escapeHtml(nextTopic?.title || "Start your journey")}
                    </div>
                    <div class="next-topic-copy">
                        ${escapeHtml(nextTopic?.description || "")}
                    </div>
                    <button
                        class="btn btn-primary"
                        id="start-next-topic"
                        type="button"
                        data-topic-id="${nextTopic?.id || ""}"
                    >
                        Start Topic
                    </button>
                </div>
            </section>

            <section class="activity-card card">
                <div class="section-title">Learning System</div>
                <div class="activity-item"><span class="activity-dot"></span><span>Concept-based learning</span></div>
                <div class="activity-item"><span class="activity-dot"></span><span>Interactive simulations</span></div>
                <div class="activity-item"><span class="activity-dot"></span><span>Hands-on Kubernetes labs</span></div>
                <div class="activity-item"><span class="activity-dot"></span><span>Interview preparation</span></div>
            </section>
        </div>
    `;
}

function statCard(label, value) {
    return `
        <div class="stat-card card">
            <div class="stat-label">${label}</div>
            <div class="stat-value">${value}</div>
        </div>
    `;
}

export function bindDashboardEvents() {
    const nextId = document.getElementById("start-next-topic")?.dataset.topicId;

    const openNext = () => {
        if (nextId) {
            navigate("topic", { topicId: nextId });
            return;
        }

        navigate("roadmap");
    };

    document
        .getElementById("continue-learning")
        ?.addEventListener("click", openNext);

    document
        .getElementById("view-roadmap")
        ?.addEventListener("click", () => navigate("roadmap"));

    document
        .getElementById("start-next-topic")
        ?.addEventListener("click", openNext);
}
