<script lang="ts">
	import { flyTo } from '$lib/map/Map.svelte';
	import 'material-design-icons/iconfont/material-icons.css';

	let searchTerm = '';
	let hideSearchResults = false;

	type Location = [string, [number, number]]; // [name, [lon, lat]]
	let locations: Location[] = [];
	let matchedLocations: Location[] = [];

	fetch('/data/locations.json')
		.then((res) => res.json())
		.then((data) => (locations = data))
		.catch((e) => console.error(e));

	$: {
		if (searchTerm === '' || hideSearchResults) {
			matchedLocations = [];
		} else {
			matchedLocations = locations.filter((loc) => loc[0].includes(searchTerm));
		}
	}

	export function setSearchTerm(text: string): void {
		searchTerm = text;
		hideSearchResults = true;
	}

	export function resetSearchTerm(): void {
		searchTerm = '';
		hideSearchResults = false;
	}

	function flyToAndSetSearchTerm(loc: Location): void {
		flyTo(loc[1]);
		setSearchTerm(loc[0]);
	}

	function flyToRandom(): void {
		const selected = locations[Math.floor(Math.random() * locations.length)];
		flyToAndSetSearchTerm(selected);
	}
</script>

<div id="random" on:click={flyToRandom}>
	<i class="material-icons">flight_takeoff</i>
	<span>どこかへ飛ぶ</span>
</div>

<div id="search-container">
	<div id="search-bar">
		<div class="icon">
			<i class="material-icons">search</i>
		</div>
		<div class="input">
			<input
				type="text"
				bind:value={searchTerm}
				on:input={() => (hideSearchResults = false)}
				placeholder="市区町村を探す"
			/>
		</div>
		<div class="button" on:click={resetSearchTerm}>
			<i class="material-icons">close</i>
		</div>
	</div>
	<div id="search-results">
		<ul>
			{#each matchedLocations as loc}
				<li class="search-result-item" on:click={() => flyToAndSetSearchTerm(loc)}>{loc[0]}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.material-icons {
		vertical-align: middle;
	}

	#random {
		z-index: 1;
		position: absolute;
		bottom: 0em;
		right: 0;
		margin: 2em 1em;
		padding: 0.5em;
		padding-right: 1em;
		border-radius: 0.5em;
		box-shadow: 0 4px 8px rgb(0, 0, 0, 0.5);
		background-color: #e26a2c;
		color: #fff;
	}
	#random {
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}
	#random:hover {
		background-color: #ff8243;
		cursor: pointer;
	}
	#random:active {
		bottom: -0.15em;
		box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.8);
	}
	#random span {
		vertical-align: middle;
		font-weight: bold;
		font-family: sans-serif;
	}

	#search-container {
		z-index: 1;
		position: absolute;
		top: 1em;
		right: 0;
		margin: 2em 1em;
		--text-color: #000;
		--background-color: #dfdfdf;
	}

	#search-bar {
		box-shadow: 0 4px 8px rgb(0, 0, 0, 0.5);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 18em;
		background: var(--background-color);
		color: var(--text-color);
	}
	#search-bar .icon {
		margin: 0 0.5em;
	}
	#search-bar .input {
		margin: 0.5em 0;
	}
	#search-bar .input input {
		font-size: 1rem;
		width: 13em;
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
		background-color: rgba(0, 0, 0, 0.25);
	}

	#search-results {
		color: var(--text-color);
		background-color: var(--background-color);
		width: 18em;
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
