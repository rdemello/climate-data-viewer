import { MapViewState } from 'node_modules/@deck.gl/core/dist/views/map-view';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { colourDomains, colourRanges } from 'src/utils/function';

export const INITIAL_VIEW_STATE: MapViewState = {
    // longitude: -1.796974,
    // latitude: 52.74128,
    // zoom: 5,
    longitude: -1.415727,
    latitude: 52.232395,
    zoom: 6.6,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40.5,
    bearing: -27,
};

export const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
});

const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-3.807751, 54.104682, 40000],
});

export const lightingEffect = new LightingEffect({
    ambientLight,
    pointLight1,
    pointLight2,
});
