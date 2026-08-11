<script lang="ts">
    import Player from "./Player.svelte";
    import TimeInput from "./TimeInput.svelte";
    import WaveGraph from "./WaveGraph.svelte";
    import Download from "./Download.svelte";
    import { globalState } from "./state.svelte";
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

    let player: Player;
    let download: Download = $state()!;
    let zoom = $state(1);

    async function addToLibrary() {
        let db = await dbPromise;
        db.put("library", {
            name: globalState.filename,
            loopStart: globalState.loopStart,
            loopEnd: globalState.loopEnd,
            file: globalState.file,
        });
        globalState.storedInLibrary = true;
    }

    let dialogOpen = $state(false);
</script>

<Grid>
    <Cell spanDevices={spanFull}>
        <Player bind:this={player} />
    </Cell>

    <Cell spanDevices={spanHalf}>
        <Card>
            <TimeInput
                bind:value={globalState.loopStart}
                min={0}
                max={globalState.loopEnd}
                title="Loop from"
            />
        </Card>
    </Cell>
    <Cell spanDevices={spanHalf}>
        <Card>
            <TimeInput
                bind:value={globalState.loopEnd}
                min={globalState.loopStart}
                max={globalState.duration}
                title="until"
            />
        </Card>
    </Cell>

    <Cell spanDevices={spanFull}>
        <Card padded>
            <WaveGraph {zoom} />
            <div>
                <IconButton onclick={() => (zoom *= 2)}>
                    <SvgIcon icon={mdiMagnifyMinusOutline} />
                </IconButton>
                {zoom}
                <IconButton disabled={zoom === 1} onclick={() => (zoom /= 2)}>
                    <SvgIcon icon={mdiMagnifyPlusOutline} />
                </IconButton>

                <Button onclick={() => (globalState.loopEnd = findEndTime())}>
                    <SvgIcon icon={mdiAutoFix} />
                    <Label>Adjust end time</Label>
                </Button>

                <Button
                    onclick={() => player.start(0, Math.max(globalState.loopEnd - 5, 0))}
                >
                    <SvgIcon icon={mdiPlay} />
                    <Label>Test timings</Label>
                </Button>
            </div>
        </Card>
    </Cell>

    <Cell spanDevices={spanFull}>
        <Card padded>
            <div>
                <Button onclick={addToLibrary}>
                    <SvgIcon icon={mdiBookmarkMultipleOutline} />
                    <Label>
                        {#if globalState.storedInLibrary}
                            Update in library
                        {:else}
                            Add to library
                        {/if}
                    </Label>
                </Button>
                <Button onclick={() => (dialogOpen = true)}>
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
        <Download bind:this={download} />
    </Content>
    <Actions>
        <Button>
            <Label>Cancel</Label>
        </Button>
        <Button onclick={() => download.download()}>
            <Label>Download</Label>
        </Button>
    </Actions>
</Dialog>
