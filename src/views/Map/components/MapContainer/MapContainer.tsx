import { DeckGL } from '@deck.gl/react';
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
import {
    checkCoordinates,
    colourDomains,
    colourRanges,
    fileExtension,
} from 'src/utils/function';
import { MjolnirEvent } from 'mjolnir.js';
import Legend from '../Legend/Legend';

import {
    INITIAL_VIEW_STATE,
    lightingEffect,
    MAP_STYLE,
} from './MapDeclarations';

const MapContainer: React.FC = () => {
    const selectedYear = MS.use.selectedYear();
    const baselineChange = MS.use.baselineChange();
    const selectedMetric = MS.use.metric();
    const [selectedHex, setSelectedHex] = useState<[number, number]>([0, 0]);
    const [jsonData, setJsonData] = useState<
        { coordinates: any; value: any }[]
    >([]);
    const [fileName, setFileName] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);;

    const { data, error, isLoading } = useFetchData('map-data', fileName);

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
        coverage: 0.7,
        colorAggregation: 'MAX' as const,
        elevationAggregation: 'MAX' as const,
        colorScaleType: 'linear' as const,
        colorRange: colourRanges.PR['colorRange'],
        colorDomain: colourDomains.PR[baselineChange][selectedMetric],
        highlightColor: [255, 255, 255, 255] as [
            number,
            number,
            number,
            number,
        ],
        autoHighlight: true,
        highlightedObjectIndex: selectedIndex,
        material: {
            ambient: 0.64 as number,
            diffuse: 0.6 as number,
            shininess: 32 as number,
            specularColor: [51, 51, 51] as [number, number, number],
        },
        transitions: {
            elevationScale: 3000,
        },
        // updateTriggers: {
        //     getElevationWeight: [selec],
        // },
    };

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
            const mappedData = data.features.map(
                (feature: any, idx: number) => ({
                    coordinates: feature.geometry.coordinates[0][0],
                    value: feature.properties.value,
                }),
            );
            setJsonData(mappedData);
        }
    }, [data]);

    const layers = [
        new HexagonLayer({
            id: 'Data layer',
            data: jsonData,
            ...commonHexLayerProps,
        }),
    ];

    const getTooltip = useCallback(
        ({ object }: HexagonLayerPickingInfo<object>) => {
            if (object) {
                return {
                    html: `<div> ${object.colorValue?.toFixed(2)} mm/day </div>`,
                    style: {
                        backgroundColor: '#111',
                        fontSize: '1em',
                    },
                };
            }
            return null;
        },
        [],
    );

    const onClick = useCallback(
        (info: any, event: MjolnirEvent) => {
            if (info && info.coordinate) {
                // const closestCoordinate = checkCoordinates(
                //     info.coordinate,
                //     data,
                // );
                // if (!closestCoordinate) return;
                // setSelectedHex(closestCoordinate);
                setSelectedIndex(info.index);
            }
        },
        [data], 
    );

    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={{ touchRotate: true }}
                layers={layers}
                getTooltip={getTooltip}
                onClick={onClick}
                effects={[lightingEffect]}
            >
                <Map reuseMaps mapStyle={MAP_STYLE} />
                <ZoomWidget />
            </DeckGL>
            <Legend
                colourDomains={colourDomains.PR[baselineChange][selectedMetric]}
                colourRange={colourRanges.PR['colorRange']}
            />
        </>
    );
};

export default MapContainer;
