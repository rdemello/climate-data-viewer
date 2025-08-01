import { MS } from 'src/stores/masterStore';
import './InfoWindow.scss';
import ChartContainer from '../ChartContainer/ChartContainer';
import { useFetchGraphData } from 'src/hooks/useFetchData';
import { useEffect } from 'react';

interface InfoWindowProps {}

const InfoWindow: React.FC<InfoWindowProps> = ({}) => {
    const selectedMetric = MS.use.metric();
    const {
        data: graphData,
        error: graphError,
        isLoading: graphLoading,
    } = useFetchGraphData('map-data', 'graph_data.json');
    const selectedCoordinates = MS.use.selectedCoordinates();

    useEffect(() => {
        if (!graphData || !selectedCoordinates) return;
        console.log(graphData[selectedCoordinates]['PR_MaxPR']);
        console.log('Selected Coordinates: ', selectedCoordinates);
        console.log(graphData[selectedCoordinates]);
    }, [graphData, selectedCoordinates]);
    return (
        <div className="info-window">
            {selectedCoordinates == null && (
                <p className="description">Select a location on the map</p>
            )}
            {graphData && selectedCoordinates !== null && (
                <>

                        <ChartContainer
                            name={'Wettest Day'}
                            data={graphData[selectedCoordinates]['PR_MaxPR']}
                        />

                        <ChartContainer
                            name={'Wettest 3 Day Period'}
                            data={graphData[selectedCoordinates]['PR_3day']}
                        />

                        <ChartContainer
                            name={'Annual Rainfall'}
                            data={graphData[selectedCoordinates]['PR_YearlySum']}
                        />

                </>
            )}
        </div>
    );
};

export default InfoWindow;
