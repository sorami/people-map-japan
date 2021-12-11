<script lang="ts">
	import 'material-design-icons/iconfont/material-icons.css';
	import About, { getModal } from '$lib/header/About.svelte';
</script>

<header>
	<div class="icon">
		<a href="https://sorami.dev/" target="_blank" rel="noreferrer">
			<i class="material-icons">home</i>
		</a>
	</div>
	<div class="title" on:click={() => getModal().open()}>A People Map of Japan</div>
	<div class="icon" on:click={() => getModal().open()}>
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

	.title {
		color: #fff;
		font-size: 1.2em;
		font-weight: bold;
		padding: 0;
		margin: 0;
		opacity: 0.85;
	}
	.title:hover {
		color: #34be82;
		cursor: pointer;
	}

	.icon {
		margin: 0 0.5em;
		opacity: 0.75;
		color: #fff;
	}
	.icon a {
		color: #fff;
	}
	.icon:hover {
		cursor: pointer;
		opacity: 1;
		color: #34be82;
	}
	.icon .material-icons {
		vertical-align: middle;
	}
</style>
