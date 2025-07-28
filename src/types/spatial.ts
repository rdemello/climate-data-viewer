type CoordinateType = [number, number];

interface GeoJSONFeature {
    geometry: {
        type: string;
        coordinates: [CoordinateType[]];
    };
    properties: {
        value: number;
        timeband: string;
    };
}

export interface GeoJSONData {
    name: string;
    type: string;
    crs: {
        type: string;
        properties:{
            name: string;
        }
    };
    features: GeoJSONFeature[];
}