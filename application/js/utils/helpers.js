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

export function animateProgressBars(root = document) {
    const bars = Array.from(root.querySelectorAll('.progress-bar[data-percentage]'));

    bars.forEach((bar, i) => {
        const pct = Number(bar.dataset.percentage || 0);
        // stagger slightly for nicer effect
        const delay = Math.min(300, i * 80);

        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = pct + "%";
            }, delay);
        });
    });
}

export function initRevealOnScroll(root = document) {
    const revealables = Array.from(root.querySelectorAll('.reveal-on-scroll'));

    if (!('IntersectionObserver' in window)) {
        revealables.forEach((el) => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealables.forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight + 120 && rect.bottom > -80) {
            el.classList.add('revealed');
            return;
        }

        observer.observe(el);
    });
}