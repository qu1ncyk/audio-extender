<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    import { secondsToTime } from "./convert-time";
    import { dbPromise, type SongData } from "./db";
    import {
        currentPage,
        file,
        filename,
        storedInLibrary,
        Page,
        loopStart,
        loopEnd,
    } from "./stores";

    import List, {
        Text,
        Item,
        Meta,
        PrimaryText,
        SecondaryText,
    } from "@smui/list";
    import MenuSurface from "@smui/menu-surface";
    import Button, { Label } from "@smui/button";
    import IconButton from "@smui/icon-button";
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Textfield from "@smui/textfield";
    import SvgIcon from "./SvgIcon.svelte";
    import { mdiDotsVertical } from "@mdi/js";

    interface Props {
        entry: SongData;
    }

    let { entry }: Props = $props();

    let menu: MenuSurface;

    let dialogOpen = $state(false);
    let name = $state("");
    let buttonContainer: HTMLElement | undefined = $state();

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
    async function loadFile(fname: string) {
        let db = await dbPromise;
        let data = await db.get("library", fname);
        if (data === undefined) {
            throw new Error("DB.library is undefined");
        }
        $file = data.file;
        $filename = fname;
        $loopStart = data.loopStart;
        $loopEnd = data.loopEnd;
        $storedInLibrary = true;
        $currentPage = Page.extender;
    }

    function renameFile() {
        menu.setOpen(false);
        name = entry.name;
        dialogOpen = true;
    }

    async function renameDialogClose() {
        let db = await dbPromise;
        let tx = db.transaction("library", "readwrite");
        let store = tx.objectStore("library");
        store.delete(entry.name);
        store.put({ ...entry, name });

        libraryData = getLibraryData();
    }

    async function deleteFile() {
        let fname = entry.name;

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

<Item onSMUIAction={() => loadFile(entry.name)}>
    <Text>
        {entry.name}
    </Text>
    <Meta>
        <span bind:this={buttonContainer}>
            <IconButton
                onclick={(e) => {
                    e.stopImmediatePropagation();
                    menu.setOpen(true);
                }}
                touch
            >
                <SvgIcon icon={mdiDotsVertical} />
            </IconButton>
        </span>
    </Meta>
</Item>

<MenuSurface bind:this={menu} anchorElement={buttonContainer} anchor={false}>
    <List nonInteractive>
        <Item>
            <Text>
                <PrimaryText>Loop time</PrimaryText>
                <SecondaryText>
                    {secondsToTime(Math.round(entry.loopStart))}
                    - {secondsToTime(Math.round(entry.loopEnd))}
                </SecondaryText>
            </Text>
        </Item>
        <Item>
            <Text>
                <PrimaryText>Size</PrimaryText>
                <SecondaryText>{getSize(entry.file)}</SecondaryText>
            </Text>
        </Item>
        <Item>
            <Button variant="raised" onclick={renameFile}>
                <Label>Rename</Label>
            </Button>
        </Item>
        <Item>
            <Button variant="raised" class="red" onclick={deleteFile}>
                <Label>Delete</Label>
            </Button>
        </Item>
    </List>
</MenuSurface>

<Dialog bind:open={dialogOpen} onSMUIDialogClosed={renameDialogClose}>
    <Title>Rename file</Title>
    <Content>
        <form onsubmit={preventDefault(() => (dialogOpen = false))}>
            <Textfield bind:value={name} />
        </form>
    </Content>
    <Actions>
        <Button>Ok</Button>
    </Actions>
</Dialog>
