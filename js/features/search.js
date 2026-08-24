import { roadmap } from "../data/roadmap.js";

export function searchTopics(query) {
    const normalized =
        query.trim().toLowerCase();

    if (!normalized) {
        return [];
    }

    const results = [];

    roadmap.forEach(milestone => {

        milestone.topics.forEach(topic => {

            const searchable = [
                topic.title,
                topic.description,
                milestone.title
            ]
                .join(" ")
                .toLowerCase();

            if (searchable.includes(normalized)) {
                results.push({
                    ...topic,
                    milestoneId: milestone.id,
                    milestoneTitle: milestone.title
                });
            }

        });

    });

    return results;
}