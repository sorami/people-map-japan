<script lang="ts">
	import 'material-design-icons/iconfont/material-icons.css';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import './popup.css';
	import './search.css';

	import Random from './Random.svelte';

	import maplibregl from 'maplibre-gl';
	import { onMount } from 'svelte';
	import { addHighlight } from './utils';

	type Location = [string, [number, number]]; // [name, [lon, lat]]

	let map: maplibregl.Map;
	let popup: maplibregl.Popup;
	let locations: Location[] = [];
	let matchedLocations: Location[] = [];
	let searchTerm = '';
	let hideSearchResults = false;

	$: {
		if (searchTerm === '' || hideSearchResults) {
			matchedLocations = [];
		} else {
			matchedLocations = locations.filter((loc) => loc[0].includes(searchTerm));
		}
	}

	onMount(async () => {
		loadMap();

		fetch('/data/locations.json')
			.then((res) => res.json())
			.then((data) => (locations = data))
			.catch((e) => console.error(e));
	});

	function setSearchTerm(text: string): void {
		searchTerm = text;
		hideSearchResults = true;
	}

	function clearSearchTerm(): void {
		searchTerm = '';
		hideSearchResults = false;
	}

	const showPopup = function (e) {
		e.preventDefault();
		const coordinates = e.features[0].geometry.coordinates;
		popup.setLngLat(coordinates);
		const prop = e.features[0].properties;
		const content = `
			<div class="location">${prop.pref}&nbsp;${prop.munic}</div>
			${addHighlight(prop.desc)}
			<a href=${prop.url} target="_blank">Wikipedia</a>
		`;
		popup.setHTML(content);
		popup.addTo(map);
	};

	const hidePopup = function () {
		popup.remove();
	};

	function flyTo(center: [number, number], zoom = 11): void {
		if (map) {
			map.flyTo({ center, zoom });
		}
	}

	function flyToAndSetSearchTerm(loc: Location): void {
		flyTo(loc[1]);
		setSearchTerm(loc[0]);
	}

	const flyToLabelClick = function (e) {
		e.preventDefault();
		hidePopup();
		const props = e.features[0].properties;
		setSearchTerm(props.pref + props.munic);
		flyTo(e.features[0].geometry.coordinates);
	};

	function loadMap(): void {
		map = new maplibregl.Map({
			container: 'map',
			hash: false,
			style: '/mapstyle.json',
			center: [139.767144, 35.680621],
			maxBounds: [
				[110, 20],
				[157, 50]
			],
			zoom: 8,
			maxZoom: 13,
			minZoom: 4,
			bearing: 0,
			pitch: 0,
			attributionControl: false
		});

		popup = new maplibregl.Popup({
			closeButton: false,
			closeOnClick: true
		});

		map.on('load', function () {
			const locationGroups = ['sm', 'md', 'lg'];
			const circleRadiusDict = {
				sm: 5,
				md: 15,
				lg: 30
			};
			const labelSizeDict = {
				na: 0.8,
				sm: 0.9,
				md: 1,
				lg: 1.2
			};
			const labelMinZoomDict = {
				na: 9,
				sm: 6,
				md: 5,
				lg: 0
			};

			map.addSource('people', {
				type: 'geojson',
				data: './data/people.geojson'
			});

			// Location without a person
			map.addLayer({
				id: 'people-label-na',
				type: 'symbol',
				source: 'people',
				filter: ['==', 'group', 'na'],
				minzoom: labelMinZoomDict['na'],
				layout: {
					'text-field': ['format', ['get', 'munic'], { 'font-scale': labelSizeDict['na'] }],
					'text-font': ['NotoSansCJKjp-Regular'],
					'text-anchor': 'center'
				},
				paint: {
					'text-color': '#fff',
					'text-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0.1, 12, 0.5]
				}
			});

			locationGroups.forEach((group) => {
				// A person, circle
				map.addLayer({
					id: `people-circle-${group}`,
					type: 'circle',
					source: 'people',
					filter: ['==', 'group', group],
					paint: {
						'circle-color': '#34BE82',
						'circle-radius': circleRadiusDict[group],
						'circle-opacity': ['interpolate', ['linear'], ['zoom'], 4, 0.01, 13, 1]
					}
				});

				// A person, label
				map.addLayer({
					id: `people-label-${group}`,
					type: 'symbol',
					source: 'people',
					filter: ['==', 'group', group],
					minzoom: labelMinZoomDict[group],
					layout: {
						'text-field': [
							'format',
							['get', 'person'],
							{ 'font-scale': labelSizeDict[group] },
							'\n',
							{},
							['get', 'munic'],
							{ 'font-scale': labelSizeDict[group] * 0.75 }
						],
						'text-font': ['NotoSansCJKjp-Regular'],
						'text-offset': [0, -0.25],
						'text-anchor': 'top'
					},
					paint: {
						'text-color': '#efefef',
						'text-halo-blur': 2,
						'text-halo-color': '#152D35',
						'text-halo-width': 1
					}
				});

				[`people-label-${group}`, `people-circle-${group}`].forEach((c) => {
					map.on('mouseenter', c, showPopup);
					map.on('touchstart', c, showPopup);
					map.on('click', c, flyToLabelClick);
				});
			});

			['click', 'movestart', 'zoomstart'].forEach((e) => {
				map.on(e, hidePopup);
			});
		});

		map.addControl(new maplibregl.AttributionControl(), 'bottom-left');
		map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-left');
		map.addControl(new maplibregl.GeolocateControl(), 'bottom-left');
	}

	function flyToRandom(event) {
		const location = event.detail;
		flyToAndSetSearchTerm(location);
	}
</script>

<section>
	<div id="map" />

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
					<li class="search-result-item" on:click={() => flyToAndSetSearchTerm(loc)}>{loc[0]}</li>
				{/each}
			</ul>
		</div>
	</div>

	<Random {locations} on:click={flyToRandom} />
</section>

<style>
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 0;
	}
</style>
