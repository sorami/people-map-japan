<script lang="ts">
	type Location = [string, [number, number]]; // [name, [lon, lat]]
	let locations: Location[] = [];
	let matchedLocations: Location[] = [];
	let searchTerm: string = '';

	fetch('/data/locations.json')
		.then((res) => res.json())
		.then((data) => (locations = data))
		.catch((e) => console.error(e));

	let hideSearchResult = false;
	$: {
		if (searchTerm === '' || hideSearchResult) {
			matchedLocations = [];
		} else {
			matchedLocations = locations.filter((loc) => loc[0].includes(searchTerm));
		}
	}

	function resetTerm(): void {
		searchTerm = '';
	}

	import { flyTo } from '$lib/map/Map.svelte';
	function flyToAndReset(loc: Location): void {
		searchTerm = loc[0];
		flyTo(loc[1]);
		hideSearchResult = true;
	}
	function flyToRandom(): void {
		const selected = locations[Math.floor(Math.random() * locations.length)];
		flyTo(selected[1], 9);
		searchTerm = selected[0];
		hideSearchResult = true;
	}
</script>

<div id="search-container">
	<div id="search-line-container">
		<div id="search-bar">
			<div class="icon">?</div>
			<div class="input">
				<input
					type="text"
					bind:value={searchTerm}
					on:input={() => (hideSearchResult = false)}
					placeholder="市区町村を探す"
				/>
			</div>
			<div class="button" on:click={resetTerm}>x</div>
		</div>
		<div id="random" on:click={flyToRandom}>ランダム</div>
	</div>
	<div id="search-results">
		<ul>
			{#each matchedLocations as loc}
				<li class="search-result-item" on:click={() => flyToAndReset(loc)}>{loc[0]}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	*:focus {
		outline: none;
	}

	#search-container {
		z-index: 1;
		position: absolute;
		top: 1em;
		left: 0;
		margin: 2em;
		--text-color: #333;
		--background-color: #fff;
	}

	#search-line-container {
		display: flex;
		align-items: center;
	}

	#random {
		margin-left: 0.5em;
		padding: 0.5em;
		border-radius: 0.5em;
		box-shadow: 0 4px 8px rgb(0, 0, 0, 0.5);

		color: #fff;
		background-color: #eb6100;
	}
	#random:hover {
		background: #f56500;
		cursor: pointer;
	}

	#search-bar {
		box-shadow: 0 4px 8px rgb(0, 0, 0, 0.5);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 15em;
		background: var(--background-color);
		color: var(--text-color);
	}
	#search-bar .icon {
		margin-left: 0.5em;
		margin-right: 1em;
		opacity: 0.7;
	}
	#search-bar .input {
		margin: 0.5em 0;
	}
	#search-bar .input input {
		font-size: 1rem;
		width: 90%;
		border: none;
		background-color: var(--background-color);
	}
	#search-bar input::placeholder {
		color: var(--text-color);
		opacity: 0.5;
	}
	#search-bar .button {
		width: 3em;
		padding: 0.5em 0;
		text-align: center;
		cursor: pointer;
		background-color: var(--background-color);
	}
	#search-bar .button:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	#search-results {
		color: var(--text-color);
		background-color: var(--background-color);
		width: 15em;
		max-height: 20em;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	#search-results ul {
		margin: 0;
		padding: 0;
	}
	#search-results li.search-result-item {
		list-style: none;
		padding: 0.5em 0;
		padding-left: 0.5em;
	}
	#search-results li.search-result-item:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
