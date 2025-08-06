import { useMemo } from 'react';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import './MapView.scss';
import { MS } from 'src/stores/masterStore';
import { useFetchGraphData } from 'src/hooks/useFetchData';
import InfoWindow from './components/InfoWindow/InfoWindow';

const MapView: React.FC = () => {
    const setGraphData = MS.getState().setGraphData;

    const {
        data: graphData,
        error: graphError,
        isLoading: graphLoading,
    } = useFetchGraphData('map-data', 'all_data.json');

    useMemo(() => {
        if (graphData && graphLoading === false) {
            setGraphData(graphData);
        }
        console.log("loading graph data")
    }, [graphData, graphLoading]);

    const content = (
        <>
            <div className="map-wrap">
                <Sidebar />
                <MapContainer />
                <InfoWindow />
            </div>
        </>
    );

    return <>{content}</>;
};

export default MapView;
