declare class AudioWorkletProcessor {
    port: MessagePort;
}
declare function registerProcessor(name: string, processorCtor: typeof AudioWorkletProcessor): void;

class PreciseTimeAnalyserProcessor extends AudioWorkletProcessor {
    buffers: Float32Array[];
    messageReceived: boolean;

    constructor() {
        super();

        this.buffers = [];
        this.messageReceived = false;

        this.port.onmessage = e => {
            if (this.buffers.length < 15)
                this.messageReceived = true;
            else
                this.port.postMessage(this.buffers);
        };
    }

    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: void) {
        if (this.buffers.length < 15) {

            let input = inputs[0][0];
            let buffer = new Float32Array(input);
            this.buffers.push(buffer);

            if (this.buffers.length === 15 && this.messageReceived)
                this.port.postMessage(this.buffers);
        }

        outputs = inputs;
    }
}

registerProcessor("precise-time-analyser-processor", PreciseTimeAnalyserProcessor);