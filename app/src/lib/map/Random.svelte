<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let locationNamesWithPerson;

	function selectRandomLocName(): void {
		const selected =
			locationNamesWithPerson[Math.floor(Math.random() * locationNamesWithPerson.length)];
		dispatch('click', selected);
	}
</script>

<div id="random" on:click={selectRandomLocName}>
	<i class="material-icons">flight</i>
	<span>どこかへ飛ぶ</span>
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
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
	}
</style>
