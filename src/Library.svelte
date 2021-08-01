<script lang="ts">
    import { RoundingOption, secondsToTime } from "./convert-time";
    import Fa from "svelte-fa";
    import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

    let libraryData = [
        { name: "file1.m4a", loopStart: 30, loopEnd: 140 },
        { name: "file2.mp3", loopStart: 5, loopEnd: 55.2154 },
    ];
</script>

<table>
    {#each libraryData as entry}
        <tr>
            <td>
                {entry.name}:
                {secondsToTime(entry.loopStart, RoundingOption.milli)}
                - {secondsToTime(entry.loopEnd, RoundingOption.milli)}
            </td>
            <td>
                <Fa icon={faTrashAlt} />
            </td>
        </tr>
    {/each}
</table>

<style>
    table,
    td {
        border: 1px solid #555;
    }

    table {
        border-collapse: collapse;
        margin: 0 auto;
    }

    td {
        padding: 0.5em;
        cursor: pointer;
    }
</style>
