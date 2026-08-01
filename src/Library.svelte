<script lang="ts">
    import { dbPromise } from "./db";

    import Card from "@smui/card";
    import List from "@smui/list";
    import CircularProgress from "@smui/circular-progress";
    import LibraryItem from "./LibraryItem.svelte";

    async function getLibraryData() {
        let db = await dbPromise;
        return db.getAll("library");
    }
    let libraryData = getLibraryData();
</script>

<Card>
    {#await libraryData}
        <CircularProgress style="width: 50px; height: 50px; margin: 25px auto;" indeterminate />
    {:then libraryData}
        <List>
            {#each libraryData as entry}
                <LibraryItem {entry} />
            {/each}
        </List>
    {:catch}
        <p class="error">An error occurred</p>
    {/await}
</Card>
