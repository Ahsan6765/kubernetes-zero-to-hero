import {
    initializeNavigation,
    onRouteChange,
    getCurrentRoute,
    navigate
} from "./features/navigation.js?v=20260922-3";

import { initializeTheme } from "./features/theme.js";

import {
    renderSidebar,
    bindSidebarEvents,
    updateSidebarActive,
    closeSidebar
} from "./components/sidebar.js?v=20260922-3";

import {
    renderHeader,
    bindHeaderEvents,
    updateHeader
} from "./components/header.js?v=20260922-3";

import { initRevealOnScroll } from "./utils/helpers.js?v=20260922-3";
import { renderDashboard, bindDashboardEvents } from "./pages/dashboard.js?v=20260922-3";
import { renderRoadmapPage, bindRoadmapPageEvents } from "./pages/roadmap-page.js?v=20260922-3";
import { renderTopicPage, bindTopicPageEvents } from "./pages/topic-page.js?v=20260922-3";
import { renderLabsPage, bindLabsPageEvents } from "./pages/labs-page.js?v=20260922-3";
import { renderInterviewPage, bindInterviewPageEvents } from "./pages/interview-page.js?v=20260922-3";
import { renderProgressPage, bindProgressPageEvents } from "./pages/progress-page.js?v=20260922-3";
import { findTopic } from "./data/catalog.js?v=20260922-3";

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

    initRevealOnScroll(document.getElementById("main-content"));
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
