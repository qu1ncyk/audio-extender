<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import FrequencyGraph from "./WaveGraph.svelte";
    import Download from "./Download.svelte";
    import { loopStart, loopEnd, duration } from "./stores";

    let setLoopEnd: (newValue: number) => any;
    let start: (when?: number, offset?: number, duration?: number) => void;

    let graphDomain: number | "sample";
</script>

<Player on:duration={setLoopEnd($duration)} bind:start />

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
<button on:click={() => start(0, $loopEnd - 5)}>Test</button>
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