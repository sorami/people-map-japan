<script lang="ts">
    import { flyTo } from "$lib/map/Map.svelte";

    function flyToOrigin() {
        flyTo([139.767144, 35.680621], 5);
    }
</script>

<header>
    <h1 on:click={flyToOrigin}>A People Map of Japan</h1>
    <p><a href="https://sorami.dev/" target="_blank" rel="noreferrer">sorami.dev</a></p>
</header>

<style>
    header {
        z-index: 1;
        position: absolute;
        width: 100%;
        margin: 0;
        padding: 0.25em 0;
        box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.5);
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        color: #34be82;
        font-size: 1em;
        font-weight: bold;
        padding: 0;
        margin: 0;
        opacity: 0.8;
    }
    h1:hover {
        cursor: pointer;
    }

    p {
        position: absolute;
        right: 0;
        margin: 0;
        padding: 0;
        margin-right: 1.5em;
        font-size: 0.75em;
        font-weight: 700;
    }
    p a {
        color: #fff;
        opacity: 0.4;
        text-decoration: none;
    }
    p a:hover {
        text-decoration: underline;
        opacity: 0.75;
    }
</style>