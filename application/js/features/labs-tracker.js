import { getStorage, setStorage } from "../utils/storage.js";

const STORAGE_KEY = "labs";

function getLabProgress() {
    return getStorage(STORAGE_KEY, {});
}

export function isLabComplete(labId) {
    return getLabProgress()[labId]?.status === "completed";
}

export function markLabComplete(labId) {
    const progress = getLabProgress();

    progress[labId] = {
        status: "completed",
        updatedAt: new Date().toISOString()
    };

    setStorage(STORAGE_KEY, progress);
}

export function getCompletedLabCount(labs) {
    return labs.filter((lab) => isLabComplete(lab.id)).length;
}
