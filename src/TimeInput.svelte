<script lang="ts">
    import { timeToSeconds, secondsToTime, roundMilli } from "./convert-time";
    import writableDerived from "svelte-writable-derived";
    import type { Writable } from "svelte/store";

    export let value: Writable<number>;
    export let max = Infinity;
    let valueString = writableDerived(value, secondsToTime, {
        withOld(x, old) {
            let seconds = timeToSeconds(x);
            isValid = seconds <= max && seconds >= 0 && !isNaN(seconds);
            if (isValid) return seconds;
            else return old;
        },
    });

    let isValid = true;

    function adjustValue(difference: number) {
        let newValue = $value + difference;
        if (newValue < 0) $value = 0;
        else if (newValue > max) $value = max;
        else $value = roundMilli(newValue);
    }
</script>

<div class="input-container">
    <button class="row1 col1" on:click={() => adjustValue(-0.001)}>-1ms</button>
    <button class="row1 col2" on:click={() => adjustValue(-0.01)}>-10ms</button>
    <button class="row2 col1" on:click={() => adjustValue(-0.1)}>-0.1s</button>
    <button class="row2 col2" on:click={() => adjustValue(-1)}>-1s</button>

    <input
        class={isValid ? "" : "invalid"}
        bind:value={$valueString}
        type="text"
    />

    <button class="row1 col3" on:click={() => adjustValue(0.001)}>+1ms</button>
    <button class="row1 col4" on:click={() => adjustValue(0.01)}>+10ms</button>
    <button class="row2 col3" on:click={() => adjustValue(0.1)}>+0.1s</button>
    <button class="row2 col4" on:click={() => adjustValue(1)}>+1s</button>
</div>

<style>
    .input-container {
        display: grid;
        grid-template-columns: repeat(2, [button] 1fr) [input] minmax(4em, 6em) repeat(
                2,
                [button] 1fr
            );
        grid-template-rows: repeat(2, 1fr);
        gap: 0.2em;
    }

    input {
        width: 100%;
        margin: 0;
        grid-column: input;
        grid-row: 1 / span 2;
        place-self: center;
    }

    input.invalid {
        border: 0.2em solid red;
    }

    button {
        margin: 0;
        padding: 0.3em;
    }

    .row1 {
        grid-row: 1;
    }
    .row2 {
        grid-row: 2;
    }

    .col1 {
        grid-column: button 1;
    }
    .col2 {
        grid-column: button 2;
    }
    .col3 {
        grid-column: button 3;
    }
    .col4 {
        grid-column: button 4;
    }
</style>
