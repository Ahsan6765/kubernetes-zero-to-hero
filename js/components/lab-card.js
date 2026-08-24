export function renderLabCard(lab) {

    return `
        <article class="lab-card">

            <div class="lab-icon">
                ${lab.icon || "⌘"}
            </div>

            <div class="lab-title">
                ${lab.title}
            </div>

            <div class="lab-description">
                ${lab.description}
            </div>

            <div class="lab-meta">

                <span class="badge badge-beginner">
                    ${lab.difficulty || "Beginner"}
                </span>

                <span class="badge">
                    ${lab.duration || "10 min"}
                </span>

            </div>

            <div style="margin-top:18px;">
                <button
                    class="btn btn-secondary"
                    data-lab-id="${lab.id}"
                >
                    Start Lab
                </button>
            </div>

        </article>
    `;
}