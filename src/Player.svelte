<script lang="ts">
    import {
        file,
        duration,
        loopStart,
        loopEnd,
        audioBuffer,
        storedInLibrary,
    } from "./stores";
    import { secondsToTime } from "./convert-time";

    import Card from "@smui/card";
    import FormField from "@smui/form-field";
    import CircularProgress from "@smui/circular-progress";
    import IconButton from "@smui/icon-button";
    import SvgIcon from "./SvgIcon.svelte";
    import { mdiPlay, mdiPause } from "@mdi/js";
    import Slider from "@smui/slider";
    import Snackbar, {Label} from "@smui/snackbar";
    import type {SnackbarComponentDev} from "@smui/snackbar";

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

        // the slider hangs with requestAnimationFrame
        if (playing) setTimeout(progressLoop, 20);
    }

    let snackbar: SnackbarComponentDev;

    let loading = true;
    (async () => {
        try {
            let clonedFile = new ArrayBuffer($file.byteLength);
            new Uint8Array(clonedFile).set(new Uint8Array($file));

            audioSource = audioContext.createBufferSource();
            $audioBuffer = await audioContext.decodeAudioData(clonedFile);
            audioSource.buffer = $audioBuffer;
            $duration = audioSource.buffer.duration;

            if (!$storedInLibrary) $loopEnd = $duration;

            loading = false;
        } catch (e) {
            console.error(e);
            snackbar.open();
        }
    })();
</script>

<Card style="padding: 4px;">
    <FormField>
        {#if loading}
            <CircularProgress
                indeterminate
                style="width: 24px; height: 24px; margin: 12px;"
            />
        {:else}
            <IconButton on:click={togglePlaying}>
                <SvgIcon icon={playing ? mdiPause : mdiPlay} />
            </IconButton>
        {/if}

        <span class="current time">
            {secondsToTime(Math.floor(sliderValue))}
        </span>

        <Slider
            max={Math.max($duration, 1)}
            bind:value={sliderValue}
            step={0.001}
            style="width: 100%;"
            on:SMUISlider:input={slideStart}
            on:SMUISlider:change={slideEnd}
        />

        <span class="end time">{secondsToTime(Math.floor($duration))}</span>
    </FormField>
</Card>

<Snackbar bind:this={snackbar}>
    <Label>Could not play the audio file</Label>
</Snackbar>

<style>
    .current.time {
        width: 4em;
    }

    .end.time {
        margin: 0 0.5em;
    }
</style>
