import {
    getTopicStatus
} from "../features/progress-tracker.js";

import {
    navigate
} from "../features/navigation.js";

export function renderTopicCard(topic) {

    const status =
        getTopicStatus(topic.id);

    const completed =
        status === "completed";

    return `
        <article
            class="topic-card"
            data-topic-id="${topic.id}"
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
                        : "var(--text-muted)"
                };
                font-size:12px;
            ">
                ${completed
                    ? "✓ Completed"
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

            card.addEventListener(
                "click",
                () => {

                    navigate(
                        "topic",
                        {
                            topicId:
                                card.dataset.topicId
                        }
                    );

                }
            );

        });
}