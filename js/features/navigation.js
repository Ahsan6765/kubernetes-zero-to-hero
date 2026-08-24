const listeners = new Set();

let currentRoute = {
    name: "dashboard",
    params: {}
};

export function navigate(
    name,
    params = {}
) {

    currentRoute = {
        name,
        params
    };

    const searchParams =
        new URLSearchParams(params);

    const query =
        searchParams.toString();

    window.history.pushState(
        {},
        "",
        `#${name}${query ? `?${query}` : ""}`
    );

    listeners.forEach(
        listener =>
            listener(currentRoute)
    );
}

export function getCurrentRoute() {
    return currentRoute;
}

export function onRouteChange(listener) {

    listeners.add(listener);

    return () =>
        listeners.delete(listener);
}

function parseLocation() {

    const hash =
        window.location.hash
            .replace("#", "");

    if (!hash) {

        return {
            name: "dashboard",
            params: {}
        };

    }

    const [
        name,
        query = ""
    ] = hash.split("?");

    const params =
        Object.fromEntries(
            new URLSearchParams(query)
        );

    return {
        name,
        params
    };
}

export function initializeNavigation() {

    currentRoute =
        parseLocation();

    window.addEventListener(
        "popstate",
        () => {

            currentRoute =
                parseLocation();

            listeners.forEach(
                listener =>
                    listener(currentRoute)
            );

        }
    );
}