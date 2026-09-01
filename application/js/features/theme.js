import {
    getStorage,
    setStorage
} from "../utils/storage.js";

const STORAGE_KEY = "theme";

export function initializeTheme() {
    // Respect stored preference; otherwise fall back to system preference
    const stored = getStorage(STORAGE_KEY, null);

    let theme = stored;

    if (!theme) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.dataset.theme = theme;
}

export function toggleTheme() {
    const current =
        document.documentElement.dataset.theme ||
        "dark";

    const next =
        current === "dark"
            ? "light"
            : "dark";

    document.documentElement.dataset.theme =
        next;

    setStorage(STORAGE_KEY, next);
}