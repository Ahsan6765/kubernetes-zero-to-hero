export function renderInterviewCard(question) {

    return `
        <article class="card" style="padding:20px;">

            <div style="
                display:flex;
                justify-content:space-between;
                gap:15px;
            ">

                <strong>
                    ${question.question}
                </strong>

                <span class="badge badge-${
                    question.difficulty === "Beginner"
                        ? "beginner"
                        : question.difficulty === "Intermediate"
                            ? "intermediate"
                            : "advanced"
                }">
                    ${question.difficulty}
                </span>

            </div>

            <details style="margin-top:16px;">

                <summary style="
                    cursor:pointer;
                    color:var(--accent-light);
                    font-size:13px;
                ">
                    Show answer
                </summary>

                <p style="
                    margin-top:12px;
                    color:var(--text-secondary);
                    font-size:13px;
                ">
                    ${question.answer}
                </p>

            </details>

        </article>
    `;
}