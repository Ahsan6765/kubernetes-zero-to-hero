let escapeHandler = null;

export function openModal(content) {
    closeModal();

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

    return modal;
}

export function closeModal() {
    document.getElementById("global-modal")?.remove();
    document.body.classList.remove("modal-open");

    if (escapeHandler) {
        document.removeEventListener("keydown", escapeHandler);
        escapeHandler = null;
    }
}
