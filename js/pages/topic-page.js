import { roadmap } from "../data/roadmap.js";

import {
    markTopicComplete,
    getTopicStatus
} from "../features/progress-tracker.js";

import {
    navigate
} from "../features/navigation.js";

function findTopic(topicId) {

    for (const milestone of roadmap) {

        const topic =
            milestone.topics.find(
                item => item.id === topicId
            );

        if (topic) {
            return {
                topic,
                milestone
            };
        }
    }

    return null;
}

export function renderTopicPage(
    topicId
) {

    const result =
        findTopic(topicId);

    if (!result) {

        return `
            <div class="empty-state">
                <div class="empty-state-icon">
                    ⚠
                </div>

                <h2>
                    Topic not found
                </h2>

                <p>
                    The requested topic does not exist.
                </p>

                <button
                    class="btn btn-primary"
                    id="back-roadmap"
                    style="margin-top:18px;"
                >
                    Back to Roadmap
                </button>
            </div>
        `;
    }

    const {
        topic,
        milestone
    } = result;

    const status =
        getTopicStatus(topic.id);

    return `
        <div class="topic-layout">

            <main class="topic-main">

                <section class="topic-hero">

                    <span class="badge ${
                        topic.difficulty === "Beginner"
                            ? "badge-beginner"
                            : topic.difficulty === "Intermediate"
                                ? "badge-intermediate"
                                : "badge-advanced"
                    }">
                        ${topic.difficulty}
                    </span>

                    <h1>
                        ${topic.title}
                    </h1>

                    <p>
                        ${topic.description}
                    </p>

                    <div class="topic-actions">

                        <button
                            class="btn ${
                                status === "completed"
                                    ? "btn-secondary"
                                    : "btn-primary"
                            }"
                            id="complete-topic"
                        >
                            ${
                                status === "completed"
                                    ? "✓ Completed"
                                    : "Mark as Complete"
                            }
                        </button>

                        <button
                            class="btn btn-secondary"
                            id="back-roadmap"
                        >
                            ← Roadmap
                        </button>

                    </div>

                </section>

                <section class="topic-section">

                    <h2>
                        What is it?
                    </h2>

                    <p>
                        ${getOverview(topic)}
                    </p>

                </section>

                <section class="topic-section">

                    <h2>
                        Why does it exist?
                    </h2>

                    <p>
                        ${getWhy(topic)}
                    </p>

                </section>

                <section class="topic-section">

                    <h2>
                        Key Points
                    </h2>

                    <ul>
                        ${getKeyPoints(topic)
                            .map(
                                point =>
                                    `<li>${point}</li>`
                            )
                            .join("")
                        }
                    </ul>

                </section>

                <section class="topic-section">

                    <h2>
                        Example
                    </h2>

                    <pre class="code-block"><code>${getExample(topic)}</code></pre>

                </section>

                <section class="topic-section">

                    <h2>
                        Learning Path
                    </h2>

                    <p>
                        This topic belongs to:
                        <strong>
                            ${milestone.title}
                        </strong>
                    </p>

                </section>

            </main>

            <aside class="topic-sidebar">

                <div class="card">

                    <div class="card-header">
                        <strong>
                            Prerequisites
                        </strong>
                    </div>

                    <div class="card-body">

                        ${
                            topic.prerequisites?.length
                                ? `
                                    <div class="prerequisite-list">
                                        ${topic.prerequisites
                                            .map(
                                                item =>
                                                    `<div class="prerequisite-item">${item}</div>`
                                            )
                                            .join("")
                                        }
                                    </div>
                                `
                                : `
                                    <div style="
                                        color:var(--success);
                                        font-size:13px;
                                    ">
                                        ✓ No prerequisites
                                    </div>
                                `
                        }

                    </div>

                </div>

            </aside>

        </div>
    `;
}

function getOverview(topic) {

    if (topic.overview) {
        return topic.overview;
    }

    return topic.description;
}

function getWhy(topic) {

    if (topic.why) {
        return topic.why;
    }

    return "This topic exists because it solves an important problem in Kubernetes application management.";
}

function getKeyPoints(topic) {

    if (topic.keyPoints) {
        return topic.keyPoints;
    }

    return [
        "Understand the core concept.",
        "Understand how it fits into Kubernetes.",
        "Understand when it should be used.",
        "Understand common operational considerations."
    ];
}

function getExample(topic) {

    if (topic.example) {
        return topic.example;
    }

    return `# Example for ${topic.title}`;
}

export function bindTopicPageEvents(
    topicId
) {

    document
        .getElementById("complete-topic")
        ?.addEventListener(
            "click",
            () => {

                markTopicComplete(
                    topicId
                );

                renderTopicPage(topicId);

                window.location.reload();

            }
        );

    document
        .getElementById("back-roadmap")
        ?.addEventListener(
            "click",
            () => navigate("roadmap")
        );
}