import MapContainer from "./components/MapContainer/MapContainer";
import Sidebar from "./components/Sidebar/Sidebar";


const MapView:React.FC = () => {
    const content = (
        <>
        <Sidebar />
            <MapContainer />
        </>
    );

    return <>{content}</>;
};

export default MapView;
