<script lang="ts">
	import FilePicker from "./FilePicker.svelte";
	import Extender from "./Extender.svelte";
	import Library from "./Library.svelte";
	import { currentPage, Page } from "./stores";
</script>

<svelte:head>
	<title>Audio Extender</title>
</svelte:head>

<header>
	<h1>Audio Extender</h1>
</header>

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
	main,
	header {
		text-align: center;
	}
</style>
