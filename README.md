# A People Map of Japan

A Japanese version of [A People Map of the US](https://pudding.cool/2019/05/people-map/); This is not my idea, all credit goes to the awesome team at [The Pudding](https://pudding.cool/)!

- https://github.com/the-pudding/people-map
- https://github.com/the-pudding/people-map-uk

Built with [MapLibre GL JS](https://maplibre.org/) and [SvelteKit](https://kit.svelte.dev/).

See this presentation for details (in Japanese); [MapLibre, Svelte, Wikipediaデータを用いた地理空間情報可視化の事例 / MIERUNE Meetup mini #01 - Speaker Deck](https://speakerdeck.com/sorami/mierune-meetup-mini-number-01)

## Data Sources

- [DBpedia Japanese](https://ja.dbpedia.org/)
  - To retrieve list of pages, and their "from X" information
- [Wikipedia Japanese](https://ja.wikipedia.org/) (via Wikipedia API)
  - To retrive the page views, and the page title and extract text
- MLIT (Ministry of Land, Infrastructure, Transport and Tourism) of Japan
  - To calculate the coordinates of municipalities
  - [国土交通省「位置参照情報」](https://nlftp.mlit.go.jp/index.html) （2021年12月1日取得）をもとに作成
  - => `preparation/data/pref_munic_coords.json`
- [OpenStreetMap Japan](https://openstreetmap.jp/)
  - Vector tiles: https://tile.openstreetmap.jp/
- [Material Icons by Google](https://google.github.io/material-design-icons/)

## Diretories

- `preparation/`
  - Data preparation code
  - `$ poetry install`
  - `$ poetry run jupyter notebook`
  - => All code (notebooks) under `preparation/code/`
- `app/`
  - A SvelteKit app
  - `$ npm install`
  - `$ npm run serve`
  - `$ npm run build`
