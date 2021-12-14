<script context="module" lang="ts">
	import 'material-design-icons/iconfont/material-icons.css';

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
		<div id="modal-close" on:click={() => close()}>
			<i class="material-icons">cancel</i>
		</div>
		<div id="modal-content">
			<h1>
				A People Map of Japan <small
					>by <a href="https://sorami.dev" target="_blank" rel="noreferrer">sorami.dev</a></small
				>
			</h1>
			<p>「地名」を「出身人物名」に置き換えた地図です。</p>
			<p>円の大きさはWikipediaページのアクセス数を表しています。</p>
			<h2>Inspired by The Pudding</h2>
			<p>
				これは<a href="https://pudding.cool/" target="_blank" rel="noreferrer">The Pudding</a
				>による<a href="https://pudding.cool/2019/05/people-map/" target="_blank" rel="noreferrer"
					>US版</a
				>、<a href="https://pudding.cool/2019/06/people-map-uk/" target="_blank" rel="noreferrer"
					>UK版</a
				>をもとに、彼らの了承を得て独自に作成した日本版です。元のアイデアはThe
				Puddingによるものです。
			</p>
			<p>
				A Japanese version of The Pudding's <a
					href="https://pudding.cool/2019/05/people-map/"
					target="_blank"
					rel="noreferrer">A People Map of the US</a
				>
				/
				<a href="https://pudding.cool/2019/06/people-map-uk/" target="_blank" rel="noreferrer">UK</a
				>. This is not my original idea, all credit goes to the awesome team at
				<a href="https://pudding.cool/" target="_blank" rel="noreferrer">The Pudding</a>!
			</p>

			<h2>Data & Code</h2>
			<p>
				<a
					href="https://ja.wikipedia.org/wiki/%E5%87%BA%E8%BA%AB%E5%88%A5%E3%81%AE%E4%BA%BA%E5%90%8D%E8%A8%98%E4%BA%8B%E4%B8%80%E8%A6%A7%E3%81%AE%E4%B8%80%E8%A6%A7#%E6%97%A5%E6%9C%AC%E3%81%AE%E5%9C%B0%E5%9F%9F%EF%BC%88%E9%83%BD%E9%81%93%E5%BA%9C%E7%9C%8C%E3%80%81%E5%B8%82%E7%94%BA%E6%9D%91%EF%BC%89"
					target="_blank"
					rel="noreferrer">日本語版Wikipedia</a
				>のデータから、各市区町村の出身者のうち、年間（2020年12月-2021年11月）で最もアクセス数の多かった人物（ページ）を選択しています。
			</p>
			<p>
				背景地図には<a href="https://openstreetmap.jp/" target="_blank" rel="noreferrer"
					>OpenStreetMap Japan</a
				>の提供するベクトルタイルを利用しています。各市区町村の緯度経度を算出するためには<a
					href="https://nlftp.mlit.go.jp/index.html"
					target="_blank"
					rel="noreferrer">国土交通省「位置参照情報」</a
				>データを用いました。
			</p>

			<p>
				実装には<a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">SvelteKit</a>と<a
					href="https://maplibre.org/"
					target="_blank"
					rel="noreferrer">MapLibre GL JS</a
				>を使いました。
			</p>
			<p>
				全てのデータとコードは<a
					href="https://github.com/sorami/people-map-japan"
					target="_blank"
					rel="noreferrer">GitHub</a
				>で公開しています。詳細はそちらをご覧ください。
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
		background: rgba(33, 33, 33, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #eee;
	}

	#modal {
		position: relative;
		border-radius: 0.5em;
		max-width: 22em;
		margin: 0 1em;
		background: #444;
		filter: drop-shadow(10px 10px 10px #1118);
		padding: 2em;
	}

	#modal-close {
		position: absolute;
		top: -0.5em;
		right: -0.5em;
		color: #eee;
		opacity: 0.75;
	}
	#modal-close:hover {
		cursor: pointer;
	}

	#modal-content {
		max-width: calc(100vw - 20px);
		max-height: calc(100vh - 20px);
		overflow: auto;
	}
	#modal-content h1,
	h2 {
		margin: 0;
	}
	#modal-content h1 {
		text-align: center;
		font-size: 1em;
		margin-bottom: 1em;
		color: #34be82;
	}
	#modal-content h1 small {
		color: #aaa;
		font-size: 0.8em;
		margin-left: 0.25em;
	}
	#modal-content h1 small a {
		color: #aaa;
	}
	#modal-content h2 {
		font-size: 0.9em;
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}

	#modal-content p {
		margin: 0;
		margin-bottom: 0.5em;
		line-height: 1.5;
		font-size: 0.8em;
	}
	#modal-content a {
		color: #eee;
	}
	#modal-content a:hover {
		color: #34be82;
		text-decoration: none;
	}
</style>
