import { MS } from 'src/stores/masterStore';
import './InfoWindow.scss';
import ChartContainer from '../ChartContainer/ChartContainer';
import { useFetchGraphData } from 'src/hooks/useFetchData';
import { useEffect } from 'react';

interface InfoWindowProps {}

const InfoWindow: React.FC<InfoWindowProps> = ({}) => {
    const selectedMetric = MS.use.metric();
    const {
        data: medGraphData,
        error: medGraphError,
        isLoading: medGraphLoading,
    } = useFetchGraphData('map-data', 'graph_data_med.json');
    const selectedCoordinates = MS.use.selectedCoordinates();

    useEffect(() => {
        if (!medGraphData || !selectedCoordinates) return;
        console.log(medGraphData[selectedCoordinates]['PR_MaxPR']);
        console.log('Selected Coordinates: ', selectedCoordinates);
        console.log(medGraphData[selectedCoordinates]);
    }, [medGraphData, selectedCoordinates]);
    return (
        <div className="info-window">
            {selectedCoordinates == null && (
                <p className="description">Select a location on the map</p>
            )}
            {medGraphData && selectedCoordinates !== null && (
                <>

                        <ChartContainer
                            name={'Wettest Day'}
                            data={medGraphData[selectedCoordinates]['PR_maxPR']}
                        />

                        <ChartContainer
                            name={'Wettest 3 Day Period'}
                            data={medGraphData[selectedCoordinates]['PR_3day']}
                        />

                        <ChartContainer
                            name={'Annual Rainfall'}
                            data={medGraphData[selectedCoordinates]['PR_yearlySum']}
                        />

                        <ChartContainer
                            name={'Drought Risk'}
                            data={medGraphData[selectedCoordinates]['PR_spi']}
                        />

                        <ChartContainer
                            name={'Dry days'}
                            data={medGraphData[selectedCoordinates]['PR_dry']}
                        />

                </>
            )}
        </div>
    );
};

export default InfoWindow;
