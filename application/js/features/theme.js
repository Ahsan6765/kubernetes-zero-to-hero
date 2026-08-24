import {
    getStorage,
    setStorage
} from "../utils/storage.js";

const STORAGE_KEY = "theme";

export function initializeTheme() {
    const theme =
        getStorage(STORAGE_KEY, "dark");

    document.documentElement.dataset.theme =
        theme;
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