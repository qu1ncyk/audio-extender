<script lang="ts">
    import { onMount } from "svelte";
    import { loopStart, loopEnd, audioBuffer } from "./stores";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    function getTimeDomainData(time: number) {
        let floatData = new Float32Array(1024);
        $audioBuffer.copyFromChannel(
            floatData,
            0,
            $audioBuffer.sampleRate * time
        );

        let byteData = new Uint8Array(1024);
        for (let i in floatData) {
            byteData[i] = Math.round((1 - floatData[i]) * 127.5);
        }

        return byteData;
    }

    function drawGraph() {
        let loopStartData = getTimeDomainData($loopStart);
        let loopEndData = getTimeDomainData($loopEnd);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1024, 256);

        ctx.beginPath();
        ctx.strokeStyle = "lime";
        ctx.moveTo(0, loopStartData[0]);
        for (let i = 1; i < 1024; i++) {
            ctx.lineTo(i, loopStartData[i]);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.moveTo(0, loopEndData[0]);
        for (let i = 1; i < 1024; i++) {
            ctx.lineTo(i, loopEndData[i]);
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
        ctx.lineWidth = 2;
    });
</script>

<canvas width="1024" height="256" bind:this={canvas} />