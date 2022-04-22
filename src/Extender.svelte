<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import WaveGraph from "./WaveGraph.svelte";
    import Download from "./Download.svelte";
    import {
        loopStart,
        loopEnd,
        duration,
        file,
        filename,
        storedInLibrary,
    } from "./stores";
    import { findEndTime } from "./find-end-time";
    import { dbPromise } from "./db";

    import Grid, { Cell } from "@smui/layout-grid";
    import Card from "@smui/card";
    import Dialog, { Title, Actions, Content } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import IconButton from "@smui/icon-button";
    import SvgIcon from "./SvgIcon.svelte";
    import {
        mdiMagnifyMinusOutline,
        mdiMagnifyPlusOutline,
        mdiAutoFix,
        mdiPlay,
        mdiBookmarkMultipleOutline,
        mdiDownload,
    } from "@mdi/js";

    const spanFull = { desktop: 12, tablet: 8, phone: 4 };
    const spanHalf = { desktop: 6, tablet: 4, phone: 2 };

    let start: (when?: number, offset?: number, duration?: number) => void;
    let zoom = 1;

    async function addToLibrary() {
        let db = await dbPromise;
        db.put("library", {
            name: $filename,
            loopStart: $loopStart,
            loopEnd: $loopEnd,
            file: $file,
        });
        $storedInLibrary = true;
    }

    let dialogOpen = false;
    let download: () => void;
</script>

<Grid>
    <Cell spanDevices={spanFull}>
        <Player
            on:duration={() => {
                if (!$storedInLibrary) $loopEnd = Math.floor($duration);
            }}
            bind:start
        />
    </Cell>

    <Cell spanDevices={spanHalf}>
        <Card>
            <TimeInput
                value={loopStart}
                min={0}
                max={$loopEnd}
                title="Loop from"
            />
        </Card>
    </Cell>
    <Cell spanDevices={spanHalf}>
        <Card>
            <TimeInput
                value={loopEnd}
                min={$loopStart}
                max={$duration}
                title="until"
            />
        </Card>
    </Cell>

    <Cell spanDevices={spanFull}>
        <Card padded>
            <WaveGraph {zoom} />
            <div>
                <IconButton on:click={() => (zoom *= 2)}>
                    <SvgIcon icon={mdiMagnifyMinusOutline} />
                </IconButton>
                {zoom}
                <IconButton disabled={zoom === 1} on:click={() => (zoom /= 2)}>
                    <SvgIcon icon={mdiMagnifyPlusOutline} />
                </IconButton>

                <Button on:click={() => ($loopEnd = findEndTime())}>
                    <SvgIcon icon={mdiAutoFix} />
                    <Label>Adjust end time</Label>
                </Button>

                <Button on:click={() => start(0, Math.max($loopEnd - 5, 0))}>
                    <SvgIcon icon={mdiPlay} />
                    <Label>Test timings</Label>
                </Button>
            </div>
        </Card>
    </Cell>

    <Cell spanDevices={spanFull}>
        <Card padded>
            <div>
                <Button on:click={addToLibrary}>
                    <SvgIcon icon={mdiBookmarkMultipleOutline} />
                    <Label>
                        {#if $storedInLibrary}
                            Update in library
                        {:else}
                            Add to library
                        {/if}
                    </Label>
                </Button>
                <Button on:click={() => (dialogOpen = true)}>
                    <SvgIcon icon={mdiDownload} />
                    <Label>Download</Label>
                </Button>
            </div>
        </Card>
    </Cell>
</Grid>

<Dialog bind:open={dialogOpen}>
    <Title>Download</Title>
    <Content>
        <Download bind:download />
    </Content>
    <Actions>
        <Button>
            <Label>Cancel</Label>
        </Button>
        <Button on:click={download}>
            <Label>Download</Label>
        </Button>
    </Actions>
</Dialog>
