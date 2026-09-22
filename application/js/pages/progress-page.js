import { roadmap, getAllTopics, getTopicTitle } from "../data/catalog.js";
import { labs } from "../data/labs.js";
import {
    calculateOverallProgress,
    getCompletedTopicCount,
    getTopicStatus
} from "../features/progress-tracker.js";
import { getCompletedLabCount } from "../features/labs-tracker.js";
import { getAllBookmarks } from "../features/bookmarks.js";
import { renderProgressBar } from "../components/progress.js";
import { navigate } from "../features/navigation.js?v=20260922-3";
import { escapeHtml } from "../utils/helpers.js";

export function renderProgressPage() {
    const progress = calculateOverallProgress(roadmap);
    const completed = getCompletedTopicCount(roadmap);
    const total = getAllTopics().length;
    const bookmarks = getAllBookmarks();
    const labsDone = getCompletedLabCount(labs);

    return `
        <div class="page-header">
            <div class="page-title">My Progress</div>
            <div class="page-subtitle">Track your journey toward Kubernetes mastery.</div>
        </div>

        <div class="card progress-hero-card">
            <div class="progress-hero-row">
                <div>
                    <div class="muted-kicker">OVERALL COMPLETION</div>
                    <div class="progress-percent">${progress}%</div>
                </div>
                <div class="muted-meta">${completed} / ${total} topics · ${labsDone} labs</div>
            </div>
            ${renderProgressBar(progress)}
        </div>

        <div class="progress-grid">
            ${roadmap
                .map((milestone) => {
                    const done = milestone.topics.filter(
                        (topic) => getTopicStatus(topic.id) === "completed"
                    ).length;
                    const pct = Math.round((done / milestone.topics.length) * 100);

                    return `
                        <div class="card milestone-progress-card">
                            <div class="milestone-progress-head">
                                <div>
                                    <div class="card-title-sm">
                                        ${milestone.number}. ${escapeHtml(milestone.title)}
                                    </div>
                                    <div class="muted-meta">${done} / ${milestone.topics.length} topics</div>
                                </div>
                                <strong>${pct}%</strong>
                            </div>
                            ${renderProgressBar(pct)}
                        </div>
                    `;
                })
                .join("")}
        </div>

        <section class="bookmarks-section">
            <h2 class="section-title">Bookmarks</h2>
            ${
                bookmarks.length
                    ? `<div class="bookmark-list">
                        ${bookmarks
                            .map((id) => {
                                const title = getTopicTitle(id);
                                return `<button class="bookmark-chip" type="button" data-bookmark-id="${id}">${escapeHtml(title)}</button>`;
                            })
                            .join("")}
                       </div>`
                    : `<p class="muted-meta">Bookmark topics from a lesson page to see them here.</p>`
            }
        </section>
    `;
}

export function bindProgressPageEvents() {
    document.querySelectorAll("[data-bookmark-id]").forEach((button) => {
        button.addEventListener("click", () => {
            navigate("topic", { topicId: button.dataset.bookmarkId });
        });
    });
}
