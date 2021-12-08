const map = new maplibregl.Map({
    container: "map",
    hash: false,
    style: "./style.json",
    center: [139.767144, 35.680621],
    maxBounds: [[110, 20],[157, 50]],
    zoom: 8,
    maxZoom: 13,
    minZoom: 4,
    bearing: 0,
    pitch: 0,
    localIdeographFontFamily: false,
});

map.addControl(new maplibregl.NavigationControl({showCompass: false}), "top-right");
map.addControl(new maplibregl.ScaleControl());
map.addControl(new maplibregl.GeolocateControl());


const locationGroups = ["sm", "md", "lg"];
const circleRadiusDict = {
    "sm": 5,
    "md": 15,
    "lg": 30
};
const labelSizeDict = {
    "na": 0.8,
    "sm": 0.9,
    "md": 1,
    "lg": 1.2
}
const labelMinZoomDict = {
    "na": 9,
    "sm": 6,
    "md": 5,
    "lg": 0 
}

map.on("load", function() {
    // Location without a person
    map.addLayer({
        "id": "people-label-na",
        "type": "symbol",
        "source": "people",
        "filter": ["==", "group", "na"],
        "minzoom": labelMinZoomDict["na"],
        "layout": {
            "text-field": [
                "format",
                ["get", "munic"],
                { "font-scale": labelSizeDict["na"] },
            ],
            "text-font": ["NotoSansCJKjp-Regular"],
            "text-anchor": "center"
        },
        "paint": {
            "text-color": "#fff",
            "text-opacity": [
                "interpolate", ["linear"], ["zoom"],
                9, 0.1,
                12, 0.5
            ]
        }
    }
    );

    locationGroups.forEach(group => {
        // A person, circle
        map.addLayer({
            "id": `people-circle-${group}`,
            "type": "circle",
            "source": "people",
            "filter": ["==", "group", group],
            "paint": {
                "circle-color": "#34BE82",
                "circle-radius": circleRadiusDict[group],
                "circle-opacity": [
                    "interpolate", ["linear"], ["zoom"],
                    4, 0.01,
                    13, 1
                ]
            }
        });

        // A person, label
        map.addLayer({
            "id": `people-label-${group}`,
            "type": "symbol",
            "source": "people",
            "filter": ["==", "group", group],
            "minzoom": labelMinZoomDict[group],
            "layout": {
                "text-field": [
                    "format",
                    ["get", "person"],
                    { "font-scale": labelSizeDict[group] },
                    "\n",
                    {},
                    ["get", "munic"],
                    { "font-scale": labelSizeDict[group] * 0.75 }
                ],
                "text-font": ["NotoSansCJKjp-Regular"],
                "text-offset": [0, -0.25],
                "text-anchor": "top"
            },
            "paint": {
                "text-color": "#efefef",
                "text-halo-blur": 2,
                "text-halo-color": "#152D35",
                "text-halo-width": 1
            }
        });

        map.on("mouseenter", `people-label-${group}`, showPopup);
    });

    map.on("movestart", hidePopup);
    map.on("zoomstart", hidePopup);
});


const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
});

const showPopup = function (e) {
    map.getCanvas().style.cursor = 'pointer';
    const coordinates = e.features[0].geometry.coordinates.slice();
    popup.setLngLat(coordinates);
    const prop = e.features[0].properties;
    const content = `
        <div class="location">${prop.pref}&nbsp;${prop.munic}</div>
        ${addHighlight(prop.desc)}
        <a href=${prop.url} target="_blank">Wikipedia</a>
    `;
    popup.setHTML(content);
    popup.addTo(map);
}

const hidePopup = function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
}

function addHighlight(text) {
    const index = findHighlight(text);
    if (index == -1) { return text; }
    const before = text.substring(0, index);
    const after = text.substring(index, text.length);
    return `<strong>${before}</strong>${after}`;
}

function findHighlight(text) {
    const bracket = text.indexOf("（");
    let particle = text.indexOf("は、");
    if (particle > -1) {
        while ((/\s/.test(text[particle-1])) && (particle > 1)) {
            particle -= 1;
        }
    }
    if ((bracket != -1) && (particle != -1)) {
        return Math.min(bracket, particle);
    } else {
        return Math.max(bracket, particle);
    }
}