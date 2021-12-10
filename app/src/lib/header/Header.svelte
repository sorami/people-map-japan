<script lang="ts">
	import 'material-design-icons/iconfont/material-icons.css';
	import About, { getModal } from '$lib/header/About.svelte';
</script>

<header>
	<div class="website">
		<a href="https://sorami.dev/" target="_blank" rel="noreferrer">sorami.dev</a>
	</div>
	<div class="title" on:click={() => getModal().open()}>A People Map of Japan</div>
	<div class="about" on:click={() => getModal().open()}>
		<i class="material-icons">help_outline</i>
	</div>
</header>

<About />

<style>
	header {
		z-index: 1;
		position: absolute;
		width: 100%;
		margin-bottom: 1em;
		padding: 0.5em 0;

		display: inline-flex;
		justify-content: space-between;
		align-items: center;

		background-color: rgb(33, 33, 33, 0.75);
		box-shadow: 0 2px 4px 0 rgb(33, 33, 33, 0.25);
	}

	.website {
		margin-left: 1em;
		font-size: 1em;
		font-weight: bold;
		font-family: monospace;
	}
	.website a {
		color: #fff;
		opacity: 0.5;
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
		opacity: 0.85;
	}
	.title:hover {
		cursor: pointer;
	}

	.about {
		margin-right: 1em;
		opacity: 0.75;
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
