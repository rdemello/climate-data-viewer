import { colourGradient } from "./function";

interface MetricsDict {
    [key: string]: {
        fullName: string;
        colourDomain: [number, number];
        elevationScale: number;
        keyColour: [number, number, number];
        secondaryColor: [number, number, number];
        colourRanges: Uint8ClampedArray[];
        graphMainColour: string;
        fadedColour: string;
        description: string;
        units: string;
        rounding:number;
    };
}

const colourProcess = (colour:[number,number,number], alpha:number) => {
    return "rgba(" + colour[0] + ", " + colour[1] + ", " + colour[2] + ", " + alpha + ")";
}

// const Blue = [0, 71, 102] as [number, number, number];
const Blue = [0, 30, 120] as [number, number, number];
const Red = [224, 0, 0] as [number, number, number];
const Orange = [234, 155, 5] as [number, number, number];
// const LightBlue = [150, 220, 254] as [number, number, number];
const LightBlue = [190, 240, 255] as [number, number, number];

const BlueWhite = colourGradient(LightBlue, Blue, 10);
const RedWhite = colourGradient([222, 222, 222], Red, 10, [237, 207, 7]);

export const metricsDict: MetricsDict = {
    "yearlySum":{
        fullName: "Total Annual Precipitation",
        colourDomain: [500, 3200],
        elevationScale: 20,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Total annual precipitation in millimeters.",
        units: "mm",
        rounding: 0,
    },
    "maxPR":{
        fullName: "Ranfall on the Wettest Day",
        colourDomain: [30, 100],
        elevationScale: 300,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Highest precipitation in a single day in millimeters.",
        units: "mm",
        rounding: 2
    },
    "3day":{
        fullName: "Rainfall on the Wettest 3 Day Period",
        colourDomain: [60, 180],
        elevationScale: 300,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Total precipitation over the wettest 3-day period in millimeters.",
        units: "mm",
        rounding: 2
    },
    "spi":{
        fullName: "Drought Risk Index",
        colourDomain: [0, 1.5],
        elevationScale: 20000,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "The number of months that will experience a severe drought (SPI < -2) on at least one day based on the Standard Precipitation Index.",
        units: "months",
        rounding: 2
    },
    "dry":{
        fullName: "Dry Days",
        colourDomain: [90, 220],
        elevationScale: 150,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "Number of dry days (days with less than 0.2mm of precipitation) in a year.",
        units: "days",
        rounding: 0
    }
}
