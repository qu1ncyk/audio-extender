<script lang="ts">
	import FilePicker from "./FilePicker.svelte";
	import Extender from "./Extender.svelte";
</script>

<svelte:head>
	<title>Audio Extender</title>
</svelte:head>

<header>
	<h1>Audio Extender</h1>
</header>

<main>
	{#if false}
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
