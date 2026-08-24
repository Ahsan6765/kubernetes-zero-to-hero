import { getStorage, setStorage } from "../utils/storage.js";

const STORAGE_KEY = "bookmarks";

function getBookmarks() {
    return getStorage(STORAGE_KEY, []);
}

export function isBookmarked(topicId) {
    return getBookmarks().includes(topicId);
}

export function toggleBookmark(topicId) {
    const bookmarks = getBookmarks();

    const index = bookmarks.indexOf(topicId);

    if (index === -1) {
        bookmarks.push(topicId);
    } else {
        bookmarks.splice(index, 1);
    }

    setStorage(STORAGE_KEY, bookmarks);

    return bookmarks.includes(topicId);
}

export function getAllBookmarks() {
    return getBookmarks();
}