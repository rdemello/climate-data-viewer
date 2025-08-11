import { MS } from 'src/stores/masterStore';
import './InfoWindow.scss';
import ChartContainer from '../ChartContainer/ChartContainer';
import { useFetchGraphData } from 'src/hooks/useFetchData';
import { useEffect, useMemo } from 'react';
import { filterCoords } from 'src/utils/function';
import MetricType from '../MetricType/MetricType';

interface InfoWindowProps {}

const InfoWindow: React.FC<InfoWindowProps> = ({}) => {
    const selectedCoordinates = MS.use.selectedCoordinates();
    const selectedPostcode = MS.use.selectedPostcode();
    const selectedCounty = MS.use.selectedCounty();

    // const precipitationDesc = `The precipitation patterns in the UK generally
    //     demonstrate an intensification. Though not true for
    //     all locations such as mountainous or coastal
    //     regions, we generally see that yearly rainfall across the
    //     country drops however periods of wet weather see
    //     greater precipitation. Although the increases aren't
    //     large, greater rainfall over short periods can lead
    //     to greater risk of flooding.`;

    const precipitationDesc = [
        'Intensification of precipitation',
        'General decrease in total annual rainfall',
        'Increased rainfall in short precipitation events',
        'Likely increase risk of flooding',
    ];

    const waterScarcityDesc = [
        'Increased risk of drought',
        'More days in a year that experience no precipitation',
        'Reduced water availability',
        'Contribute to increase risk of flooding',
    ];

    return selectedCoordinates == null ? (
        <div className="info-window closed"></div>
    ) : (
        <div className="info-window">
            <div className="info-window-header">
                <h2>Selected Location</h2>
                <div className="select-geodata">
                    <div className="label-wrap">
                        <p className="label">Longitude: </p>
                        <p> {filterCoords(selectedCoordinates)[0]}</p>
                    </div>
                    <div className="label-wrap">
                        <p className="label">Latitude: </p>
                        <p> {filterCoords(selectedCoordinates)[1]}</p>
                    </div>
                    <div className="label-wrap">
                        <p className="label">Postcode: </p>
                        <p>{selectedPostcode ? selectedPostcode : 'Unknown'}</p>
                    </div>
                    <div className="label-wrap">
                        <p className="label">County: </p>
                        <p>{selectedCounty ? selectedCounty : 'Unknown'}</p>
                    </div>
                </div>
            </div>

            <MetricType
                title={'Precipitation'}
                description={precipitationDesc}
                charts={[
                    {
                        name: 'Wettest Day',
                        code: 'maxPR',
                        metric: 'PR_maxPR',
                    },
                    {
                        name: 'Wettest 3 Day Period',
                        code: '3day',
                        metric: 'PR_3day',
                    },
                    {
                        name: 'Annual Rainfall',
                        code: 'yearlySum',
                        metric: 'PR_yearlySum',
                    },
                ]}
            />

            <MetricType
                title={'Water Scarcity'}
                description={waterScarcityDesc}
                charts={[
                    {
                        name: 'Drought Risk',
                        code: 'spi',
                        metric: 'PR_spi',
                    },
                    {
                        name: 'Dry days',
                        code: 'dry',
                        metric: 'PR_dry',
                    },
                ]}
            />
        </div>
    );
};

export default InfoWindow;
