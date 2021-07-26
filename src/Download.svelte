<script lang="ts">
    import { audioBuffer, loopStart, loopEnd, duration } from "./stores";
    import toWav from "audiobuffer-to-wav";

    let selected: "loops" | "duration";
    let num = 2;

    let introDuration: number;
    let loopDuration: number;
    let outroDuration: number;
    let sampleRate: number;
    $: {
        introDuration = $loopStart;
        loopDuration = $loopEnd - $loopStart;
        outroDuration = $duration - $loopEnd;
        sampleRate = $audioBuffer.sampleRate;
    }

    function extendChannel(channel: number, loops: number) {
        let introBuffer = new Float32Array(introDuration * sampleRate);
        $audioBuffer.copyFromChannel(introBuffer, channel);

        let loopBuffer = new Float32Array(loopDuration * sampleRate);
        $audioBuffer.copyFromChannel(
            loopBuffer,
            channel,
            $loopStart * sampleRate
        );

        let outroBuffer = new Float32Array(outroDuration * sampleRate);
        $audioBuffer.copyFromChannel(
            outroBuffer,
            channel,
            $loopEnd * sampleRate
        );

        let bufferSize =
            sampleRate * (introDuration + loopDuration * loops + outroDuration);
        let extendedBuffer = new Float32Array(bufferSize);
        extendedBuffer.set(introBuffer);

        for (let i = 0; i < loops; i++) {
            extendedBuffer.set(
                loopBuffer,
                (introDuration + loopDuration * i) * sampleRate
            );
        }

        extendedBuffer.set(
            outroBuffer,
            (introDuration + loopDuration * loops) * sampleRate
        );

        return extendedBuffer;
    }

    function download() {
        let loops: number;
        if (selected === "loops") {
            loops = num;
        } else {
            loops = Math.ceil(
                (num - (introDuration + outroDuration)) / loopDuration
            );
        }

        let bufferSize =
            sampleRate * (introDuration + loopDuration * loops + outroDuration);
        let extendedAudioBuffer = new AudioBuffer({
            length: bufferSize,
            sampleRate: $audioBuffer.sampleRate,
            numberOfChannels: $audioBuffer.numberOfChannels,
        });

        for (let i = 0; i < $audioBuffer.numberOfChannels; i++) {
            let extendedBuffer = extendChannel(i, loops);
            extendedAudioBuffer.copyToChannel(extendedBuffer, i);
        }

        let wav: ArrayBuffer = toWav(extendedAudioBuffer);
        let u8wav = new Uint8Array(wav);

        let blob = new Blob([u8wav], { type: "audio/vnd.wav" });
        let url = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = "extended.wav";
        a.click();

        URL.revokeObjectURL(url);
    }
</script>

<div class="download-container">
    <h2>Download</h2>
    <select bind:value={selected}>
        <option value="loops">Amount of loops</option>
        <option value="duration">Minimal duration</option>
    </select>
    <input type="number" bind:value={num} />
    {selected === "duration" ? "min" : ""}

    <p>Note: these files can get quite big</p>

    <button on:click={download}>Download</button>
</div>

<style>
    input {
        width: 4em;
    }

    .download-container {
        display: inline-block;
        border: 1px solid #ddd;
        padding: 0.2em;
        background-color: #eee;
    }
</style>
