import { DeckGL } from '@deck.gl/react';
import { useCallback, useEffect, useState } from 'react';
import { useFetchData } from 'src/hooks/useFetchData';
import { ZoomWidget } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import {
    HexagonLayer,
} from '@deck.gl/aggregation-layers';
import { MS } from 'src/stores/masterStore';
import {
    calculateColour,
    coordFix,
    fileExtension,
} from 'src/utils/function';
import { MjolnirEvent } from 'mjolnir.js';
import Legend from '../Legend/Legend';

import {
    colourDomains,
    colourRanges,
    elevationScales,
    INITIAL_VIEW_STATE,
    lightingEffect,
    MAP_STYLE,
} from './MapDeclarations';
import InfoWindow from '../InfoWindow/InfoWindow';
import { ColumnLayer } from 'node_modules/@deck.gl/layers/dist';

const MapContainer: React.FC = () => {
    const selectedYear = MS.use.selectedYear();
    const setCoordinates = MS.getState().setSelectedCoordinates;
    const selectedMetric = MS.use.metric();
    const [jsonData, setJsonData] = useState<
        { coordinates: any; value: any }[]
    >([]);
    const [fileName, setFileName] = useState<string>(`PR_MaxPR_100.geojson`);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { data, error, isLoading } = useFetchData('map-data', fileName);
    

    useEffect(() => {
        const fileExt = fileExtension(
            selectedYear,
            'Absolute',
            selectedMetric,
        );
        setFileName(fileExt);
    }, [selectedYear, 'Absolute', selectedMetric, data]);

    useEffect(() => {
        if (!isLoading && data) {
            const mappedData = data.features
                .map((feature: any, idx: number) => {
                    const coords: [number, number][] =
                        feature.geometry.coordinates[0][0];
                    // const avg = coords.reduce(
                    //     (acc, val) => [acc[0] + val[0], acc[1] + val[1]],
                    //     [0, 0]
                    // ).map(sum => sum / coords.length);
                    return feature.properties.value !== null
                        ? {
                              coordinates: coords,
                              value: feature.properties.value,
                          }
                        : null;
                })
                .filter(
                    (item: any): item is { coordinates: any; value: any } =>
                        item !== null,
                );

            setJsonData(mappedData);
        }
    }, [data]);

    const commonHexLayerProps = {
        // gpuAggregation: true,
        extruded: true,
        getPosition: (d: any) => d.coordinates,
        getColorWeight: (d: any) => d.value,
        getElevationWeight: (d: any) => d.value,
        // getElevationValue: (d: any) => d.value,
        getFillColor: (d: any): [number, number, number, number] => 
            calculateColour(
                d.value,
                colourDomains.PR['Absolute'][selectedMetric],
                colourRanges.BlueRed['colorRange'].map(
                    (arr) =>
                        Array.from(arr) as [number, number, number, number],
                ),
            ),
        radius: 3500,
        elevationScale: jsonData && jsonData.length ? 5 : 0,
        elevationRange: [0, 20000] as [number, number],
        pickable: true,
        coverage: 0.7,
        colorAggregation: 'MAX' as const,
        elevationAggregation: 'MAX' as const,
        // colorScaleType: 'linear' as const,
        // colorRange: colourRanges.PR['colorRange'],
        // colorDomain: colourDomains.PR['Absolute'][selectedMetric],
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
            getElevationWeight: 1000,
            getElevationValue: 1000,
            getFillColor: 1000,
        },
    };

    const commonColumnLayerProps = {
        diskResolution: 12 as number,
        extruded: true,
        radius: 2500 as number,
        elevationScale: jsonData && jsonData.length ? 1 : 0,
        elevationRange: [0, 20000] as [number, number],
        getElevation: (d: any) => d.value * elevationScales.PR['Absolute'][selectedMetric],
        getFillColor: (d: any): [number, number, number, number] => 
            calculateColour(
                d.value,
                colourDomains.PR['Absolute'][selectedMetric],
                colourRanges.PR['colorRange'].map(
                    (arr) =>
                        Array.from(arr) as [number, number, number, number],
                ),
            ),

        getPosition: (d: any) => d.coordinates,
        pickable: true,
        coverage: 1,
        filled:true,
        highlightColor: [255, 255, 255, 255] as [
            number,
            number,
            number,
            number,
        ],
        autoHighlight: true,
        highlightedObjectIndex: selectedIndex,
        transitions: {
            // elevationScale: 1000,
            getElevationWeight: 1000,
            getElevationValue: 1000,
            // getFillColor: 1000,
        },
    };

    const layers = [
        new ColumnLayer({
            id: 'Column Data layer',
            visible: true,
            data: jsonData,
            ...commonColumnLayerProps,
        }),
         new HexagonLayer({
            id: 'Hex Data layer',
            visible: false,
            data: jsonData,
            ...commonHexLayerProps,
        }),

    ];

    const getTooltip = useCallback(
        ({ object }: any) => {
            if (object) {
                return {
                    // html: `<div>
                    //     ${Object.entries(object)
                    //         .map(
                    //             ([key, value]) =>
                    //                 `<div><strong>${key}:</strong> ${value}</div>`,
                    //         )
                    //         .join('')}
                    // </div>`,
                    html: `<div> ${object.value?.toFixed(2)} mm/day </div>`,
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
            if (info && info.object.coordinates) {

                console.log(info)
                setSelectedIndex(info.index);
                let coords:string = coordFix(info.object.coordinates);
                setCoordinates(coords);
                console.log(coords)
            }
        },
        [data],
    );

    return (
        <div className="map-container">
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={{ touchRotate: true }}
                layers={layers}
                getTooltip={getTooltip}
                onClick={onClick}
                // effects={[lightingEffect]}
            >
                <Map reuseMaps mapStyle={MAP_STYLE} />
                <ZoomWidget />
            </DeckGL>
            <InfoWindow />
            <Legend
                colourDomains={colourDomains.PR['Absolute'][selectedMetric]}
                colourRange={colourRanges.BlueRed['colorRange']}
            />
        </div>
    );
};

export default MapContainer;
