<script lang="ts">
    import { file } from "./stores";

    let fileElement: HTMLInputElement;
    let url: string;

    async function loadFile() {
        if (fileElement.files.length > 0) {
            $file = await loadFromFileInput();
        } else {
            try {
                let result = await fetch(url);
                $file = await result.arrayBuffer();
            } catch (e) {
                console.error(e);
                alert("Could not read the file, because the server does not allow it. " +
                "Please download and upload it manually.");
            }
        }
    }

    function loadFromFileInput(): Promise<ArrayBuffer> {
        return new Promise((resolve) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                let result = e.target.result;
                if (typeof result === "object") resolve(result);
            };
            reader.onerror = (e) => {
                console.error(e.target.error);
                alert("Could not read the file");
            };
            reader.readAsArrayBuffer(fileElement.files[0]);
        });
    }
</script>

<p>Choose an audio file to extend</p>
<div class="input-container">
    <input type="file" accept="audio/*" bind:this={fileElement} />
    <span>or</span>
    <input type="url" placeholder="Enter a URL" bind:value={url} />
</div>
<button on:click={loadFile}>Extend</button>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        max-width: 80%;
        width: 20em;
        height: 2.5em;
        margin: 0;
    }

    span {
        margin: 0.5em;
    }

    button {
        margin: 0.5em;
    }

    @media (min-width: 640px) {
        .input-container {
            flex-direction: row;
        }

        input {
            max-width: 40%;
        }
    }
</style>
