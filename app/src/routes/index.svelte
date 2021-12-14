<script lang="ts">
	import '../app.css';
	import Map from '$lib/map/Map.svelte';
	import Header from '$lib/header/Header.svelte';
</script>

<svelte:head>
	<title>A People Map of Japan | sorami.dev</title>
	<meta name="description" content="地名を出身人物に置き換えた地図" />

	<meta property="og:title" content="A People Map of Japan" />
	<meta property="og:site_name" content="sorami.dev" />
	<meta property="og:url" content="https://sorami.dev/2021/people-map-japan/" />
	<meta property="og:description" content="地名を出身人物に置き換えた地図" />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="ja" />

	<meta property="og:image" content="https://sorami.dev/2021/people-map-japan/img/social-ogp.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://sorami.dev/" />
	<meta name="twitter:creator" content="@sorami" />
	<meta name="twitter:title" content="A People Map of Japan" />
	<meta name="twitter:description" content="地名を出身人物に置き換えた地図" />
	<meta
		name="twitter:image:src"
		content="https://sorami.dev/2021/people-map-japan/img/social-twitter.png"
	/>
</svelte:head>

<Map />
<Header />
