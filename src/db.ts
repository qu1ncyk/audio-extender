import { openDB } from "idb";

export let dbPromise = openDB("audio-extender", 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
        switch (oldVersion) {
            case 0:
                db.createObjectStore("library", { keyPath: "name" });
        }
    }
});