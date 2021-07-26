<script lang="ts">
    import { onMount } from "svelte";
    import { loopStart, loopEnd, audioBuffer } from "./stores";

    export let graphDomain: number | "sample";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let screenWidth: number;
    let width: number;
    $: width = 0.9 * screenWidth;

    function getGraphData(time: number) {
        let dataSize: number;
        if (graphDomain === "sample") dataSize = width;
        else dataSize = graphDomain * $audioBuffer.sampleRate;

        let audioData = new Float32Array(dataSize);
        $audioBuffer.copyFromChannel(
            audioData,
            0,
            $audioBuffer.sampleRate * time
        );

        let graphData = new Uint8Array(dataSize);
        for (let i = 0; i < graphData.length; i++) {
            graphData[i] = Math.round((1 - audioData[i]) * 75);
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
        for (let i = 1; i < loopStartData.length; i++) {
            let x = i;
            if (graphDomain !== "sample")
                x = (i / loopStartData.length) * width;
            ctx.lineTo(x, loopStartData[i]);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.moveTo(0, loopEndData[0]);
        for (let i = 1; i < loopEndData.length; i++) {
            let x = i;
            if (graphDomain !== "sample") x = (i / loopEndData.length) * width;
            ctx.lineTo(x, loopEndData[i]);
        }
        ctx.stroke();
    }

    $: if ($audioBuffer.length > 1) {
        $loopStart;
        $loopEnd;
        canvas.width = width;
        graphDomain;
        drawGraph();
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
    });
</script>

<svelte:window bind:innerWidth={screenWidth} />

<canvas width="0" height="151" bind:this={canvas} />

<style>
    canvas {
        max-width: 90%;
    }
</style>
