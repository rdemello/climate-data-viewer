import { MS } from 'src/stores/masterStore';
import './InfoWindow.scss';
import ChartContainer from '../ChartContainer/ChartContainer';
import { useFetchGraphData } from 'src/hooks/useFetchData';
import { useEffect, useMemo } from 'react';

interface InfoWindowProps {}

const InfoWindow: React.FC<InfoWindowProps> = ({}) => {
    const selectedCoordinates = MS.use.selectedCoordinates();

    return (
        <div className="info-window">
            {selectedCoordinates == null ? (
                <p className="description">Select a location on the map</p>
            ) : (
                <>
                    <ChartContainer
                        name={'Wettest Day'}
                        code={'maxPR'}
                        metric={'PR_maxPR'}
                    />
                    <ChartContainer
                        name={'Wettest 3 Day Period'}
                        code={'3day'}
                        metric={'PR_3day'}
                    />
                    <ChartContainer
                        name={'Annual Rainfall'}
                        code={'yearlySum'}
                        metric={'PR_yearlySum'}
                    />
                    <ChartContainer
                        name={'Drought Risk'}
                        code={'spi'}
                        metric={'PR_spi'}
                    />
                    <ChartContainer
                        name={'Dry days'}
                        code={'dry'}
                        metric={'PR_dry'}
                    />
                </>
            )}
        </div>
    );
};

export default InfoWindow;
