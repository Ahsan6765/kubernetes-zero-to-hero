export function renderProgressBar(
    percentageValue
) {

    const percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentageValue
            )
        );

    return `
        <div class="progress">
            <div
                class="progress-bar"
                style="width: ${percentage}%"
            ></div>
        </div>
    `;
}