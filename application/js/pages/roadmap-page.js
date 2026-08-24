import { roadmap } from "../data/roadmap.js";

import {
    renderRoadmap,
    bindRoadmapEvents
} from "../components/roadmap.js";

export function renderRoadmapPage() {

    return `
        <div class="page-header">

            <div class="page-title">
                Kubernetes Zero → Hero Roadmap
            </div>

            <div class="page-subtitle">
                Follow the dependency-aware learning
                path from fundamentals to production.
            </div>

        </div>

        ${renderRoadmap(roadmap)}
    `;
}

export function bindRoadmapPageEvents() {
    bindRoadmapEvents();
}