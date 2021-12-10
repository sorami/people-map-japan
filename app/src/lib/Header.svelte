<script lang="ts">
	import 'material-design-icons/iconfont/material-icons.css';
	import { flyTo } from '$lib/map/Map.svelte';

	function flyToOrigin() {
		flyTo([139.767144, 35.680621], 5);
	}
</script>

<header>
	<div class="website">
		<a href="https://sorami.dev/" target="_blank" rel="noreferrer">sorami.dev</a>
	</div>
	<div class="title" on:click={flyToOrigin}>
		A People Map of Japan
	</div>
	<div class="about">
		<i class="material-icons">help_outline</i>
	</div>
</header>

<style>
	header {
		z-index: 1;
		position: absolute;
		width: 100%;
		margin-bottom: 1em;
		padding: 0.25em 0;
			
		display: inline-flex;
		justify-content: space-between;
		align-items: center;

		box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.25);
		background-color: rgba(0, 0, 0, 0.6);
	}

	.website {
		margin-left: 1em;
		font-size: 0.8em;
		font-weight: bold;
	}
	.website a {
		color: #fff;
		opacity: 0.25;
		text-decoration: none;
	}
	.website a:hover {
		color: #34be82;
		text-decoration: underline;
		opacity: 1;
	}

	.title {
		color: #34be82;
		font-size: 1.2em;
		font-weight: bold;
		padding: 0;
		margin: 0;
		opacity: 0.8;
	}
	.title:hover {
		cursor: pointer;
	}

	.about {
		margin-right: 1em;
		opacity: 0.5;
		color: #fff;
	}
	.about:hover {
		cursor: pointer;
		opacity: 1;
		color: #34be82;
	}
	.about .material-icons {
		vertical-align: middle;
	}
</style>