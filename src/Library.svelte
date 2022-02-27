<script lang="ts">
    import { RoundingOption, secondsToTime } from "./convert-time";
    import Fa from "svelte-fa";
    import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
    import { dbPromise } from "./db";

    async function getLibraryData() {
        let db = await dbPromise;
        return db.getAll("library");
    }
</script>

<table>
    {#await getLibraryData()}
        <p>Loading the library...</p>
    {:then libraryData}
        {#each libraryData as entry}
            <tr>
                <td class="filename">
                    {entry.name}
                </td>
                <td class="time">
                    {secondsToTime(entry.loopStart, RoundingOption.milli)}
                    - {secondsToTime(entry.loopEnd, RoundingOption.milli)}
                </td>
                <td class="trashcan">
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
