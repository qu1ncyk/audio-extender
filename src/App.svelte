<script lang="ts">
	import FilePicker from "./FilePicker.svelte";
	import Extender from "./Extender.svelte";
	import {file} from "./stores";
</script>

<svelte:head>
	<title>Audio Extender</title>
</svelte:head>

<header>
	<h1>Audio Extender</h1>
</header>

<main>
	{#if $file.byteLength === 0}
		<FilePicker />
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
