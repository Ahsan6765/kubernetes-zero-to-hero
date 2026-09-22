import {
    getCurrentRoute,
    navigate
} from "../features/navigation.js?v=20260922-3";

export function renderSidebar() {
    const current = getCurrentRoute().name;

    return `
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-brand">
                <div class="brand-mark">K8</div>
                <div class="brand-copy">
                    <div class="brand-title">Kubernetes</div>
                    <div class="brand-subtitle">Zero → Hero</div>
                </div>
            </div>

            <div class="sidebar-groups">
                <nav class="sidebar-nav" aria-label="Primary learning navigation">
                    <div class="nav-section-label">Learn</div>
                    <div class="nav-group">
                        ${navItem("dashboard", "⌂", "Dashboard", current)}
                        ${navItem("roadmap", "◎", "Roadmap", current)}
                        ${navItem("labs", "⌘", "Labs", current)}
                        ${navItem("interview", "◈", "Interview", current)}
                    </div>
                </nav>

                <nav class="sidebar-nav" aria-label="Progress tracking navigation">
                    <div class="nav-section-label">Track</div>
                    <div class="nav-group">
                        ${navItem("progress", "◉", "My Progress", current)}
                    </div>
                </nav>
            </div>

            <div class="sidebar-summary">
                <div class="summary-label">Focus</div>
                <div class="summary-value">Cluster Basics</div>
                <div class="summary-progress">
                    <span></span>
                </div>
            </div>

            <div class="sidebar-footer">
                <span class="sidebar-version">v0.2.0</span>
                <span class="sidebar-status">Live practice</span>
            </div>
        </aside>

        <div class="sidebar-overlay" id="sidebar-overlay"></div>
    `;
}

function navItem(route, icon, label, current) {
    const active = current === route ? "active" : "";

    return `
        <button
            class="nav-item ${active}"
            data-route="${route}"
            aria-current="${current === route ? "page" : "false"}"
        >
            <span class="nav-icon">${icon}</span>
            <span>${label}</span>
        </button>
    `;
}

export function setSidebarOpen(open) {
    document.body.classList.toggle("sidebar-open", open);
}

export function closeSidebar() {
    setSidebarOpen(false);
}

export function updateSidebarActive(routeName) {
    document.querySelectorAll(".sidebar [data-route]").forEach((button) => {
        const isActive = button.dataset.route === routeName;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-current", isActive ? "page" : "false");
    });
}

export function bindSidebarEvents() {
    document.querySelectorAll(".sidebar [data-route]").forEach((button) => {
        button.addEventListener("click", () => {
            navigate(button.dataset.route);
            closeSidebar();
        });
    });

    document
        .getElementById("sidebar-overlay")
        ?.addEventListener("click", closeSidebar);
}
