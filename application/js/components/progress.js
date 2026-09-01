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
                data-percentage="${percentage}"
                style="width: 0"
            ></div>
        </div>
    `;
}