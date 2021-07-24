<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import FrequencyGraph from "./FrequencyGraph.svelte";
    import { loopStart, loopEnd, duration } from "./stores";

    let setLoopEnd: (newValue: number) => any;
    let start: (when?: number, offset?: number, duration?: number) => void;
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

<FrequencyGraph />

<button on:click={() => start(0, $loopEnd - 5)}>Test</button>

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
