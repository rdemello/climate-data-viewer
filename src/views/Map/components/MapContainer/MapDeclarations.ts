import { MapViewState } from 'node_modules/@deck.gl/core/dist/views/map-view';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';

export const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -2.415727,
    latitude: 53.232395,
    zoom: 5.8,
    minZoom: 5,
    maxZoom: 15,
    pitch: 38.5,
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
    intensity: 1,
    position: [-0.144528, 49.739968, 40000],
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

interface ColourDomains {
    [key: string]: {
        [key: string]: {
            [key: string]: [number, number];
        };
    };
}

export const colourDomains: ColourDomains = {
    PR: {
        Absolute: {
            YearlySum: [500, 3200] as [number, number],
            MaxPR: [0, 100] as [number, number],
            '3day': [0, 200] as [number, number],
        },
    },
};

const alphaVal = 1;
interface ColourRange {
    colorRange: Uint8ClampedArray[];
}
export const colourRanges: { [key: string]: ColourRange } = {
    PR: {
        colorRange: [
            new Uint8ClampedArray([173, 216, 230, alphaVal * 255]), // light blue
            new Uint8ClampedArray([160, 210, 235, alphaVal * 255]),
            new Uint8ClampedArray([148, 204, 240, alphaVal * 255]),
            new Uint8ClampedArray([135, 206, 250, alphaVal * 255]), // lighter blue
            new Uint8ClampedArray([120, 190, 235, alphaVal * 255]),
            new Uint8ClampedArray([105, 175, 220, alphaVal * 255]),
            new Uint8ClampedArray([90, 160, 205, alphaVal * 255]),
            new Uint8ClampedArray([70, 130, 180, alphaVal * 255]), // steel blue
            new Uint8ClampedArray([50, 120, 200, alphaVal * 255]),
            new Uint8ClampedArray([40, 132, 220, alphaVal * 255]),
            new Uint8ClampedArray([30, 144, 255, alphaVal * 255]), // dodger blue
            new Uint8ClampedArray([20, 100, 230, alphaVal * 255]),
            new Uint8ClampedArray([10, 60, 215, alphaVal * 255]),
            new Uint8ClampedArray([0, 0, 205, alphaVal * 255]), // medium blue
            new Uint8ClampedArray([0, 0, 180, alphaVal * 255]),
            new Uint8ClampedArray([0, 0, 160, alphaVal * 255]),
            new Uint8ClampedArray([0, 0, 139, alphaVal * 255]), // dark blue
        ],
    },
    BlueRed: {
        colorRange: [
            new Uint8ClampedArray([0, 0, 139, alphaVal * 255]), // dark blue
            new Uint8ClampedArray([30, 30, 160, alphaVal * 255]),
            new Uint8ClampedArray([60, 60, 180, alphaVal * 255]),
            new Uint8ClampedArray([90, 90, 200, alphaVal * 255]),
            new Uint8ClampedArray([120, 120, 220, alphaVal * 255]),
            new Uint8ClampedArray([150, 150, 230, alphaVal * 255]),
            new Uint8ClampedArray([180, 180, 240, alphaVal * 255]),
            new Uint8ClampedArray([210, 210, 250, alphaVal * 255]),
            new Uint8ClampedArray([220, 180, 180, alphaVal * 255]),
            new Uint8ClampedArray([230, 150, 150, alphaVal * 255]),
            new Uint8ClampedArray([240, 120, 120, alphaVal * 255]),
            new Uint8ClampedArray([200, 90, 90, alphaVal * 255]),
            new Uint8ClampedArray([180, 60, 60, alphaVal * 255]),
            new Uint8ClampedArray([160, 30, 30, alphaVal * 255]),
            new Uint8ClampedArray([139, 0, 0, alphaVal * 255]), // dark red
        ],
    },
};