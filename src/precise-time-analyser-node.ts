export default class PreciseTimeAnalyserNode extends AudioWorkletNode {
    constructor(context: BaseAudioContext) {
        super(context, "precise-time-analyser-processor");
    }

    static addModule(context: BaseAudioContext) {
        return context.audioWorklet.addModule("build/precise-time-analyser-processor.js");
    }

    message(): Promise<Float32Array[]> {
        return new Promise(resolve => {
            this.port.onmessage = e => {
                resolve(e.data);
            };
            this.port.postMessage(null);
        });
    }

    async getFloatTimeDomainData(f32: Float32Array) {
        let buffers = await this.message();
        let i = 0;
        for(let buffer of buffers) {
            for(let number of buffer) {
                f32[i++] = number;
                if(i === f32.length)
                    return;
            }
        }
    }
}