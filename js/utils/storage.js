import { APP_CONFIG } from "./constants.js";

const prefix = APP_CONFIG.storagePrefix;

function buildKey(key) {
    return `${prefix}:${key}`;
}

export function setStorage(key, value) {
    localStorage.setItem(
        buildKey(key),
        JSON.stringify(value)
    );
}

export function getStorage(key, fallback = null) {
    const value = localStorage.getItem(buildKey(key));

    if (value === null) {
        return fallback;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

export function removeStorage(key) {
    localStorage.removeItem(buildKey(key));
}

export function clearAppStorage() {
    Object.keys(localStorage)
        .filter(key => key.startsWith(`${prefix}:`))
        .forEach(key => localStorage.removeItem(key));
}