import { renderTopicCard } from "./topic-card.js";
import { bindTopicCardEvents } from "./topic-card.js";
import { getTopicStatus } from "../features/progress-tracker.js";

export function renderRoadmap(roadmap) {
    return `
        <div class="roadmap-container">
            ${roadmap
                .map((milestone) => {
                    const done = milestone.topics.filter(
                        (topic) => getTopicStatus(topic.id) === "completed"
                    ).length;

                    return `
                        <section class="milestone reveal-on-scroll" data-milestone="${milestone.id}">
                            <button class="milestone-header" type="button" data-toggle-milestone>
                                <div class="milestone-number">${milestone.number}</div>
                                <div class="milestone-info">
                                    <div class="milestone-title">${milestone.title}</div>
                                    <div class="milestone-description">${milestone.description}</div>
                                </div>
                                <span class="badge">${done}/${milestone.topics.length} done</span>
                            </button>
                            <div class="milestone-body">
                                ${milestone.topics.map(renderTopicCard).join("")}
                            </div>
                        </section>
                    `;
                })
                .join("")}
        </div>
    `;
}

export function bindRoadmapEvents() {
    bindTopicCardEvents();

    document.querySelectorAll("[data-toggle-milestone]").forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".milestone")?.classList.toggle("collapsed");
        });
    });
}
