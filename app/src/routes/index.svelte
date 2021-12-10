<script lang="ts">
	import '../app.css';
	import Map from '$lib/map/Map.svelte';
	import Header from '$lib/Header.svelte';
	import Search from '$lib/Search.svelte';
</script>

<svelte:head>
	<title>A People Map of Japan</title>
</svelte:head>

<Map />
<Header />
<Search />
