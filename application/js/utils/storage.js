import { APP_CONFIG } from "./constants.js";

const prefix = APP_CONFIG.storagePrefix;

function buildKey(key) {
    return `${prefix}:${key}`;
}

export function setStorage(key, value) {
    try {
        localStorage.setItem(
            buildKey(key),
            JSON.stringify(value)
        );
    } catch (error) {
        console.warn("Storage write failed:", error);
    }
}

export function getStorage(key, fallback = null) {
    try {
        const value = localStorage.getItem(buildKey(key));

        if (value === null) {
            return fallback;
        }

        try {
            return JSON.parse(value);
        } catch {
            return fallback;
        }
    } catch (error) {
        console.warn("Storage read failed:", error);
        return fallback;
    }
}

export function removeStorage(key) {
    try {
        localStorage.removeItem(buildKey(key));
    } catch (error) {
        console.warn("Storage remove failed:", error);
    }
}

export function clearAppStorage() {
    try {
        Object.keys(localStorage)
            .filter(key => key.startsWith(`${prefix}:`))
            .forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.warn("Storage clear failed:", error);
    }
}