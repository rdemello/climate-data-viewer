import { MapViewState } from 'node_modules/@deck.gl/core/dist/views/map-view';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { colourGradient } from 'src/utils/function';

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

// interface ColourDomains {
//     [key: string]: {
//         [key: string]: {
//             [key: string]: [number, number];
//         };
//     };
// }

// export const colourDomains: ColourDomains = {
//     PR: {
//         Absolute: {
//             yearlySum: [500, 3200] as [number, number],
//             maxPR: [30, 100] as [number, number],
//             '3day': [50, 200] as [number, number],
//             spi: [0, 1.5] as [number, number],
//             dry: [90, 220] as [number, number],
//         },
//     },
// };

// interface ElevationScales {
//     [key: string]: {
//         [key: string]: {
//             [key: string]: number;
//         };
//     };
// }

// export const elevationScales: ElevationScales = {
//     PR: {
//         Absolute: {
//             yearlySum: 20,
//             maxPR: 300,
//             '3day': 300,
//             spi: 15000,
//             dry: 150,
//         },
//     },
// };

// const BlueWhite = colourGradient([220, 231, 254], [0, 47, 97], 10);
// const OrangeWhite = colourGradient([222, 222, 222], [224, 0, 0], 10, [237, 207, 7]);

// export const keyColours: { [key: string]: [number, number, number] } = {
//     PR: [0, 47, 97], // dark blue
//     '3day': [0, 47, 97], // dark blue
//     yearlySum: [0, 47, 97], // dark blue
//     maxPR: [0, 47, 97], // dark blue
//     spi: [224, 0, 0], // red
//     dry: [224, 0, 0], // red
// }

// export const colourRanges: { [key: string]: Uint8ClampedArray[] } = {
//     PR: [
//         new Uint8ClampedArray([173, 216, 230, 255]), // light blue
//         new Uint8ClampedArray([160, 210, 235, 255]),
//         new Uint8ClampedArray([148, 204, 240, 255]),
//         new Uint8ClampedArray([135, 206, 250, 255]), // lighter blue
//         new Uint8ClampedArray([120, 190, 235, 255]),
//         new Uint8ClampedArray([105, 175, 220, 255]),
//         new Uint8ClampedArray([90, 160, 205, 255]),
//         new Uint8ClampedArray([70, 130, 180, 255]), // steel blue
//         new Uint8ClampedArray([50, 120, 200, 255]),
//         new Uint8ClampedArray([40, 132, 220, 255]),
//         new Uint8ClampedArray([30, 144, 255, 255]), // dodger blue
//         new Uint8ClampedArray([20, 100, 230, 255]),
//         new Uint8ClampedArray([10, 60, 215, 255]),
//         new Uint8ClampedArray([0, 0, 205, 255]), // medium blue
//         new Uint8ClampedArray([0, 0, 180, 255]),
//         new Uint8ClampedArray([0, 0, 160, 255]),
//     ],
//     "3day": BlueWhite,
//     "yearlySum": BlueWhite,
//     "maxPR": BlueWhite,
//     "spi": OrangeWhite,
//     "dry": OrangeWhite,
// };

