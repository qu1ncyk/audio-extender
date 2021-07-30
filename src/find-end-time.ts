import { audioBuffer, loopStart, loopEnd } from "./stores";
import { get } from "svelte/store";

function getDifference(smallSample: Float32Array, bigSample: Float32Array, offset: number) {
    let difference = 0;
    for (let i = 0; i < smallSample.length; i++) {
        difference += Math.pow(smallSample[i] - bigSample[i + offset], 2);
    }
    return difference;
}

export function findEndTime() {
    let $audioBuffer = get(audioBuffer);
    let $loopStart = get(loopStart);
    let $loopEnd = get(loopEnd);
    let sampleRate = $audioBuffer.sampleRate;
    const startSampleLength = 50;
    const endSampleDuration = 2;

    let startSample = new Float32Array(startSampleLength);
    $audioBuffer.copyFromChannel(startSample, 0, $loopStart * sampleRate);

    let endSample = new Float32Array(endSampleDuration * sampleRate + startSampleLength);
    $audioBuffer.copyFromChannel(endSample, 0, ($loopEnd - endSampleDuration / 2) * sampleRate);

    let smallestDifference = Infinity;
    let bestOffset = 0;
    for (let i = 0; i < endSampleDuration * sampleRate; i++) {
        let difference = getDifference(startSample, endSample, i);
        if (difference < smallestDifference) {
            bestOffset = i;
            smallestDifference = difference;
        }
    }
    
    return $loopEnd - endSampleDuration / 2 + bestOffset / sampleRate;
}