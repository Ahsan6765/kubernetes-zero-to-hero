import {
    getCurrentRoute,
    navigate
} from "../features/navigation.js";

export function renderSidebar() {
    const current = getCurrentRoute().name;

    return `
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-brand">
                <div class="brand-mark">K8</div>
                <div>
                    <div class="brand-title">K8s Zero → Hero</div>
                    <div class="brand-subtitle">Learning OS</div>
                </div>
            </div>

            <nav class="sidebar-nav" aria-label="Primary">
                <div class="nav-section-label">LEARNING</div>
                ${navItem("dashboard", "⌂", "Dashboard", current)}
                ${navItem("roadmap", "◎", "Roadmap", current)}
                ${navItem("labs", "⌘", "Labs", current)}
                ${navItem("interview", "◈", "Interview", current)}

                <div class="nav-section-label">TRACKING</div>
                ${navItem("progress", "◉", "My Progress", current)}
            </nav>

            <div class="sidebar-footer">
                <div class="sidebar-version">v0.1.0</div>
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
