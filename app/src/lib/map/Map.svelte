<script lang="ts">
	import 'material-design-icons/iconfont/material-icons.css';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import './map.css';

	import maplibregl from 'maplibre-gl';
	import { onMount } from 'svelte';
	import { addHighlight } from './utils';

	import Search from './Search.svelte';
	import Random from './Random.svelte';

	let map: maplibregl.Map;
	let popup: maplibregl.Popup;
	let locations: Loc[] = [];
	let locationsWithPerson: Loc[] = [];
	let searchComponent: Search;

	onMount(async () => {
		loadMap();

		fetch('data/locations.json')
			.then((res) => res.json())
			.then((data) => {
				locations = data;
				locationsWithPerson = locations.filter((loc) => loc[2]);
			})
			.catch((e) => console.error(e));
	});

	function flyTo(center: [number, number], zoom: number): void {
		if (map) {
			map.flyTo({ center, zoom });
		}
	}

	const flyToLabelClick = function (e) {
		e.preventDefault();
		hidePopup();
		const props = e.features[0].properties;
		const locName = props.pref + props.munic;
		const coords = e.features[0].geometry.coordinates;
		searchComponent.setSearchTermAndFly([locName, coords, true], 11);
	};

	function flyToRandom(event) {
		const loc = event.detail;
		searchComponent.setSearchTermAndFly(loc, 10);
	}

	const showPopup = function (e) {
		if (e.type === 'touchstart' && map.getZoom() < 10) return;
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

	function loadMap(): void {
		map = new maplibregl.Map({
			container: 'map',
			hash: false,
			style: 'mapstyle.json',
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

		map.on('load', function () {
			const locationGroups = ['sm', 'md', 'lg'];
			const circleRadiusDict = {
				sm: 7.5,
				md: 15,
				lg: 30
			};
			const labelSizeDict = {
				na: 0.8,
				sm: 0.9,
				md: 1.1,
				lg: 1.3
			};
			const labelMinZoomDict = {
				na: 9,
				sm: 0,
				md: 0,
				lg: 0
			};

			map.addSource('people', {
				type: 'geojson',
				data: 'data/people.geojson'
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

			// Add circles first
			locationGroups.forEach((group) => {
				map.addLayer({
					id: `people-circle-${group}`,
					type: 'circle',
					source: 'people',
					filter: ['==', 'group', group],
					paint: {
						'circle-color': '#34BE82',
						'circle-radius': [
							'interpolate',
							['linear'],
							['zoom'],
							6,
							circleRadiusDict[group] * 0.35,
							13,
							circleRadiusDict[group]
						],
						'circle-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0.25, 12, 1]
					}
				});
			});

			// Add labels, after cirlcles
			locationGroups.forEach((group) => {
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

		popup = new maplibregl.Popup({
			closeButton: false,
			closeOnClick: true
		});
	}
</script>

<section>
	<div id="map" />
	<Search {locations} {flyTo} bind:this={searchComponent} />
	<Random {locationsWithPerson} on:click={flyToRandom} />
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
