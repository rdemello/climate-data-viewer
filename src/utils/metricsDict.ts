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
        elevationOffset: number;
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
const WhiteBlue = colourGradient(Blue, LightBlue, 10);
export const metricsDict: MetricsDict = {
    "yearlySum":{
        fullName: "Total Annual Precipitation",
        colourDomain: [600, 3200],
        elevationScale: 20,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Total annual precipitation in millimeters.",
        units: "mm",
        rounding: 0,
        elevationOffset: 0
    },
    "maxPR":{
        fullName: "Ranfall on the Wettest Day",
        colourDomain: [35, 100],
        elevationScale: 300,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Highest precipitation in a single day in millimeters.",
        units: "mm",
        rounding: 2,
        elevationOffset: 0
    },
    "3day":{
        fullName: "Rainfall on the Wettest 3 Day Period",
        colourDomain: [60, 170],
        elevationScale: 300,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Total precipitation over the wettest 3-day period in millimeters.",
        units: "mm",
        rounding: 2,
        elevationOffset: 0
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
        rounding: 2,
        elevationOffset: 0
    },
    "dry":{
        fullName: "Dry Days",
        colourDomain: [90, 220],
        elevationScale: 160,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "Number of dry days (days with less than 0.2mm of precipitation) in a year.",
        units: "days",
        rounding: 0,
        elevationOffset: 0
    },
    "cdd":{
        fullName: "Cooling Degree Days",
        colourDomain: [0, 500],
        elevationScale: 150,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "Number of cooling degree days (days with temperatures above 20°C) in a year.",
        units: "days",
        rounding: 0,
        elevationOffset: 0
    },
    "hdd":{
        fullName: "Heating Degree Days",
        colourDomain: [1000, 4500],
        elevationScale: 15,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Number of heating degree days (days with temperatures below 15.5°C) in a year.",
        units: "days",
        rounding: 0,
        elevationOffset: 0
    },
    "hwlen":{
        fullName: "Heatwave Length",
        colourDomain: [0, 30],
        elevationScale: 3000,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "Highest number of consecutive days where maximum temperature exceeds 26.5°C.",
        units: "days",
        rounding: 0,
        elevationOffset: 0
    },
    "hwfreq":{
        fullName: "Heatwave Frequency",
        colourDomain: [0, 5],
        elevationScale: 8000,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "Number of times there are at least 3 consecutive days where maximum temperature exceeds 26.5°C.",
        units: "heatwaves",
        rounding: 0,
        elevationOffset: 0
    },
    "maxT":{
        fullName: "Maximum Temperature",
        colourDomain: [20, 40],
        elevationScale: 1500,
        keyColour: Orange,
        secondaryColor: Orange,
        colourRanges: RedWhite,
        graphMainColour: colourProcess(Orange, 0.8),
        fadedColour: colourProcess(Orange, 0.2),
        description: "The maximum temperature of the year in °C.",
        units: "deg C",
        rounding: 1,
        elevationOffset: 0
    },
    "cfd":{
        fullName: "Consecutive Frost Days",
        colourDomain: [5, 45],
        elevationScale: 1000,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: BlueWhite,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "Number of consecutive days where minimum temperatures fall below 0°C.",
        units: "days",
        rounding: 0,
        elevationOffset: 0
    },
    "minT":{
        fullName: "Minimum Temperature",
        colourDomain: [-20, 0],
        elevationScale: 1500,
        keyColour: Blue,
        secondaryColor: LightBlue,
        colourRanges: WhiteBlue,
        graphMainColour: colourProcess(LightBlue, 0.8),
        fadedColour: colourProcess(LightBlue, 0.2),
        description: "The minimum temperature of the year in °C",
        units: "deg C",
        rounding: 0,
        elevationOffset: 25
    }
}
