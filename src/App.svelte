<script lang="ts">
	import FilePicker from "./FilePicker.svelte";
	import Extender from "./Extender.svelte";
	import Library from "./Library.svelte";
	import { currentPage, Page } from "./stores";

	import "@fontsource/roboto/300.css";
	import "@fontsource/roboto/400.css";
	import "@fontsource/roboto/500.css";
	import "@fontsource/roboto/700.css";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
	import SvgIcon from "./SvgIcon.svelte";
	import { mdiArrowLeft } from "@mdi/js";

	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("sw.js");
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

<style>
	main {
		text-align: center;
	}
</style>
