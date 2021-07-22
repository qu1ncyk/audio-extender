<script lang="ts">
    import Fa from "svelte-fa";
    import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
    import { file, currentTime, duration, loopStart, loopEnd } from "./stores";
    import { secondsToTime } from "./convert-time";

    let audioElement: HTMLAudioElement;

    let playing = false;
    function togglePlaying() {
        playing = !playing;
        if (playing) audioElement.play();
        else audioElement.pause();
    }
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
    src={$file}
    bind:this={audioElement}
    bind:currentTime={$currentTime}
    bind:duration={$duration}
    on:error={() => alert("Could not play the audio file")}
    on:play={() => (playing = true)}
    on:pause={() => (playing = false)}
/>

<div class="player-container">
    <span class="play-button" on:click={togglePlaying}>
        {#if playing}
            <Fa icon={faPause} />
        {:else}
            <Fa icon={faPlay} />
        {/if}
    </span>
    <span class="current time">{secondsToTime($currentTime)}</span>
    <input
        type="range"
        bind:value={$currentTime}
        max={$duration}
        step="any"
        style={`
            --loop-start: ${($loopStart / $duration) * 100}%;
            --loop-end: ${($loopEnd / $duration) * 100}%;
        `}
    />
    <span class="end time">{secondsToTime($duration)}</span>
</div>

<style>
    .player-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        border: 1px solid #ddd;
        padding: 0.7em 0.5em;
        margin: 0 auto;
        width: 50em;
        max-width: 90%;
    }

    .play-button {
        cursor: pointer;
    }

    .current.time {
        width: 4em;
    }

    .end.time {
        margin-left: 0.5em;
    }

    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        height: 1.3em;
        padding: 0;
        background: linear-gradient(
            to right,
            #d7d7d7 var(--loop-start),
            #ccc var(--loop-start),
            #ccc var(--loop-end),
            #d7d7d7 var(--loop-end)
        );
        border-radius: 0.65em;
        outline: none;
        touch-action: pan-y;
        margin: 0;
        flex-grow: 1;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.5em;
        height: 1.5em;
        background: white;
        cursor: pointer;
        border-radius: 50%;
    }
    input[type="range"]::-moz-range-thumb {
        width: 1.5em;
        height: 1.5em;
        background: white;
        cursor: pointer;
        border-radius: 50%;
    }
</style>
