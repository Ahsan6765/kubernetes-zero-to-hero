import {
    initializeNavigation,
    onRouteChange,
    getCurrentRoute
} from "./features/navigation.js";

import { initializeTheme } from "./features/theme.js";

import {
    renderSidebar,
    bindSidebarEvents,
    updateSidebarActive,
    closeSidebar
} from "./components/sidebar.js";

import {
    renderHeader,
    bindHeaderEvents,
    updateHeader
} from "./components/header.js";

import { renderDashboard, bindDashboardEvents } from "./pages/dashboard.js";
import { renderRoadmapPage, bindRoadmapPageEvents } from "./pages/roadmap-page.js";
import { renderTopicPage, bindTopicPageEvents } from "./pages/topic-page.js";
import { renderLabsPage, bindLabsPageEvents } from "./pages/labs-page.js";
import { renderInterviewPage, bindInterviewPageEvents } from "./pages/interview-page.js";
import { renderProgressPage, bindProgressPageEvents } from "./pages/progress-page.js";
import { findTopic } from "./data/catalog.js";

const app = document.getElementById("app");

function renderApplicationShell() {
    app.innerHTML = `
        <div class="app-shell">
            ${renderSidebar()}
            <div class="app-main">
                ${renderHeader()}
                <main class="main-content" id="main-content"></main>
            </div>
        </div>
    `;

    bindSidebarEvents();
    bindHeaderEvents();
}

function renderPage(route) {
    const container = document.getElementById("main-content");

    if (!container) {
        return;
    }

    closeSidebar();
    updateSidebarActive(route.name);

    const topicTitle =
        route.name === "topic"
            ? findTopic(route.params?.topicId)?.topic.title
            : "";

    updateHeader(route, topicTitle);

    if (route.name === "topic" && !route.params?.topicId) {
        navigate("dashboard");
        return;
    }

    switch (route.name) {
        case "dashboard":
            container.innerHTML = renderDashboard();
            bindDashboardEvents();
            break;

        case "roadmap":
            container.innerHTML = renderRoadmapPage();
            bindRoadmapPageEvents();
            break;

        case "topic": {
            const topicExists = !!findTopic(route.params?.topicId)?.topic;

            if (!topicExists) {
                navigate("dashboard");
                return;
            }

            container.innerHTML = renderTopicPage(route.params?.topicId);
            bindTopicPageEvents(route.params?.topicId);
            break;
        }

        case "labs":
            container.innerHTML = renderLabsPage();
            bindLabsPageEvents();
            break;

        case "interview":
            container.innerHTML = renderInterviewPage();
            bindInterviewPageEvents();
            break;

        case "progress":
            container.innerHTML = renderProgressPage();
            bindProgressPageEvents();
            break;

        default:
            container.innerHTML = renderDashboard();
            bindDashboardEvents();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function startApplication() {
    initializeTheme();
    initializeNavigation();
    renderApplicationShell();
    onRouteChange(renderPage);
    renderPage(getCurrentRoute());
}

startApplication();
