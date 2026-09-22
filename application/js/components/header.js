import { getPageTitle } from "../features/navigation.js?v=20260922-3";
import { toggleTheme } from "../features/theme.js";
import { openSearch } from "../features/search.js";
import { setSidebarOpen } from "./sidebar.js";

const ROUTE_CRUMBS = {
    dashboard: "Dashboard",
    roadmap: "Roadmap",
    topic: "Topic",
    labs: "Labs",
    interview: "Interview",
    progress: "My Progress"
};

export function renderHeader() {
    return `
        <header class="app-header">
            <div class="header-left">
                <button
                    class="icon-btn menu-toggle"
                    id="menu-toggle"
                    aria-label="Open navigation"
                    type="button"
                >
                    ☰
                </button>

                <div class="breadcrumb" id="breadcrumb">
                    Kubernetes
                    <span>/</span>
                    Dashboard
                </div>
            </div>

            <div class="header-actions">
                <button class="search-trigger" id="search-trigger" type="button">
                    <span>⌕</span>
                    <span class="search-trigger-label">Search topics...</span>
                    <kbd>Ctrl K</kbd>
                </button>

                <button
                    class="icon-btn"
                    id="theme-toggle"
                    title="Toggle theme"
                    type="button"
                    aria-label="Toggle theme"
                >
                    ◐
                </button>
            </div>
        </header>
    `;
}

export function updateHeader(route, topicTitle) {
    const crumb = document.getElementById("breadcrumb");

    if (!crumb) {
        return;
    }

    const page = topicTitle || ROUTE_CRUMBS[route.name] || getPageTitle(route);

    crumb.innerHTML = `
        Kubernetes
        <span>/</span>
        ${page}
    `;
}

export function bindHeaderEvents() {
    document
        .getElementById("theme-toggle")
        ?.addEventListener("click", toggleTheme);

    document
        .getElementById("search-trigger")
        ?.addEventListener("click", openSearch);

    document.getElementById("menu-toggle")?.addEventListener("click", () => {
        const open = !document.body.classList.contains("sidebar-open");
        setSidebarOpen(open);
    });

    document.addEventListener("keydown", (event) => {
        const isSearch =
            (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

        if (isSearch) {
            event.preventDefault();
            openSearch();
        }

        if (event.key === "Escape") {
            document.body.classList.remove("sidebar-open");
        }
    });
}
