<script lang="ts">
    import { secondsToTime } from "./convert-time";
    import { dbPromise } from "./db";
    import {
        currentPage,
        file,
        filename,
        storedInLibrary,
        Page,
        loopStart,
        loopEnd,
    } from "./stores";

    import Card from "@smui/card";
    import List, {
        Text,
        Item,
        Meta,
        PrimaryText,
        SecondaryText,
    } from "@smui/list";
    import Menu from "@smui/menu";
    import Button, { Label } from "@smui/button";
    import type { MenuComponentDev } from "@smui/menu";
    import IconButton from "@smui/icon-button";
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Textfield from "@smui/textfield";
    import CircularProgress from "@smui/circular-progress";
    import SvgIcon from "./SvgIcon.svelte";
    import { mdiDotsVertical } from "@mdi/js";

    let menu: MenuComponentDev;
    let position = { top: 0, right: 0 };
    let scrollY = 0;
    let windowWidth = 0;
    let selectedEntry = {
        name: "",
        loopStart: 0,
        loopEnd: 0,
        file: new ArrayBuffer(0),
    };

    let dialogOpen = false;
    let name = "";

    /**
     * Positions the menu over the 3 dots
    */
    function positionMenu(element) {
        let rect = element.getBoundingClientRect();
        position.top = rect.top + scrollY;
        position.right = windowWidth - rect.right;
    }

    function getSize(buffer: ArrayBuffer) {
        let size = buffer.byteLength;
        const units = ["kB", "MB", "GB", "TB"];
        let unit = "B";

        for (let i = 0; i < units.length; i++) {
            if (size >= 1000) {
                size /= 1024;
                unit = units[i];
            }
        }

        return `${size.toFixed(2)} ${unit}`;
    }

    async function getLibraryData() {
        let db = await dbPromise;
        return db.getAll("library");
    }
    let libraryData = getLibraryData();

    /**
     * Loads a file in the extender
     */
    async function loadFile(fname) {
        let db = await dbPromise;
        let data = await db.get("library", fname);
        $file = data.file;
        $filename = fname;
        $loopStart = data.loopStart;
        $loopEnd = data.loopEnd;
        $storedInLibrary = true;
        $currentPage = Page.extender;
    }

    function renameFile() {
        name = selectedEntry.name;
        dialogOpen = true;
    }

    async function renameDialogClose() {
        let db = await dbPromise;
        let tx = db.transaction("library", "readwrite");
        let store = tx.objectStore("library");
        store.delete(selectedEntry.name);
        store.put({...selectedEntry, name});

        libraryData = getLibraryData();
    }

    async function deleteFile() {
        let fname = selectedEntry.name;

        let db = await dbPromise;
        let tx = db.transaction("library", "readwrite");
        let store = tx.objectStore("library");
        await store.delete(fname);

        if ((await store.getAllKeys()).length > 0) {
            libraryData = getLibraryData();
        } else {
            $currentPage = Page.filePicker;
        }
    }
</script>

<svelte:window bind:scrollY bind:innerWidth={windowWidth} />

<Card>
    {#await libraryData}
        <CircularProgress style="width: 50px; height: 50px; margin: 25px auto;" indeterminate />
    {:then libraryData}
        <List>
            {#each libraryData as entry}
                <Item on:SMUI:action={() => loadFile(entry.name)}>
                    <Text>
                        {entry.name}
                    </Text>
                    <Meta>
                        <div on:click|stopPropagation>
                            <IconButton
                                on:click={(e) => {
                                    positionMenu(e.target);
                                    selectedEntry = entry;
                                    menu.setOpen(true);
                                }}
                                touch
                            >
                                <SvgIcon icon={mdiDotsVertical} />
                            </IconButton>
                        </div>
                    </Meta>
                </Item>
            {/each}
        </List>
    {:catch}
        <p class="error">An error occurred</p>
    {/await}
</Card>

<div style:right="{position.right}px" style:top="{position.top}px" class="menu">
    <Menu bind:this={menu}>
        <List nonInteractive>
            <Item>
                <Text>
                    <PrimaryText>Loop time</PrimaryText>
                    <SecondaryText>
                        {secondsToTime(Math.round(selectedEntry.loopStart))}
                        - {secondsToTime(Math.round(selectedEntry.loopEnd))}
                    </SecondaryText>
                </Text>
            </Item>
            <Item>
                <Text>
                    <PrimaryText>Size</PrimaryText>
                    <SecondaryText>{getSize(selectedEntry.file)}</SecondaryText>
                </Text>
            </Item>
            <Item>
                <Button variant="raised" on:click={renameFile}>
                    <Label>Rename</Label>
                </Button>
            </Item>
            <Item>
                <Button variant="raised" class="red" on:click={deleteFile}>
                    <Label>Delete</Label>
                </Button>
            </Item>
        </List>
    </Menu>
</div>

<Dialog bind:open={dialogOpen} on:SMUIDialog:closed={renameDialogClose}>
    <Title>Rename file</Title>
    <Content>
        <form on:submit|preventDefault={() => (dialogOpen = false)}>
            <Textfield bind:value={name} />
        </form>
    </Content>
    <Actions>
        <Button>Ok</Button>
    </Actions>
</Dialog>

<style>
    .menu {
        position: absolute;
        text-align: left;
    }
</style>
