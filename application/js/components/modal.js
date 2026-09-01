let escapeHandler = null;
let trapHandler = null;
let lastFocusedElement = null;

export function openModal(content) {
    closeModal();
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const modal = document.createElement("div");
    modal.id = "global-modal";
    modal.innerHTML = `
        <div class="modal-backdrop" data-close-modal>
            <div class="modal-card" role="dialog" aria-modal="true">
                <button class="modal-close" id="modal-close" type="button" aria-label="Close">
                    ×
                </button>
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add("modal-open");

    document.getElementById("modal-close")?.addEventListener("click", closeModal);

    modal.querySelector(".modal-backdrop")?.addEventListener("click", (event) => {
        if (event.target.hasAttribute("data-close-modal")) {
            closeModal();
        }
    });

    escapeHandler = (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    document.addEventListener("keydown", escapeHandler);

    // Simple focus trap: keep focus cycling inside the modal
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(modal.querySelectorAll(focusableSelector));
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];
    if (firstFocusable) firstFocusable.focus();

    trapHandler = (e) => {
        if (e.key !== "Tab") {
            return;
        }

        if (focusables.length === 0) {
            e.preventDefault();
            return;
        }

        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    };

    document.addEventListener("keydown", trapHandler);

    return modal;
}

export function closeModal() {
    document.getElementById("global-modal")?.remove();
    document.body.classList.remove("modal-open");

    if (escapeHandler) {
        document.removeEventListener("keydown", escapeHandler);
        escapeHandler = null;
    }

    if (trapHandler) {
        document.removeEventListener("keydown", trapHandler);
        trapHandler = null;
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }

    lastFocusedElement = null;
}
