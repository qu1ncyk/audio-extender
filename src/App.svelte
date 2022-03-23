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
</script>

<svelte:head>
	<title>Audio Extender</title>
</svelte:head>

<TopAppBar variant="static">
	<Row>
		<Section>
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
