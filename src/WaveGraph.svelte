<script lang="ts">
    import { onMount } from "svelte";
    import { loopStart, loopEnd, audioBuffer } from "./stores";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let screenWidth: number;
    let width: number;
    $: width = 0.9 * screenWidth;

    function getGraphData(time: number) {
        let audioData = new Float32Array(width);
        $audioBuffer.copyFromChannel(
            audioData,
            0,
            $audioBuffer.sampleRate * time
        );

        let graphData = new Uint8Array(width);
        for (let i in graphData) {
            graphData[i] = Math.round((1 - audioData[i]) * 127.5);
        }

        return graphData;
    }

    function drawGraph() {
        let loopStartData = getGraphData($loopStart);
        let loopEndData = getGraphData($loopEnd);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, 256);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "lime";
        ctx.moveTo(0, loopStartData[0]);
        for (let i = 1; i < width; i++) {
            ctx.lineTo(i, loopStartData[i]);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.moveTo(0, loopEndData[0]);
        for (let i = 1; i < width; i++) {
            ctx.lineTo(i, loopEndData[i]);
        }
        ctx.stroke();
    }

    $: if ($audioBuffer.length > 1) {
        $loopStart;
        $loopEnd;
        canvas.width = width;
        drawGraph();
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
    });
</script>

<svelte:window bind:innerWidth={screenWidth} />

<canvas width="0" height="256" bind:this={canvas} />

<style>
    canvas {
        max-width: 90%;
    }
</style>