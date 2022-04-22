<script lang="ts">
    import { onMount } from "svelte";
    import { loopStart, loopEnd, audioBuffer } from "./stores";

    export let zoom: number;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let width: number;

    function getGraphData(time: number) {
        let dataSize = width * zoom;

        let dataCenter = $audioBuffer.sampleRate * time;
        let dataStart = Math.round(dataCenter - dataSize / 2);

        let audioData = new Float32Array(dataSize);
        $audioBuffer.copyFromChannel(audioData, 0, Math.max(dataStart, 0));

        let offset = Math.max(-dataStart, 0);
        let graphData = new Uint8Array(dataSize);
        for (let i = 0; i < graphData.length; i++) {
            if (i < offset) graphData[i] = 75;
            else graphData[i] = Math.round((1 - audioData[i - offset]) * 75);
        }

        return graphData;
    }

    function drawGraph() {
        const primaryColor = getComputedStyle(document.body).getPropertyValue(
            "--primary-color"
        );
        const secondaryColor = getComputedStyle(document.body).getPropertyValue(
            "--secondary-color"
        );

        let loopStartData = getGraphData($loopStart);
        let loopEndData = getGraphData($loopEnd);

        ctx.clearRect(0, 0, width, 256);

        ctx.beginPath();
        ctx.strokeStyle = "#7f7f7f";
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, 150);
        ctx.stroke();

        ctx.globalCompositeOperation = "darken";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = primaryColor;
        ctx.moveTo(0, loopStartData[0]);
        for (let i = 1; i < loopStartData.length; i++) {
            let x = (i / loopStartData.length) * width;
            ctx.lineTo(x, loopStartData[i]);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = secondaryColor;
        ctx.moveTo(0, loopEndData[0]);
        for (let i = 1; i < loopEndData.length; i++) {
            let x = (i / loopEndData.length) * width;
            ctx.lineTo(x, loopEndData[i]);
        }
        ctx.stroke();
    }

    $: if ($audioBuffer.length > 1) {
        $loopStart;
        $loopEnd;
        canvas.width = width;
        zoom;
        drawGraph();
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
    });
</script>

<div bind:clientWidth={width}>
    <canvas width="0" height="151" bind:this={canvas} />
</div>

<style>
    canvas {
        width: 100%;
    }
</style>
