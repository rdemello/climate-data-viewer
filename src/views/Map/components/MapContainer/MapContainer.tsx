import { DeckGL } from '@deck.gl/react';
import { MapViewState } from '@deck.gl/core';
import { useCallback, useEffect, useState } from 'react';
import { useFetchData } from 'src/hooks/useFetchData';
import { ZoomWidget } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import { BASEMAP } from '@deck.gl/carto';
import { HexagonLayer, HexagonLayerPickingInfo } from '@deck.gl/aggregation-layers';
import { MS } from 'src/stores/masterStore';
import { fileExtension, getBaseUrl } from 'src/utils/function';
import {MjolnirEvent} from 'mjolnir.js';

const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -1.796974,
    latitude: 52.74128,
    zoom: 5,
};

type DataType = {
    coordinate: [number, number];
    value: number;
};

const MapContainer: React.FC = () => {
    const selectedYear = MS.use.selectedYear();
    const baselineChange = MS.use.baselineChange();
    const [jsonData, setJsonData] = useState([]);
    const [fileName, setFileName] = useState<string>('')

    const { data, error, isLoading } = useFetchData('map-data', fileName);
    
    useEffect(() => {
        const fileExt = fileExtension(selectedYear, baselineChange);
        setFileName(fileExt);
    }, [selectedYear, baselineChange, data]);

    useEffect(() => {
        if (!isLoading && data) {
            console.log(data.features[0]);
            const mappedData = data.features.map((feature: any) => ({
                coordinates: feature.geometry.coordinates[0][0],
                value: feature.properties.value,
            }));
            setJsonData(mappedData);
        }
    }, [data]);

    const alphaVal = 0.8;
    const blueColorRange = [
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
    ];


    const commonHexLayerProps = {
        gpuAggregation: true,
        extruded: true,
        getPosition: (d: any) => d.coordinates,
        getColorWeight: (d: any) => d.value,
        getElevationWeight: (d: any) => d.value,
        radius: 5500,
        elevationScale: 2,
        elevationRange: [-5000, 20000] as [number, number],
        pickable: true,
        coverage: 1,
        colorAggregation: 'MAX' as const,
        elevationAggregation: 'MAX' as const,
        colorScaleType: 'linear' as const,
        colorRange: blueColorRange,
        colorDomain: [500, 3200] as [number, number], // Adjust based on your data range
    };

    const layers = [
        new HexagonLayer({
            id: 'Data layer',
            data: jsonData,
            ...commonHexLayerProps,
        }),
    ];

    const getTooltip = useCallback(({ object }: any) => {
        if (object) {
            return {
                html: `<div> ${object.elevationValue?.toFixed(2)} mm/day </div>`,
                style: {
                    backgroundColor: '#111',
                    fontSize: '1em',
                },
            };
        }
        return null;
    }, []);

    const onClick = useCallback((info: object, event: MjolnirEvent) => {
        console.log('Clicked:', info, event);
    }, []);

    return (
        <>
    
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller
                    layers={layers}
                    getTooltip={getTooltip}
                    onClick={onClick}
                >
                    <Map mapStyle={BASEMAP.DARK_MATTER} />
                    <ZoomWidget />
                </DeckGL>
            
        </>
    );
};

export default MapContainer;
