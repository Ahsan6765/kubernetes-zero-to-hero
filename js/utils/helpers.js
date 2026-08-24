export function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function percentage(completed, total) {
    if (!total) return 0;

    return Math.round(
        (completed / total) * 100
    );
}

export function getElement(selector) {
    return document.querySelector(selector);
}

export function formatNumber(value) {
    return new Intl.NumberFormat().format(value);
}