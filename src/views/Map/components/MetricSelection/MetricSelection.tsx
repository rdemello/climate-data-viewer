import { MS } from 'src/stores/masterStore';
import './MetricSelection.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PillComponent from '../Pill/Pill';
import { metricsDict } from 'src/utils/metricsDict';

interface YearOption {
    value: number;
    label: string;
}

interface TypeOption {
    value: string;
    label: string;
}

const MetricSelection: React.FC = () => {
    const setSelectedYear = MS.getState().setSelectedYear;
    const selectedMetric = MS.use.metric();
    const setMetric = MS.getState().setMetric;

    const handleMetricOption = (selection: string) => {
        if (selection) {
            setMetric(selection);
        }
    };

    

    return (
        <div className="metric-selection">
            <h3>Metrics</h3>
            <div className="pill-container">
                <PillComponent
                    name={'Annual Rainfall'}
                    val={'yearlySum'}
                    color={metricsDict['yearlySum'].keyColour}
                    active={selectedMetric === 'yearlySum'}
                    onClick={handleMetricOption}
                />
                <PillComponent
                    name={'Wettest Day'}
                    val={'maxPR'}
                    color={metricsDict['maxPR'].keyColour}
                    active={selectedMetric === 'maxPR'}
                    onClick={handleMetricOption}
                />
                <PillComponent
                    name={'Wettest 3 Day Period'}
                    val={'3day'}
                    color={metricsDict['3day'].keyColour}
                    active={selectedMetric === '3day'}
                    onClick={handleMetricOption}
                />
                <PillComponent
                    name={'Drought Risk (SPI)'}
                    val={'spi'}
                    color={metricsDict['spi'].keyColour}
                    active={selectedMetric === 'spi'}
                    onClick={handleMetricOption}
                />
                <PillComponent
                    name={'Dry Days'}
                    val={'dry'}
                    color={metricsDict['dry'].keyColour}
                    active={selectedMetric === 'dry'}
                    onClick={handleMetricOption}
                />
            </div>
        </div>
    );
};

export default MetricSelection;
