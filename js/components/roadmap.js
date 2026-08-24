import {
    renderTopicCard
} from "./topic-card.js";

import {
    bindTopicCardEvents
} from "./topic-card.js";

export function renderRoadmap(
    roadmap
) {

    return `
        <div class="roadmap-container">

            ${roadmap.map(
                milestone => `
                    <section
                        class="milestone"
                    >

                        <div
                            class="milestone-header"
                        >

                            <div
                                class="milestone-number"
                            >
                                ${milestone.number}
                            </div>

                            <div
                                class="milestone-info"
                            >

                                <div
                                    class="milestone-title"
                                >
                                    ${milestone.title}
                                </div>

                                <div
                                    class="milestone-description"
                                >
                                    ${milestone.description}
                                </div>

                            </div>

                            <span class="badge">
                                ${milestone.topics.length}
                                topics
                            </span>

                        </div>

                        <div
                            class="milestone-body"
                        >

                            ${milestone.topics
                                .map(
                                    renderTopicCard
                                )
                                .join("")}

                        </div>

                    </section>
                `
            ).join("")}

        </div>
    `;
}

export function bindRoadmapEvents() {
    bindTopicCardEvents();
}