<script lang="ts">
    import { globalState } from "./state.svelte";
    import { secondsToTime } from "./convert-time";

    import Card from "@smui/card";
    import FormField from "@smui/form-field";
    import CircularProgress from "@smui/circular-progress";
    import IconButton from "@smui/icon-button";
    import SvgIcon from "./SvgIcon.svelte";
    import { mdiPlay, mdiPause } from "@mdi/js";
    import Slider from "@smui/slider";
    import Snackbar, { Label } from "@smui/snackbar";

    let audioContext = new AudioContext();
    let audioSource: AudioBufferSourceNode | undefined = $state();

    $effect(() => {
        if (audioSource) {
            audioSource.loop = true;
            audioSource.loopStart = globalState.loopStart;
            audioSource.loopEnd = globalState.loopEnd;
        }
    });

    export function start(when: number, offset: number, duration?: number) {
        sliderValue = offset;
        if (started) audioSource?.stop();
        audioSource = audioContext.createBufferSource();
        audioSource.connect(audioContext.destination);
        audioSource.buffer = globalState.audioBuffer;
        audioSource.start(when, offset, duration);
        if (audioContext.state === "suspended") audioContext.resume();
        started = true;
        playing = true;
        startingTime = Date.now() / 1000 - sliderValue;
        progressLoop();
    }

    let playing = $state(false);
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

    let sliderValue = $state(0);
    let startingTime: number;
    let sliding = false;
    function slideStart() {
        sliding = true;
    }
    function slideEnd() {
        sliding = false;
        startingTime = Date.now() / 1000 - sliderValue;
        if (started) audioSource?.stop();
        if (playing) start(0, sliderValue);
        else started = false;
    }

    function progressLoop() {
        if (sliderValue >= globalState.loopEnd) {
            startingTime += globalState.loopEnd - globalState.loopStart;
        }
        if (!sliding) sliderValue = Date.now() / 1000 - startingTime;

        // the slider hangs with requestAnimationFrame
        if (playing) setTimeout(progressLoop, 20);
    }

    let snackbar: Snackbar;

    let loading = $state(true);
    (async () => {
        try {
            let clonedFile = new ArrayBuffer(globalState.file.byteLength);
            new Uint8Array(clonedFile).set(new Uint8Array(globalState.file));

            audioSource = audioContext.createBufferSource();
            globalState.audioBuffer =
                await audioContext.decodeAudioData(clonedFile);
            audioSource.buffer = globalState.audioBuffer;
            globalState.duration = audioSource.buffer.duration;

            if (!globalState.storedInLibrary)
                globalState.loopEnd = globalState.duration;

            loading = false;
        } catch (e) {
            console.error(e);
            snackbar!.open();
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
            <IconButton onclick={togglePlaying}>
                <SvgIcon icon={playing ? mdiPause : mdiPlay} />
            </IconButton>
        {/if}

        <span class="current time">
            {secondsToTime(Math.floor(sliderValue))}
        </span>

        <Slider
            max={Math.max(globalState.duration, 1)}
            bind:value={sliderValue}
            step={0.001}
            style="width: 100%;"
            onSMUISliderInput={slideStart}
            onSMUISliderChange={slideEnd}
        />

        <span class="end time"
            >{secondsToTime(Math.floor(globalState.duration))}</span
        >
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
