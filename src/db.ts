import { openDB, type DBSchema } from "idb";

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
