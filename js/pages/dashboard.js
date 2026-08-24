import { roadmap } from "../data/roadmap.js";

import {
    calculateOverallProgress,
    getCompletedTopicCount
} from "../features/progress-tracker.js";

import {
    navigate
} from "../features/navigation.js";

import {
    renderProgressBar
} from "../components/progress.js";

export function renderDashboard() {

    const progress =
        calculateOverallProgress(
            roadmap
        );

    const completed =
        getCompletedTopicCount(
            roadmap
        );

    const total =
        roadmap.reduce(
            (sum, milestone) =>
                sum + milestone.topics.length,
            0
        );

    const firstMilestone =
        roadmap[0];

    const nextTopic =
        firstMilestone?.topics?.[0];

    return `
        <div class="page-header">

            <div class="page-title">
                Kubernetes Learning Dashboard
            </div>

            <div class="page-subtitle">
                Your journey from Kubernetes beginner
                to production-ready engineer.
            </div>

        </div>

        <div class="dashboard-grid">

            <section class="dashboard-hero">

                <span class="badge badge-beginner">
                    ZERO → HERO
                </span>

                <h1>
                    Master Kubernetes
                    <span class="gradient-text">
                        step by step.
                    </span>
                </h1>

                <p>
                    Learn Kubernetes through concepts,
                    architecture, hands-on labs,
                    simulations, troubleshooting
                    and interview preparation.
                </p>

                <div style="margin-top:22px;">

                    <button
                        class="btn btn-primary"
                        id="continue-learning"
                    >
                        Continue Learning →
                    </button>

                    <button
                        class="btn btn-secondary"
                        id="view-roadmap"
                        style="margin-left:8px;"
                    >
                        View Roadmap
                    </button>

                </div>

            </section>

            <section class="dashboard-progress-card card">

                <div class="section-title">
                    Overall Progress
                </div>

                <div style="
                    font-size:42px;
                    font-weight:800;
                    margin:12px 0;
                ">
                    ${progress}%
                </div>

                ${renderProgressBar(progress)}

                <div style="
                    margin-top:12px;
                    color:var(--text-secondary);
                    font-size:12px;
                ">
                    ${completed} of ${total}
                    topics completed
                </div>

            </section>

            <section class="stat-grid">

                <div class="stat-card card">
                    <div class="stat-label">
                        Milestones
                    </div>
                    <div class="stat-value">
                        ${roadmap.length}
                    </div>
                </div>

                <div class="stat-card card">
                    <div class="stat-label">
                        Topics
                    </div>
                    <div class="stat-value">
                        ${total}
                    </div>
                </div>

                <div class="stat-card card">
                    <div class="stat-label">
                        Completed
                    </div>
                    <div class="stat-value">
                        ${completed}
                    </div>
                </div>

                <div class="stat-card card">
                    <div class="stat-label">
                        Labs
                    </div>
                    <div class="stat-value">
                        0
                    </div>
                </div>

            </section>

            <section class="continue-card card">

                <div class="section-title">
                    Continue Learning
                </div>

                <div style="
                    padding:18px;
                    border:1px solid var(--border);
                    border-radius:var(--radius-md);
                ">

                    <div style="
                        color:var(--text-muted);
                        font-size:11px;
                    ">
                        NEXT TOPIC
                    </div>

                    <div style="
                        margin-top:5px;
                        font-size:18px;
                        font-weight:700;
                    ">
                        ${nextTopic?.title || "Start your journey"}
                    </div>

                    <div style="
                        margin-top:6px;
                        color:var(--text-secondary);
                        font-size:13px;
                    ">
                        ${nextTopic?.description || ""}
                    </div>

                    <button
                        class="btn btn-primary"
                        id="start-next-topic"
                        style="margin-top:16px;"
                    >
                        Start Topic
                    </button>

                </div>

            </section>

            <section class="activity-card card">

                <div class="section-title">
                    Learning System
                </div>

                <div class="activity-item">
                    <span class="activity-dot"></span>
                    <span>Concept-based learning</span>
                </div>

                <div class="activity-item">
                    <span class="activity-dot"></span>
                    <span>Interactive simulations</span>
                </div>

                <div class="activity-item">
                    <span class="activity-dot"></span>
                    <span>Hands-on Kubernetes labs</span>
                </div>

                <div class="activity-item">
                    <span class="activity-dot"></span>
                    <span>Interview preparation</span>
                </div>

            </section>

        </div>
    `;
}

export function bindDashboardEvents() {

    document
        .getElementById("continue-learning")
        ?.addEventListener(
            "click",
            () => navigate("roadmap")
        );

    document
        .getElementById("view-roadmap")
        ?.addEventListener(
            "click",
            () => navigate("roadmap")
        );

    document
        .getElementById("start-next-topic")
        ?.addEventListener(
            "click",
            () => navigate("roadmap")
        );
}