
import {
    initializeNavigation,
    onRouteChange
} from "./features/navigation.js";

import {
    initializeTheme
} from "./features/theme.js";

import {
    renderSidebar,
    bindSidebarEvents
} from "./components/sidebar.js";

import {
    renderHeader,
    bindHeaderEvents
} from "./components/header.js";

import {
    renderDashboard,
    bindDashboardEvents
} from "./pages/dashboard.js";

import {
    renderRoadmapPage,
    bindRoadmapPageEvents
} from "./pages/roadmap-page.js";

import {
    renderTopicPage,
    bindTopicPageEvents
} from "./pages/topic-page.js";

import {
    renderLabsPage,
    bindLabsPageEvents
} from "./pages/labs-page.js";

import {
    renderInterviewPage,
    bindInterviewPageEvents
} from "./pages/interview-page.js";

import {
    renderProgressPage,
    bindProgressPageEvents
} from "./pages/progress-page.js";

const app = document.getElementById("app");

function renderApplicationShell() {

    app.innerHTML = `
        <div class="app-shell">

            ${renderSidebar()}

            <div class="app-main">

                ${renderHeader()}

                <main
                    class="main-content"
                    id="main-content"
                >
                </main>

            </div>

        </div>
    `;

    bindSidebarEvents();
    bindHeaderEvents();
}

function renderPage(route) {

    const container =
        document.getElementById(
            "main-content"
        );

    if (!container) {
        return;
    }

    switch (route.name) {

        case "dashboard":

            container.innerHTML =
                renderDashboard();

            bindDashboardEvents();

            break;

        case "roadmap":

            container.innerHTML =
                renderRoadmapPage();

            bindRoadmapPageEvents();

            break;

        case "topic":

            container.innerHTML =
                renderTopicPage(
                    route.params?.topicId
                );

            bindTopicPageEvents(
                route.params?.topicId
            );

            break;

        case "labs":

            container.innerHTML =
                renderLabsPage();

            bindLabsPageEvents();

            break;

        case "interview":

            container.innerHTML =
                renderInterviewPage();

            bindInterviewPageEvents();

            break;

        case "progress":

            container.innerHTML =
                renderProgressPage();

            bindProgressPageEvents();

            break;

        default:

            container.innerHTML =
                renderDashboard();

            bindDashboardEvents();

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function startApplication() {

    initializeTheme();

    initializeNavigation();

    renderApplicationShell();

    onRouteChange(
        renderPage
    );

    const initialHash =
        window.location.hash
            .replace("#", "");

    renderPage({
        name:
            initialHash || "dashboard",
        params: {}
    });
}

startApplication();