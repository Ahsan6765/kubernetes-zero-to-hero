import {
    findTopic,
    getAdjacentTopics,
    getTopicTitle
} from "../data/catalog.js";

import {
    getTopicStatus,
    markTopicComplete,
    setTopicStatus
} from "../features/progress-tracker.js";

import {
    isBookmarked,
    toggleBookmark
} from "../features/bookmarks.js";

import { navigate } from "../features/navigation.js";
import { escapeHtml } from "../utils/helpers.js";

export function renderTopicPage(topicId) {
    const result = findTopic(topicId);

    if (!result) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">⚠</div>
                <h2>Topic not found</h2>
                <p>The requested topic does not exist or the link is incomplete.</p>
                <button class="btn btn-primary" id="back-roadmap" type="button">
                    Back to Roadmap
                </button>
            </div>
        `;
    }

    const { topic, milestone } = result;
    const status = getTopicStatus(topic.id);
    const bookmarked = isBookmarked(topic.id);
    const { previous, next } = getAdjacentTopics(topic.id);
    const completed = status === "completed";

    return `
        <div class="topic-layout">
            <main class="topic-main">
                <section class="topic-hero">
                    <span class="badge ${difficultyClass(topic.difficulty)}">
                        ${escapeHtml(topic.difficulty)}
                    </span>

                    <h1>${escapeHtml(topic.title)}</h1>
                    <p>${escapeHtml(topic.description)}</p>

                    <div class="topic-actions">
                        <button
                            class="btn ${completed ? "btn-secondary" : "btn-primary"}"
                            id="complete-topic"
                            type="button"
                        >
                            ${completed ? "✓ Completed" : "Mark as Complete"}
                        </button>

                        <button class="btn btn-secondary" id="bookmark-topic" type="button">
                            ${bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                        </button>

                        <button class="btn btn-secondary" id="back-roadmap" type="button">
                            ← Roadmap
                        </button>
                    </div>
                </section>

                <section class="topic-section">
                    <h2>What is it?</h2>
                    <p>${escapeHtml(topic.overview)}</p>
                </section>

                <section class="topic-section">
                    <h2>Why does it exist?</h2>
                    <p>${escapeHtml(topic.why || "This topic solves a core problem in running Kubernetes in the real world.")}</p>
                </section>

                <section class="topic-section">
                    <h2>Key Points</h2>
                    <ul>
                        ${(topic.keyPoints || [])
                            .map((point) => `<li>${escapeHtml(point)}</li>`)
                            .join("")}
                    </ul>
                </section>

                <section class="topic-section">
                    <h2>Example</h2>
                    <pre class="code-block"><code>${escapeHtml(topic.example || "")}</code></pre>
                </section>

                <section class="topic-section topic-nav-section">
                    <h2>Keep going</h2>
                    <div class="topic-pager">
                        <button
                            class="btn btn-secondary"
                            id="prev-topic"
                            type="button"
                            ${previous ? `data-topic-id="${previous.id}"` : "disabled"}
                        >
                            ← ${previous ? escapeHtml(previous.title) : "Start"}
                        </button>
                        <button
                            class="btn btn-primary"
                            id="next-topic"
                            type="button"
                            ${next ? `data-topic-id="${next.id}"` : "disabled"}
                        >
                            ${next ? escapeHtml(next.title) : "Roadmap"} →
                        </button>
                    </div>
                </section>
            </main>

            <aside class="topic-sidebar">
                <div class="card">
                    <div class="card-header"><strong>Path</strong></div>
                    <div class="card-body">
                        <div class="muted-kicker">MILESTONE</div>
                        <div class="sidebar-milestone">${escapeHtml(milestone.title)}</div>
                    </div>
                </div>

                <div class="card" style="margin-top:14px;">
                    <div class="card-header"><strong>Prerequisites</strong></div>
                    <div class="card-body">
                        ${
                            topic.prerequisites?.length
                                ? `<div class="prerequisite-list">
                                    ${topic.prerequisites
                                        .map((item) => {
                                            const title = getTopicTitle(item);
                                            return `<button class="prerequisite-item" type="button" data-prereq-id="${item}">${escapeHtml(title)}</button>`;
                                        })
                                        .join("")}
                                   </div>`
                                : `<div class="success-note">✓ No prerequisites</div>`
                        }
                    </div>
                </div>
            </aside>
        </div>
    `;
}

function difficultyClass(difficulty) {
    if (difficulty === "Beginner") return "badge-beginner";
    if (difficulty === "Intermediate") return "badge-intermediate";
    return "badge-advanced";
}

export function bindTopicPageEvents(topicId) {
    if (topicId && findTopic(topicId) && getTopicStatus(topicId) === "not-started") {
        setTopicStatus(topicId, "in-progress");
    }

    const refresh = () => {
        const container = document.getElementById("main-content");

        if (!container) {
            return;
        }

        container.innerHTML = renderTopicPage(topicId);
        bindTopicPageEvents(topicId);
    };

    document.getElementById("complete-topic")?.addEventListener("click", () => {
        markTopicComplete(topicId);
        refresh();
    });

    document.getElementById("bookmark-topic")?.addEventListener("click", () => {
        toggleBookmark(topicId);
        refresh();
    });

    document
        .getElementById("back-roadmap")
        ?.addEventListener("click", () => navigate("roadmap"));

    ["prev-topic", "next-topic"].forEach((id) => {
        document.getElementById(id)?.addEventListener("click", (event) => {
            const idValue = event.currentTarget.dataset.topicId;

            if (idValue) {
                navigate("topic", { topicId: idValue });
            }
        });
    });

    document.querySelectorAll("[data-prereq-id]").forEach((button) => {
        button.addEventListener("click", () => {
            navigate("topic", { topicId: button.dataset.prereqId });
        });
    });
}
