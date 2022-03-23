<script lang="ts">
    import { secondsToTime } from "./convert-time";
    import Fa from "svelte-fa";
    import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
    import { dbPromise } from "./db";
    import {
        currentPage,
        file,
        filename,
        storedInLibrary,
        Page,
        loopStart,
        loopEnd,
    } from "./stores";

    async function getLibraryData() {
        let db = await dbPromise;
        return db.getAll("library");
    }
    let libraryData = getLibraryData();

    async function loadFile(fname) {
        let db = await dbPromise;
        let data = await db.get("library", fname);
        $file = data.file;
        $filename = fname;
        $loopStart = data.loopStart;
        $loopEnd = data.loopEnd;
        $storedInLibrary = true;
        $currentPage = Page.extender;
    }

    async function deleteFile(fname) {
        if (confirm(`Are you sure you want to delete ${fname}?`)) {
            let db = await dbPromise;
            let tx = db.transaction("library", "readwrite");
            let store = tx.objectStore("library");
            await store.delete(fname);
            if ((await store.getAllKeys()).length > 0) {
                libraryData = getLibraryData();
            } else {
                $currentPage = Page.filePicker;
            }
        }
    }
</script>

<table>
    {#await libraryData}
        <p>Loading the library...</p>
    {:then libraryData}
        {#each libraryData as entry}
            <tr>
                <td class="filename" on:click={() => loadFile(entry.name)}>
                    {entry.name}
                </td>
                <td class="time">
                    {secondsToTime(Math.round(entry.loopStart))}
                    - {secondsToTime(Math.round(entry.loopEnd))}
                </td>
                <td class="trashcan" on:click={() => deleteFile(entry.name)}>
                    <Fa icon={faTrashAlt} />
                </td>
            </tr>
        {/each}
    {:catch}
        <p class="error">An error occurred</p>
    {/await}
</table>

<style>
    table,
    td {
        border: 1px solid #555;
    }

    table {
        border-collapse: collapse;
        margin: 0 auto;
        width: 95%;
    }

    td {
        padding: 0.5em;
        white-space: nowrap;
    }

    .trashcan,
    .filename {
        cursor: pointer;
    }

    .filename {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 0;
    }

    .time,
    .trashcan {
        width: 0;
    }

    .error {
        color: #c20000;
    }
</style>
