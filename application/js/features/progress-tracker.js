import { getStorage, setStorage } from "../utils/storage.js";

const STORAGE_KEY = "progress";

function getProgress() {
    return getStorage(STORAGE_KEY, {});
}

export function getTopicStatus(topicId) {
    const progress = getProgress();

    return progress[topicId]?.status || "not-started";
}

export function setTopicStatus(topicId, status) {
    const progress = getProgress();

    progress[topicId] = {
        status,
        updatedAt: new Date().toISOString()
    };

    setStorage(STORAGE_KEY, progress);
}

export function markTopicComplete(topicId) {
    setTopicStatus(topicId, "completed");
}

export function calculateOverallProgress(roadmap) {
    const allTopics = roadmap.flatMap(
        milestone => milestone.topics
    );

    if (!allTopics.length) {
        return 0;
    }

    const completed = allTopics.filter(
        topic =>
            getTopicStatus(topic.id) === "completed"
    ).length;

    return Math.round(
        (completed / allTopics.length) * 100
    );
}

export function getCompletedTopicCount(roadmap) {
    return roadmap
        .flatMap(milestone => milestone.topics)
        .filter(
            topic =>
                getTopicStatus(topic.id) === "completed"
        )
        .length;
}