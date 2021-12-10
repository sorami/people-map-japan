<script context="module" lang="ts">
	let modal = {};

	export function getModal() {
		return modal;
	}
</script>

<script lang="ts">
	let visible = false;
	let topModal;

	function open() {
		if (visible) return;
		document.body.style.overflow = 'hidden';
		visible = true;

		document.body.appendChild(topModal);
	}

	function close() {
		visible = false;
	}

	modal = { open, close };
</script>

<section id="top-modal" class:visible bind:this={topModal} on:click={() => close()}>
	<div id="modal">
		<div id="modal-content">
			<h1>A People Map of Japan, inspired by The Pudding</h1>
			<h2>概要</h2>
			<p>「地名」を「出身人物名」に置き換えた地図です。</p>
			<p>
				<a href="https://pudding.cool/" target="_blank" rel="noreferrer">The Pudding</a> による<a
					href="https://pudding.cool/2019/05/people-map/"
					target="_blank"
					rel="noreferrer">US版</a
				>、<a href="https://pudding.cool/2019/06/people-map-uk/" target="_blank" rel="noreferrer"
					>UK版</a
				>をもとに、独自に作成した日本版です。アイデア自体は The Pudding
				によるものであり、当ページによる発案ではありません。
			</p>
			<p>
				A Japanese version of The Pudding's <a
					href="https://pudding.cool/2019/05/people-map/"
					target="_blank"
					rel="noreferrer">A People Map of the US</a
				>. This is not my original idea, all credit goes to the awesome team at
				<a href="https://pudding.cool/" target="_blank" rel="noreferrer">The Pudding</a>.
			</p>

			<h2>データ</h2>
			<p>
				<a
					href="https://ja.wikipedia.org/wiki/%E5%87%BA%E8%BA%AB%E5%88%A5%E3%81%AE%E4%BA%BA%E5%90%8D%E8%A8%98%E4%BA%8B%E4%B8%80%E8%A6%A7%E3%81%AE%E4%B8%80%E8%A6%A7#%E6%97%A5%E6%9C%AC%E3%81%AE%E5%9C%B0%E5%9F%9F%EF%BC%88%E9%83%BD%E9%81%93%E5%BA%9C%E7%9C%8C%E3%80%81%E5%B8%82%E7%94%BA%E6%9D%91%EF%BC%89"
					target="_blank"
					rel="noreferrer">日本語版Wikipedia</a
				> のデータから、各市区町村の出身者のうち、年間（2020.12.01 - 2021.11.30）で最もアクセス数が多かった人物（ページ）を選択しています。
			</p>
			<p>
				地図データには <a href="https://openstreetmap.jp/" target="_blank" rel="noreferrer"
					>OpenStreetMap</a
				> を利用しています。
			</p>

			<h2>コード</h2>
			<p>
				<a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">SvelteKit</a> と
				<a href="https://maplibre.org/" target="_blank" rel="noreferrer">MapLibre GL JS</a> を使って作成しました。
			</p>
			<p>
				全てのコードとデータは <a
					href="https://github.com/sorami/people-map-japan"
					target="_blank"
					rel="noreferrer">GitHub</a
				> にあります。Enjoy!
			</p>
		</div>
	</div>
</section>

<style>
	.visible {
		visibility: visible !important;
	}

	#top-modal {
		visibility: hidden;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #2228;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #444;
	}

	#modal {
		position: relative;
		border-radius: 0.5em;
		max-width: 27em;
		background: #fff;
		filter: drop-shadow(5px 5px 5px #555);
		padding: 2em;
	}

	#modal h1 {
		margin: 0;
		font-size: 1em;
	}

	#modal h2 {
		color: #34be82;
		margin: 0;
		font-size: 0.9em;
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}
	#modal p {
		margin: 0;
		margin-bottom: 0.5em;
		line-height: 1.5;
		font-size: 0.8em;
	}
	#modal a {
		color: #444;
	}
	#modal a:hover {
		opacity: 0.75;
	}
</style>