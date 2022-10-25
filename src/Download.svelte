<script lang="ts">
    import {
        audioBuffer,
        loopStart,
        loopEnd,
        duration,
        filename,
    } from "./stores";
    import toWav from "audiobuffer-to-wav";

    import Select, { Option } from "@smui/select";
    import Textfield from "@smui/textfield";
    import FormField from "@smui/form-field";

    let selected: "loops" | "duration" = "loops";
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

        let bufferSize = Math.round(
            sampleRate * (introDuration + loopDuration * loops + outroDuration)
        );
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

    export function download() {
        let loops: number;
        if (selected === "loops") {
            loops = num;
        } else {
            loops = Math.ceil(
                (num * 60 - (introDuration + outroDuration)) / loopDuration
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
        a.download = $filename + "-extended.wav";
        a.click();

        URL.revokeObjectURL(url);
    }
</script>

<div>
    <FormField>
        <Select bind:value={selected}>
            <Option value="loops">Amount of loops</Option>
            <Option value="duration">Minimal duration</Option>
        </Select>
    </FormField>
    <br />
    <FormField>
        <Textfield bind:value={num} type="number" style="width: 4em;" />
        <span>
            {selected === "loops" ? "loops" : "min"}
        </span>
    </FormField>
</div>

<p>Note: these files can get quite big</p>

<style>
    div {
        text-align: left;
    }

    span {
        margin-left: 0.5em;
    }
</style>
