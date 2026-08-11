import { openDB, type DBSchema } from "idb";
import { globalState } from "./state.svelte";

export interface SongData {
    name: string;
    loopStart: number;
    loopEnd: number;
    file: ArrayBuffer;
}

export interface Schema extends DBSchema {
    library: {
        value: SongData;
        key: string;
    };
}

export let dbPromise = openDB<Schema>("audio-extender", 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
        switch (oldVersion) {
            case 0:
                db.createObjectStore("library", { keyPath: "name" });
        }
    },
});

export async function checkLibraryEmpty() {
    let db = await dbPromise;
    let keys = await db.getAllKeys("library", null, 1);
    globalState.isLibraryEmpty = keys.length === 0;
}
