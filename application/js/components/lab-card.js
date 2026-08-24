export function renderLabCard(lab, completed = false) {
    return `
        <article class="lab-card reveal-on-scroll">
            <div class="lab-card-top">
                <div class="lab-icon">${lab.icon || "⌘"}</div>
                ${
                    completed
                        ? `<span class="badge badge-beginner">Completed</span>`
                        : ""
                }
            </div>

            <div class="lab-title">${lab.title}</div>
            <div class="lab-description">${lab.description}</div>

            <div class="lab-meta">
                <span class="badge badge-beginner">${lab.difficulty || "Beginner"}</span>
                <span class="badge">${lab.duration || "10 min"}</span>
            </div>

            <div class="lab-card-action">
                <button class="btn ${completed ? "btn-secondary" : "btn-primary"}" data-lab-id="${lab.id}" type="button">
                    ${completed ? "Replay Lab" : "Start Lab"}
                </button>
            </div>
        </article>
    `;
}
