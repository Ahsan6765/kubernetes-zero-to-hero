export function openModal(content) {

    const existing =
        document.getElementById(
            "global-modal"
        );

    existing?.remove();

    const modal =
        document.createElement("div");

    modal.id = "global-modal";

    modal.innerHTML = `
        <div class="modal-backdrop">

            <div class="modal-card">

                <button
                    class="modal-close"
                    id="modal-close"
                >
                    ×
                </button>

                ${content}

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    document
        .getElementById("modal-close")
        ?.addEventListener(
            "click",
            closeModal
        );
}

export function closeModal() {

    document
        .getElementById("global-modal")
        ?.remove();
}