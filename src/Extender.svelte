<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import FrequencyGraph from "./WaveGraph.svelte";
    import Download from "./Download.svelte";
    import { loopStart, loopEnd, duration, file } from "./stores";
    import { findEndTime } from "./find-end-time";
    import { RoundingOption } from "./convert-time";
    import { dbPromise } from "./db";

    let setLoopEnd: (newValue: number, round: RoundingOption) => any;
    let start: (when?: number, offset?: number, duration?: number) => void;

    let graphDomain: number | "sample";

    async function addToLibrary() {
        let db = await dbPromise;
        db.put("library", {
            name: "file.m4a",
            loopStart: $loopStart,
            loopEnd: $loopEnd,
            file: $file,
        });
    }
</script>

<Player on:duration={setLoopEnd($duration, RoundingOption.round)} bind:start />

<div class="input-container">
    <div class="time-input">
        <h2>Loop from</h2>
        <TimeInput bind:value={$loopStart} max={$loopEnd} />
    </div>
    <div class="time-input">
        <h2>until</h2>
        <TimeInput
            bind:value={$loopEnd}
            max={$duration}
            bind:setValue={setLoopEnd}
        />
    </div>
</div>

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

<button on:click={() => setLoopEnd(findEndTime(), RoundingOption.noRounding)}>
    Adjust end time
</button>

<button on:click={() => start(0, $loopEnd - 5)}>Test</button>

<button on:click={addToLibrary}>Add to library</button>
<br />

<Download />

<style>
    .input-container {
        display: flex;
        justify-content: center;
        gap: 0.2em;
        margin: 0.5em 0;
        flex-wrap: wrap;
    }

    .time-input {
        border: 1px solid #ddd;
        padding: 0.2em;
        background-color: #eee;
    }
</style>
