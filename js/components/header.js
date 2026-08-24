import {
    navigate
} from "../features/navigation.js";

import {
    toggleTheme
} from "../features/theme.js";

export function renderHeader() {

    return `
        <header class="app-header">

            <div class="header-left">

                <div class="breadcrumb">
                    Kubernetes
                    <span>/</span>
                    Learning OS
                </div>

            </div>

            <div class="header-actions">

                <button
                    class="search-trigger"
                    id="search-trigger"
                >
                    <span>⌕</span>
                    <span>Search topics...</span>
                    <kbd>Ctrl K</kbd>
                </button>

                <button
                    class="icon-btn"
                    id="theme-toggle"
                    title="Toggle theme"
                >
                    ◐
                </button>

            </div>

        </header>
    `;
}

export function bindHeaderEvents() {

    document
        .getElementById("theme-toggle")
        ?.addEventListener(
            "click",
            toggleTheme
        );

    document
        .getElementById("search-trigger")
        ?.addEventListener(
            "click",
            () => navigate("roadmap")
        );
}