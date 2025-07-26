export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3002';
  }
  return ''; // Let it be relative in production
};

export const fileExtension = (year:number, baseline:string, selectedMetric:string) => {
  if (baseline === 'Absolute') {
    year = year - 1980; // Adjust year for absolute data
    return `PR_Absolute_${selectedMetric}_Clipped_band_${year}`;
  } else {
    year = year - 1995; // Adjust year for change data
    return `PR_Change_${selectedMetric}_Clipped_band_${year}`;
  }
}

interface ColourDomains {
  [key: string]: {
    [key: string]: {
      [key: string]: [number, number];
    };
  };
}

export const colourDomains: ColourDomains = {
  "PR":{
    "Absolute": {
      "YearlySum": [500, 3200] as [number, number],
      "MaxPR": [20, 100] as [number, number],
      "3day": [10, 200] as [number, number],
    },
    "Change": {
      "YearlySum": [-150, 500] as [number, number],
      "MaxPR": [-10, 40] as [number, number],
      "3day": [-20, 70] as [number, number],
    }
  }
}
const alphaVal = 0.8;
interface ColourRange {
  colorRange: Uint8ClampedArray[];
}
export const colourRanges: { [key: string]: ColourRange } = {
  "PR": {
    "colorRange":[
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
    ]
  }
}