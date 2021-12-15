<script lang="ts">
	import './search.css';

	export let locations: { [key: string]: Loc };
	export let flyTo;
	export let showPopup;

	let searchTerm = '';
	let showSearchResults = true;

	let matchedLocationList: Loc[] = [];

	$: {
		if (searchTerm === '') {
			matchedLocationList = [];
		} else {
			matchedLocationList = Object.entries(locations)
				.filter(([locName, loc]) => locName.includes(searchTerm))
				.map(([locName, loc]) => loc);
		}
	}

	export function clearSearchTerm(): void {
		searchTerm = '';
		showSearchResults = true;
	}

	function setSearchTerm(text: string): void {
		searchTerm = text;
		showSearchResults = false;
	}

	export function flyToLoc(loc: Loc, zoom: number): void {
		setSearchTerm(loc.pref + loc.munic);
		flyTo(loc.coords, zoom);
		showPopup(loc);
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
				on:input={() => (showSearchResults = true)}
				placeholder="市区町村を探す"
			/>
		</div>
		<div class="button" on:click={clearSearchTerm}>
			<i class="material-icons">close</i>
		</div>
	</div>
	<div id="search-results">
		{#if showSearchResults}
			<ul>
				{#each matchedLocationList as loc}
					<li class="search-result-item" on:click={() => flyToLoc(loc, 11)}>
						{loc.pref + loc.munic}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
