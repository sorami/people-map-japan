<script lang="ts">
	import './search.css';

	export let locations: Loc[];
	export let searchTerm: string;
	export let hideSearchResults: boolean;
	export let flyToAndSetSearchTerm;

	let matchedLocations: Loc[] = [];

	$: {
		if (searchTerm === '' || hideSearchResults) {
			matchedLocations = [];
		} else {
			matchedLocations = locations.filter((loc) => loc[0].includes(searchTerm));
		}
	}

	function flyTo(loc): void {
		searchTerm = loc[0];
		hideSearchResults = true;
		flyToAndSetSearchTerm(loc);
	}

	function clearSearchTerm(): void {
		searchTerm = '';
		hideSearchResults = false;
	}
</script>

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
		<div class="button" on:click={clearSearchTerm}>
			<i class="material-icons">close</i>
		</div>
	</div>
	<div id="search-results">
		<ul>
			{#each matchedLocations as loc}
				<li class="search-result-item" on:click={() => flyTo(loc)}>{loc[0]}</li>
			{/each}
		</ul>
	</div>
</div>
