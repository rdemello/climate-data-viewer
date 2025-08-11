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
        return `PR_med_${selectedMetric}_${year}.geojson`;
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

export const colourGradient = (
    start: [number, number, number],
    end: [number, number, number],
    steps: number,
    mid?: [number, number, number] | undefined,
): Uint8ClampedArray[] => {
    const gradient: Uint8ClampedArray[] = [];
    if (mid) {
        // Split steps between start-mid and mid-end
        const half = Math.floor(steps / 2);
        for (let i = 0; i < half; i++) {
            const t = half === 1 ? 0 : i / (half - 1);
            const r = Math.round(start[0] + (mid[0] - start[0]) * t);
            const g = Math.round(start[1] + (mid[1] - start[1]) * t);
            const b = Math.round(start[2] + (mid[2] - start[2]) * t);
            gradient.push(new Uint8ClampedArray([r, g, b, 255]));
        }
        for (let i = 1; i < steps - half + 1; i++) {
            const t = (steps - half) === 1 ? 0 : (i - 1) / (steps - half - 1);
            const r = Math.round(mid[0] + (end[0] - mid[0]) * t);
            const g = Math.round(mid[1] + (end[1] - mid[1]) * t);
            const b = Math.round(mid[2] + (end[2] - mid[2]) * t);
            gradient.push(new Uint8ClampedArray([r, g, b, 255]));
        }
        // Remove duplicate mid color if steps is even
        if (steps % 2 === 0 && gradient.length > steps) {
            gradient.splice(half, 1);
        }
        return gradient.slice(0, steps);
    } else {
        for (let i = 0; i < steps; i++) {
            const t = steps === 1 ? 0 : i / (steps - 1);
            const r = Math.round(start[0] + (end[0] - start[0]) * t);
            const g = Math.round(start[1] + (end[1] - start[1]) * t);
            const b = Math.round(start[2] + (end[2] - start[2]) * t);
            gradient.push(new Uint8ClampedArray([r, g, b, 255]));
        }
        return gradient;
    }
};

export const filterCoords = (coords:string): [number, number] => {
    const parts = coords.split("'");
    const filtered = parts.filter(part => part.trim().length > 5).map(Number);
    const [x, y] = filtered;
    return [x, y];
};