import {
    getTopicStatus
} from "../features/progress-tracker.js";

import {
    navigate
} from "../features/navigation.js";

export function renderTopicCard(topic) {

    const status = getTopicStatus(topic.id);
    const completed = status === "completed";
    const inProgress = status === "in-progress";

    return `
        <article
            class="topic-card"
            data-topic-id="${topic.id}"
            tabindex="0"
            role="link"
        >

            <div style="
                display:flex;
                justify-content:space-between;
                gap:10px;
            ">

                <div class="topic-card-title">
                    ${topic.title}
                </div>

                <span class="badge ${
                    topic.difficulty === "Beginner"
                        ? "badge-beginner"
                        : topic.difficulty === "Intermediate"
                            ? "badge-intermediate"
                            : "badge-advanced"
                }">
                    ${topic.difficulty}
                </span>

            </div>

            <div class="topic-card-description">
                ${topic.description}
            </div>

            <div style="
                margin-top:14px;
                color:${
                    completed
                        ? "var(--success)"
                        : inProgress
                            ? "var(--info)"
                            : "var(--text-muted)"
                };
                font-size:12px;
            ">
                ${completed
                    ? "✓ Completed"
                    : inProgress
                        ? "● In progress"
                        : "○ Not started"
                }
            </div>

        </article>
    `;
}

export function bindTopicCardEvents() {

    document
        .querySelectorAll("[data-topic-id]")
        .forEach(card => {

            const open = () => {
                navigate("topic", {
                    topicId: card.dataset.topicId
                });
            };

            card.addEventListener("click", open);

            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open();
                }
            });

        });
}