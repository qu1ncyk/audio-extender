<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import FrequencyGraph from "./WaveGraph.svelte";
    import Download from "./Download.svelte";
    import {
        loopStart,
        loopEnd,
        duration,
        file,
        filename,
        storedInLibrary,
    } from "./stores";
    import { findEndTime } from "./find-end-time";
    import { dbPromise } from "./db";

    import Grid, { Cell } from "@smui/layout-grid";
    import Card from "@smui/card";

    const spanFull = { desktop: 12, tablet: 8, phone: 4 };
    const spanHalf = { desktop: 6, tablet: 4, phone: 2 };

    let start: (when?: number, offset?: number, duration?: number) => void;
    let graphDomain: number | "sample";

    async function addToLibrary() {
        let db = await dbPromise;
        db.put("library", {
            name: $filename,
            loopStart: $loopStart,
            loopEnd: $loopEnd,
            file: $file,
        });
        $storedInLibrary = true;
    }
</script>

<Grid>
    <Cell spanDevices={spanFull}>
        <Player
            on:duration={() => {
                if (!$storedInLibrary) $loopEnd = Math.floor($duration);
            }}
            bind:start
        />
    </Cell>

    <Cell spanDevices={spanHalf}>
        <Card>
            <TimeInput value={loopStart} min={0} max={$loopEnd} title="Loop from" />
        </Card>
    </Cell>
    <Cell spanDevices={spanHalf}>
        <Card>
            <TimeInput value={loopEnd} min={$loopStart} max={$duration} title="until" />
        </Card>
    </Cell>

    <div>
        <FrequencyGraph {graphDomain} />
    </div>

    <select bind:value={graphDomain}>
        <option value="sample">Pixel = sample</option>
        <option value="0.05">Width = 50ms</option>
        <option value="0.1">Width = 0.1s</option>
        <option value="0.5">Width = 0.5s</option>
        <option value="1">Width = 1s</option>
        <option value="5">Width = 5s</option>
    </select>

    <button on:click={() => ($loopEnd = findEndTime())}>
        Adjust end time
    </button>

    <button on:click={() => start(0, $loopEnd - 5)}>Test</button>

    <button on:click={addToLibrary}>
        {#if $storedInLibrary}
            Update in library
        {:else}
            Add to library
        {/if}
    </button>
    <br />

    <Download />
</Grid>
