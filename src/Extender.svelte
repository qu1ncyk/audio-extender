<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import { loopStart, loopEnd, duration } from "./stores";

    let setLoopEnd: (newValue: number) => any;
</script>

<Player on:duration={setLoopEnd($duration)} />

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

<button>Test</button>

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
