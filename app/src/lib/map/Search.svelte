<script lang="ts">
	import './search.css';

	export let locations: Loc[];
	export let flyTo;

	let searchTerm = '';
	let showSearchResults = true;

	let matchedLocations: Loc[] = [];

	$: {
		if (searchTerm === '') {
			matchedLocations = [];
		} else {
			matchedLocations = locations.filter((loc) => loc[0].includes(searchTerm));
		}
	}

	function clearSearchTerm(): void {
		searchTerm = '';
		showSearchResults = true;
	}

	function setSearchTerm(text: string): void {
		searchTerm = text;
		showSearchResults = false;
	}

	export function setSearchTermAndFly(loc: Loc): void {
		setSearchTerm(loc[0]);
		flyTo(loc[1]);
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
				{#each matchedLocations as loc}
					<li class="search-result-item" on:click={() => setSearchTermAndFly(loc)}>{loc[0]}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
