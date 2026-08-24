import { roadmap } from "../data/roadmap.js";

import {
    calculateOverallProgress,
    getCompletedTopicCount
} from "../features/progress-tracker.js";

import {
    renderProgressBar
} from "../components/progress.js";

export function renderProgressPage() {

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

    return `
        <div class="page-header">

            <div class="page-title">
                My Progress
            </div>

            <div class="page-subtitle">
                Track your journey toward
                Kubernetes mastery.
            </div>

        </div>

        <div class="card" style="padding:28px;">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:end;
                margin-bottom:14px;
            ">

                <div>
                    <div style="
                        color:var(--text-muted);
                        font-size:12px;
                    ">
                        OVERALL COMPLETION
                    </div>

                    <div style="
                        margin-top:4px;
                        font-size:36px;
                        font-weight:800;
                    ">
                        ${progress}%
                    </div>
                </div>

                <div style="
                    color:var(--text-secondary);
                    font-size:13px;
                ">
                    ${completed} / ${total} topics
                </div>

            </div>

            ${renderProgressBar(progress)}

        </div>

        <div style="
            margin-top:20px;
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            gap:16px;
        ">

            ${roadmap.map(
                milestone => `
                    <div
                        class="card"
                        style="padding:20px;"
                    >

                        <div style="
                            font-weight:700;
                        ">
                            ${milestone.number}.
                            ${milestone.title}
                        </div>

                        <div style="
                            margin-top:7px;
                            color:var(--text-secondary);
                            font-size:12px;
                        ">
                            ${milestone.topics.length}
                            topics
                        </div>

                    </div>
                `
            ).join("")}

        </div>
    `;
}

export function bindProgressPageEvents() {}