import { getAllTopics } from "../data/catalog.js";
import { navigate } from "./navigation.js";
import { closeModal, openModal } from "../components/modal.js";
import { escapeHtml } from "../utils/helpers.js";

export function searchTopics(query) {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return [];
    }

    return getAllTopics().filter((topic) => {
        const searchable = [
            topic.title,
            topic.description,
            topic.milestoneTitle,
            topic.difficulty
        ]
            .join(" ")
            .toLowerCase();

        return searchable.includes(normalized);
    });
}

export function openSearch() {
    openModal(`
        <div class="search-panel">
            <h2 class="search-title">Search topics</h2>
            <input
                class="search-input"
                id="search-input"
                type="search"
                placeholder="Pods, Services, RBAC..."
                autocomplete="off"
            >
            <div class="search-results" id="search-results">
                <div class="search-hint">Start typing to find a topic.</div>
            </div>
        </div>
    `);

    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");

    input?.focus();

    input?.addEventListener("input", () => {
        renderResults(results, input.value);
    });

    input?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const first = results?.querySelector("[data-topic-id]");
            first?.click();
        }
    });
}

function renderResults(container, query) {
    if (!container) {
        return;
    }

    const matches = searchTopics(query).slice(0, 12);

    if (!query.trim()) {
        container.innerHTML = `<div class="search-hint">Start typing to find a topic.</div>`;
        return;
    }

    if (!matches.length) {
        container.innerHTML = `<div class="search-hint">No topics match “${escapeHtml(query)}”.</div>`;
        return;
    }

    container.innerHTML = matches
        .map(
            (topic) => `
            <button class="search-result" type="button" data-topic-id="${topic.id}">
                <span>
                    <strong>${escapeHtml(topic.title)}</strong>
                    <span class="search-result-meta">${escapeHtml(topic.milestoneTitle)}</span>
                </span>
                <span class="badge badge-${topic.difficulty.toLowerCase()}">${escapeHtml(topic.difficulty)}</span>
            </button>
        `
        )
        .join("");

    container.querySelectorAll("[data-topic-id]").forEach((button) => {
        button.addEventListener("click", () => {
            closeModal();
            navigate("topic", { topicId: button.dataset.topicId });
        });
    });
}
