<script lang="ts">
    import Fa from "svelte-fa";
    import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
    import { file, duration, loopStart, loopEnd, audioBuffer } from "./stores";
    import { secondsToTime } from "./convert-time";
    import { createEventDispatcher } from "svelte";

    let audioContext = new AudioContext();
    let audioSource: AudioBufferSourceNode;

    $: if (audioSource) {
        audioSource.loop = true;
        audioSource.loopStart = $loopStart;
        audioSource.loopEnd = $loopEnd;
    }

    export function start(when?: number, offset?: number, duration?: number) {
        sliderValue = offset;
        if (started) audioSource.stop();
        audioSource = audioContext.createBufferSource();
        audioSource.connect(audioContext.destination);
        audioSource.buffer = $audioBuffer;
        audioSource.start(when, offset, duration);
        if (audioContext.state === "suspended") audioContext.resume();
        started = true;
        playing = true;
        startingTime = Date.now() / 1000 - sliderValue;
        progressLoop();
    }

    let playing = false;
    let started = false;
    function togglePlaying() {
        if (playing) audioContext.suspend();
        else if (started) audioContext.resume();
        else start(0, sliderValue);
    }
    audioContext.onstatechange = () => {
        if (started && audioContext.state === "running") {
            playing = true;
            startingTime = Date.now() / 1000 - sliderValue;
            progressLoop();
        } else {
            playing = false;
        }
    };

    let sliderValue = 0;
    let startingTime: number;
    let sliding = false;
    function slideStart() {
        sliding = true;
    }
    function slideEnd() {
        sliding = false;
        startingTime = Date.now() / 1000 - sliderValue;
        if (started) audioSource.stop();
        if (playing) start(0, sliderValue);
        else started = false;
    }

    function progressLoop() {
        if (sliderValue >= $loopEnd) {
            startingTime += $loopEnd - $loopStart;
        }
        if (!sliding) sliderValue = Date.now() / 1000 - startingTime;

        if (playing) requestAnimationFrame(progressLoop);
    }

    let dispatch = createEventDispatcher();

    (async () => {
        try {
            let clonedFile = new ArrayBuffer($file.byteLength);
            new Uint8Array(clonedFile).set(new Uint8Array($file));

            audioSource = audioContext.createBufferSource();
            $audioBuffer = await audioContext.decodeAudioData(clonedFile);
            audioSource.buffer = $audioBuffer;
            $duration = audioSource.buffer.duration;
            dispatch("duration");
        } catch (e) {
            console.error(e);
            alert("Could not play the audio file");
        }
    })();
</script>

<div class="player-container">
    <span class="play-button" on:click={togglePlaying}>
        {#if playing}
            <Fa icon={faPause} />
        {:else}
            <Fa icon={faPlay} />
        {/if}
    </span>
    <span class="current time">{secondsToTime(Math.floor(sliderValue))}</span>
    <input
        type="range"
        bind:value={sliderValue}
        on:mousedown={slideStart}
        on:mouseup={slideEnd}
        on:touchstart={slideStart}
        on:touchend={slideEnd}
        max={$duration}
        step="any"
        style={`
            --loop-start: ${($loopStart / $duration) * 100}%;
            --loop-end: ${($loopEnd / $duration) * 100}%;
        `}
    />
    <span class="end time">{secondsToTime(Math.floor($duration))}</span>
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
