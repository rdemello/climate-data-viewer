import { GeoJSONData } from 'src/types/spatial';

export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3002';
    }
    return ''; // Let it be relative in production
};

export const fileExtension = (
    year: number,
    baseline: string,
    selectedMetric: string,
) => {
    if (baseline === 'Absolute') {
        year = year - 1980; // Adjust year for absolute data
        return `PR_${selectedMetric}_${year}.geojson`;
    } else {
        year = year - 1995; // Adjust year for change data
        return `PR_${selectedMetric}_${year}.geojson`;
    }
};

export const checkCoordinates = (
    coordinates: [number, number],
    data: GeoJSONData | undefined,
) => {
    let closestFeature = null;
    let minDistance = Infinity;

    if (!data) return null;

    for (const feature of data.features) {
        const [x, y] = feature.geometry.coordinates[0][0];
        const distance = Math.sqrt(
            Math.pow(x - coordinates[0], 2) + Math.pow(y - coordinates[1], 2),
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestFeature = feature;
        }
    }

    return closestFeature?.geometry.coordinates[0][0] || null;
};

export const calculateColour = (
    val: number,
    range: [number, number],
    domain: [number, number, number, number][],
) => {
    if (val <= range[0]) return domain[0];
    if (val >= range[1]) return domain[domain.length - 1];

    const t = (val - range[0]) / (range[1] - range[0]);
    const scaled = t * (domain.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;

    const start = domain[idx];
    const end = domain[idx + 1];

    // Linear interpolation between start and end RGBA values
    const color = [
        Math.round(start[0] + frac * (end[0] - start[0])),
        Math.round(start[1] + frac * (end[1] - start[1])),
        Math.round(start[2] + frac * (end[2] - start[2])),
        Math.round(start[3] + frac * (end[3] - start[3])),
    ];

    return color as [number, number, number, number];
};

export const coordFix = (coord: number[]) => {
  return "('" + coord[0].toFixed(10) + "', '" + coord[1].toFixed(10) + "')";
};
