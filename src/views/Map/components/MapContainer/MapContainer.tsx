import { DeckGL } from '@deck.gl/react';
import { MapViewState } from '@deck.gl/core';
import { useCallback, useEffect, useState } from 'react';
import { useFetchData } from 'src/hooks/useFetchData';
import { ZoomWidget } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import { BASEMAP } from '@deck.gl/carto';
import {
    HexagonLayer,
    HexagonLayerPickingInfo,
} from '@deck.gl/aggregation-layers';
import { MS } from 'src/stores/masterStore';
import { colourDomains, colourRanges, fileExtension, getBaseUrl } from 'src/utils/function';
import { MjolnirEvent } from 'mjolnir.js';
import Legend from '../Legend/Legend';

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
    const selectedMetric = MS.use.metric();
    const [jsonData, setJsonData] = useState([]);
    const [fileName, setFileName] = useState<string>('');

    const { data, error, isLoading } = useFetchData('map-data', fileName);

    useEffect(() => {
        const fileExt = fileExtension(
            selectedYear,
            baselineChange,
            selectedMetric,
        );
        setFileName(fileExt);
    }, [selectedYear, baselineChange, selectedMetric, data]);

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


    const commonHexLayerProps = {
        gpuAggregation: true,
        extruded: true,
        getPosition: (d: any) => d.coordinates,
        getColorWeight: (d: any) => d.value,
        getElevationWeight: (d: any) => d.value,
        radius: 5500,
        elevationScale: 5,
        elevationRange: [-5000, 20000] as [number, number],
        pickable: true,
        coverage: 1,
        colorAggregation: 'MAX' as const,
        elevationAggregation: 'MAX' as const,
        colorScaleType: 'linear' as const,
        colorRange: colourRanges.PR["colorRange"],
        colorDomain: colourDomains.PR[baselineChange][selectedMetric],
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
                controller={{touchRotate: true}}
                layers={layers}
                getTooltip={getTooltip}
                onClick={onClick}
            >
                <Map mapStyle={BASEMAP.DARK_MATTER} />
                <ZoomWidget />
            </DeckGL>
            <Legend colourDomains={colourDomains.PR[baselineChange][selectedMetric]} colourRange={colourRanges.PR["colorRange"]} />
        </>
    );
};

export default MapContainer;
