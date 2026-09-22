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
    const safeName = PAGE_TITLES[name] ? name : "dashboard";
    const nextRoute = { name: safeName, params };
    const query = new URLSearchParams(params).toString();
    const targetHash = `#${safeName}${query ? `?${query}` : ""}`;

    currentRoute = nextRoute;

    if (window.location.hash !== targetHash) {
        window.history.pushState({}, "", targetHash);
    }

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
    const hash = window.location.hash.slice(1);

    if (!hash) {
        return {
            name: "dashboard",
            params: {}
        };
    }

    const [name, query = ""] = hash.split("?");
    const normalizedName = PAGE_TITLES[name] ? name : "dashboard";

    return {
        name: normalizedName,
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
    if (!window.location.hash) {
        window.history.replaceState({}, "", "#dashboard");
    }

    currentRoute = parseLocation();

    window.addEventListener("popstate", emitRoute);
    window.addEventListener("hashchange", emitRoute);
}
