import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import './MapView.scss';

const MapView: React.FC = () => {
    const content = (
        <>
            <div className="map-wrap">
                <Sidebar />
                <MapContainer />
            </div>
        </>
    );

    return <>{content}</>;
};

export default MapView;
