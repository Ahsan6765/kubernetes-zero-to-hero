const listeners = new Set();

let currentRoute = {
    name: "dashboard",
    params: {}
};

const PAGE_TITLES = {
    dashboard: "Dashboard",
    roadmap: "Roadmap",
    topic: "Topic",
    labs: "Labs",
    interview: "Interview",
    progress: "My Progress"
};

export function navigate(name, params = {}) {
    currentRoute = { name, params };

    const query = new URLSearchParams(params).toString();

    window.history.pushState(
        {},
        "",
        `#${name}${query ? `?${query}` : ""}`
    );

    listeners.forEach((listener) => listener(currentRoute));
}

export function getCurrentRoute() {
    return currentRoute;
}

export function getPageTitle(route = currentRoute) {
    return PAGE_TITLES[route.name] || "Dashboard";
}

export function onRouteChange(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function parseLocation() {
    const hash = window.location.hash.replace("#", "");

    if (!hash) {
        return {
            name: "dashboard",
            params: {}
        };
    }

    const [name, query = ""] = hash.split("?");

    return {
        name: name || "dashboard",
        params: Object.fromEntries(new URLSearchParams(query))
    };
}

function sameRoute(a, b) {
    return (
        a.name === b.name &&
        JSON.stringify(a.params || {}) === JSON.stringify(b.params || {})
    );
}

function emitRoute() {
    const next = parseLocation();

    if (sameRoute(next, currentRoute)) {
        return;
    }

    currentRoute = next;
    listeners.forEach((listener) => listener(currentRoute));
}

export function initializeNavigation() {
    currentRoute = parseLocation();

    if (!window.location.hash) {
        window.history.replaceState({}, "", "#dashboard");
    }

    window.addEventListener("popstate", emitRoute);
    window.addEventListener("hashchange", emitRoute);
}
