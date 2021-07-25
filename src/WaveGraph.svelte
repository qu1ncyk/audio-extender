<script lang="ts">
    import { onMount } from "svelte";
    import { loopStart, loopEnd, audioBuffer } from "./stores";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let audioContext = new AudioContext();

    function getTimeDomainData(time: number) {
        let floatData = new Float32Array(1024);
        $audioBuffer.copyFromChannel(floatData, 0, $audioBuffer.sampleRate * time);

        let byteData = new Uint8Array(1024);
        for(let i in floatData) {
            byteData[i] = Math.round((floatData[i] + 1) * 127.5);
        }

        return byteData;
    }

    function drawGraph() {
        let loopStartFreqData = getTimeDomainData($loopStart);
        let loopEndFreqData = getTimeDomainData($loopEnd);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1024, 256);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        for (let i = 0; i < 1024; i++) {
            let min = Math.min(loopStartFreqData[i], loopEndFreqData[i]);

            ctx.moveTo(i, 0);
            ctx.lineTo(i, min);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "lime";
        for (let i = 0; i < 1024; i++) {
            let min = Math.min(loopStartFreqData[i], loopEndFreqData[i]);
            let max = Math.max(loopStartFreqData[i], loopEndFreqData[i]);
            let loopStartIsGreater = loopStartFreqData[i] > loopEndFreqData[i];

            if (loopStartIsGreater) {
                ctx.moveTo(i, min);
                ctx.lineTo(i, max);
            }
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        for (let i = 0; i < 1024; i++) {
            let min = Math.min(loopStartFreqData[i], loopEndFreqData[i]);
            let max = Math.max(loopStartFreqData[i], loopEndFreqData[i]);
            let loopEndIsGreater = loopEndFreqData[i] > loopStartFreqData[i];

            if (loopEndIsGreater) {
                ctx.moveTo(i, min);
                ctx.lineTo(i, max);
            }
        }
        ctx.stroke();
    }

    $: if ($audioBuffer.length > 1) {
        $loopStart;
        $loopEnd;
        drawGraph();
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
        ctx.translate(0.5, 0);
    });
</script>

<canvas width="1024" height="256" bind:this={canvas} />

<style>
    canvas {
        image-rendering: pixelated;
    }
</style>
