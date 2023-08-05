<script lang="ts">
    import FilePicker from "./FilePicker.svelte";
    import Extender from "./Extender.svelte";
    import Library from "./Library.svelte";
    import { currentPage, Page } from "./stores";
    import { exportLibrary } from "./import-export/export-library";
    import { importLibrary } from "./import-export/import-library";

    import "@fontsource/roboto/300.css";
    import "@fontsource/roboto/400.css";
    import "@fontsource/roboto/500.css";
    import "@fontsource/roboto/700.css";
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Menu from "@smui/menu";
    import type { MenuComponentDev } from "@smui/menu";
    import List, { Item, Text } from "@smui/list";
    import Snackbar, { Label as SbLabel } from "@smui/snackbar";
    import type { SnackbarComponentDev } from "@smui/snackbar";
    import SvgIcon from "./SvgIcon.svelte";
    import { mdiArrowLeft, mdiDotsVertical } from "@mdi/js";

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js");
    }

    let menu: MenuComponentDev;
    let snackbar: SnackbarComponentDev;
    let error = "";

    /** Wrap a function in an error handling function */
    function handleError(fn: () => Promise<any>) {
        return async () => {
            try {
                await fn();
            } catch (e) {
                error = String(e);
                snackbar.open();
            }
        };
    }
</script>

<TopAppBar variant="static" class="variant">
    <Row>
        <Section>
            <IconButton
                class="variant"
                on:click={() => ($currentPage = Page.filePicker)}
                disabled={$currentPage === Page.filePicker}
            >
                <SvgIcon icon={mdiArrowLeft} />
            </IconButton>
            <Title>Audio Extender</Title>
        </Section>
        <Section align="end">
            <div>
                <IconButton class="variant" on:click={() => menu.setOpen(true)}>
                    <SvgIcon icon={mdiDotsVertical} />
                </IconButton>
                <Menu bind:this={menu}>
                    <List>
                        <Item on:SMUI:action={handleError(exportLibrary)}>
                            <Text>Export library</Text>
                        </Item>
                        <Item on:SMUI:action={handleError(importLibrary)}>
                            <Text>Import library</Text>
                        </Item>
                    </List>
                </Menu>
            </div>
        </Section>
    </Row>
</TopAppBar>

<main>
    {#if $currentPage === Page.filePicker}
        <FilePicker />
    {:else if $currentPage === Page.library}
        <Library />
    {:else}
        <Extender />
    {/if}
</main>

<Snackbar bind:this={snackbar}>
    <SbLabel>Error: {error}</SbLabel>
</Snackbar>

<style>
    main {
        text-align: center;
    }
</style>
