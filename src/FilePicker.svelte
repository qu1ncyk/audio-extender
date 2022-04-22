<script lang="ts">
    import { file, currentPage, Page, filename } from "./stores";
    import { dbPromise } from "./db";

    import Card from "@smui/card";
    import Grid, { Cell } from "@smui/layout-grid";
    import Textfield from "@smui/textfield";
    import IconButton from "@smui/icon-button";
    import SvgIcon from "./SvgIcon.svelte";
    import {
        mdiCheck,
        mdiUpload,
        mdiLinkVariant,
        mdiBookmarkMultipleOutline,
    } from "@mdi/js";
    import Button, { Label } from "@smui/button";
    import { Label as FormLabel } from "@smui/common/elements";
    import Snackbar, { Label as SbLabel } from "@smui/snackbar";
    import type { SnackbarComponentDev } from "@smui/snackbar";

    let files: FileList | null = null;
    let url = "";

    enum FileSource {
        file,
        url,
    }

    $: files && loadFile(FileSource.file);

    let snackbar: SnackbarComponentDev;

    async function loadFile(source: FileSource) {
        if (source === FileSource.file) {
            $file = await loadFromFileInput();
        } else {
            try {
                let splitUrl = new URL(url).pathname.split("/");
                $filename = decodeURIComponent(
                    splitUrl[splitUrl.length - 1] ||
                        // use the second last part if the url ends with /
                        splitUrl[splitUrl.length - 2]
                );

                let result = await fetch(url);
                $file = await result.arrayBuffer();
            } catch (e) {
                console.error(e);
                snackbar.open();
            }
        }
        if ($file.byteLength !== 0) $currentPage = Page.extender;
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
            $filename = files[0].name;
            reader.readAsArrayBuffer(files[0]);
        });
    }

    async function isLibraryEmpty() {
        let db = await dbPromise;
        let keys = await db.getAllKeys("library", null, 1);
        return keys.length === 0;
    }
</script>

<div>
    <Card>
        <Grid>
            <Cell span={12}>
                <p>Choose an audio file to extend</p>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 2, phone: 4 }}>
                <Button
                    component={FormLabel}
                    class="full-size"
                    variant="outlined"
                >
                    <SvgIcon icon={mdiUpload} />
                    <Label>Upload a file</Label>
                    <input type="file" bind:files accept="audio/*,video/*" />
                </Button>
            </Cell>
            <Cell
                spanDevices={{ desktop: 1, tablet: 1, phone: 4 }}
                align="middle"
            >
                <span class="or">or</span>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 2, phone: 4 }}>
                <form on:submit|preventDefault={() => loadFile(FileSource.url)}>
                    <Textfield
                        bind:value={url}
                        label="URL"
                        variant="outlined"
                        style="width: 100%;"
                        type="url"
                        required
                    >
                        <SvgIcon
                            slot="leadingIcon"
                            class="mdc-text-field__icon mdc-text-field__icon--leading"
                            icon={mdiLinkVariant}
                        />
                        <IconButton
                            slot="trailingIcon"
                            touch
                            style="margin: auto;"
                        >
                            <SvgIcon icon={mdiCheck} />
                        </IconButton>
                    </Textfield>
                </form>
            </Cell>
            <Cell
                spanDevices={{ desktop: 1, tablet: 1, phone: 4 }}
                align="middle"
            >
                <span class="or">or</span>
            </Cell>
            <Cell spanDevices={{ desktop: 4, tablet: 2, phone: 4 }}>
                {#await isLibraryEmpty()}
                    <Button variant="outlined" class="full-size" disabled>
                        <SvgIcon icon={mdiBookmarkMultipleOutline} />
                        <Label>Waiting for library...</Label>
                    </Button>
                {:then isEmpty}
                    {#if !isEmpty}
                        <Button
                            variant="outlined"
                            class="full-size"
                            on:click={() => ($currentPage = Page.library)}
                        >
                            <SvgIcon icon={mdiBookmarkMultipleOutline} />
                            <Label>Choose from library</Label>
                        </Button>
                    {:else}
                        <Button variant="outlined" class="full-size" disabled>
                            <SvgIcon icon={mdiBookmarkMultipleOutline} />
                            <Label>Library is empty</Label>
                        </Button>
                    {/if}
                {:catch}
                    <Button variant="outlined" class="full-size" disabled>
                        <SvgIcon icon={mdiBookmarkMultipleOutline} />
                        <Label>Library is not available</Label>
                    </Button>
                {/await}
            </Cell>
        </Grid>
    </Card>
</div>

<Snackbar bind:this={snackbar} timeoutMs={8000}>
    <SbLabel>
        Could not read the file, because the server does not allow it. Please
        download and upload it manually.
    </SbLabel>
</Snackbar>

<style>
    * :global(.full-size) {
        width: 100%;
        height: 100%;
    }

    input[type="file"] {
        display: none;
    }
</style>
