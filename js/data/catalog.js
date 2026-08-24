import { getTopicStatus } from "../features/progress-tracker.js";
import { roadmap } from "./roadmap.js";
import { topicContent } from "./topics.js";

export function getAllTopics() {
    return roadmap.flatMap((milestone) =>
        milestone.topics.map((topic) => ({
            ...topic,
            milestoneId: milestone.id,
            milestoneTitle: milestone.title,
            milestoneNumber: milestone.number
        }))
    );
}

export function findTopic(topicId) {
    for (const milestone of roadmap) {
        const topic = milestone.topics.find((item) => item.id === topicId);

        if (topic) {
            return {
                topic: enrichTopic(topic),
                milestone
            };
        }
    }

    return null;
}

export function getTopicTitle(topicId) {
    const match = getAllTopics().find((topic) => topic.id === topicId);
    return match?.title || topicId;
}

export function getNextIncompleteTopic() {
    return (
        getAllTopics().find(
            (topic) => getTopicStatus(topic.id) !== "completed"
        ) || getAllTopics()[0]
    );
}

export function getAdjacentTopics(topicId) {
    const topics = getAllTopics();
    const index = topics.findIndex((topic) => topic.id === topicId);

    return {
        previous: index > 0 ? topics[index - 1] : null,
        next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : null
    };
}

export function enrichTopic(topic) {
    const extra = topicContent[topic.id] || {};

    return {
        ...topic,
        overview: extra.overview || topic.overview || topic.description,
        why: extra.why || topic.why,
        keyPoints: extra.keyPoints || topic.keyPoints || [
            "Understand the core concept.",
            "Understand how it fits into Kubernetes.",
            "Understand when it should be used.",
            "Understand common operational considerations."
        ],
        example: extra.example || topic.example
    };
}

export { roadmap };
