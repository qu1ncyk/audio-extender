<script lang="ts">
    import { onMount } from "svelte";
    import { loopStart, loopEnd, audioBuffer } from "./stores";
    import PreciseTimeAnalyserNode from "./precise-time-analyser-node";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let audioContext = new AudioContext();

    function u8OnlyContainsZeros(u8: Uint8Array) {
        for (let item of u8) {
            if (item !== 0) return false;
        }
        return true;
    }

    function getFrequencyData(time: number): Promise<Uint8Array> {
        return new Promise((resolve) => {
            let audioSource = audioContext.createBufferSource();
            let analyser = audioContext.createAnalyser();
            let data = new Uint8Array(1024);

            audioSource.buffer = $audioBuffer;
            audioSource.connect(analyser);
            audioSource.start(0, time, 1);
            (function loop() {
                analyser.getByteFrequencyData(data);
                if (u8OnlyContainsZeros(data)) {
                    setTimeout(loop, 0);
                } else {
                    audioSource.stop();
                    resolve(data);
                }
            })();
        });
    }

    async function drawGraph() {
        let data = new Float32Array(1024);
        PreciseTimeAnalyserNode.addModule(audioContext)
            .then(() => {
                let audioSource = audioContext.createBufferSource();
                let analyser = new PreciseTimeAnalyserNode(audioContext);
                audioSource.buffer = $audioBuffer;
                audioSource.connect(analyser);
                audioSource.start(0, 30, 1);
                return analyser.getFloatTimeDomainData(data);
            })
            .then(() => console.log(data));
            
        let [loopStartFreqData, loopEndFreqData] = await Promise.all([
            getFrequencyData($loopStart),
            getFrequencyData($loopEnd),
        ]);

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
        drawGraph().then(console.log);
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
