<script lang="ts">
    import { file, currentPage, Page } from "./stores";
    import Fa from "svelte-fa";
    import { faCheck } from "@fortawesome/free-solid-svg-icons";

    let fileElement: HTMLInputElement;
    let url: string;

    enum FileSource {
        file,
        url,
    }

    async function loadFile(source: FileSource) {
        if (source === FileSource.file) {
            $file = await loadFromFileInput();
        } else {
            try {
                let result = await fetch(url);
                $file = await result.arrayBuffer();
            } catch (e) {
                console.error(e);
                alert(
                    "Could not read the file, because the server does not allow it. " +
                        "Please download and upload it manually."
                );
            }
        }
        if($file.byteLength !== 0) $currentPage = Page.extender;
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
    <input
        type="file"
        accept="audio/*"
        bind:this={fileElement}
        on:input={() => loadFile(FileSource.file)}
    />
    <span class="or">or</span>
    <div class="url-input-container">
        <input type="url" placeholder="Enter a URL" bind:value={url} />
        <button on:click={() => loadFile(FileSource.url)}><Fa icon={faCheck} /></button>
    </div>
    <span class="or">or</span>
    <button on:click={() => $currentPage = Page.library}>Choose from library</button>
</div>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
    }

    .or {
        align-self: center;
    }

    .input-container * {
        text-align: center;
    }

    input[type="file"],
    .url-input-container {
        height: 2.5em;
        margin: 0;
    }

    .url-input-container {
        display: flex;
    }

    input[type="url"] {
        flex: 1;
        margin: 0;
    }

    button {
        margin: 0;
    }

    @media (min-width: 640px) {
        .input-container {
            flex-direction: row;
        }

        .input-container * {
            text-align: left;
        }

        input[type="file"],
        .url-input-container {
            max-width: 40%;
            width: 20em;
        }
    }
</style>
