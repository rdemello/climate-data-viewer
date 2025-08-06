import { MS } from 'src/stores/masterStore';
import './Sidebar.scss';
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

const Sidebar: React.FC = () => {
    const setSelectedYear = MS.getState().setSelectedYear;
    const selectedMetric = MS.use.metric();
    const setMetric = MS.getState().setMetric;

    const handleMetricOption = (selection: string) => {
        if (selection) {
            setMetric(selection);
        }
    };

    const handleYearOption = (selection: number) => {
        if (selection) {
            setSelectedYear(selection);
        }
    };

    return (
        <div className="map-sidebar">
            <p className="subtitle">Metric</p>
            <p className="description">
                The metrics below have been processed from UKCP18 data available
                from the Met Office. They represent indicators for how
                precipitation and high temperatures are changing in the future.
            </p>
            <p className="metric-subtitle">Precipitation</p>
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
            <p className="subtitle">Year</p>
            <p className="description">
                Use the slider to see the changes across different years up to
                2080.
            </p>
            <br></br>
            <div className="slider-wrap">
                <Slider
                    min={2030}
                    max={2080}
                    defaultValue={2080}
                    step={10}
                    dots={true}
                    marks={{
                        2030: {
                            style: {
                                color: 'white',
                            },
                            label: 2030,
                        },
                        2040: {
                            style: {
                                color: 'white',
                            },
                            label: 2040,
                        },
                        2050: {
                            style: {
                                color: 'white',
                            },
                            label: 2050,
                        },
                        2060: {
                            style: {
                                color: 'white',
                            },
                            label: 2060,
                        },
                        2070: {
                            style: {
                                color: 'white',
                            },
                            label: 2070,
                        },
                        2080: {
                            style: {
                                color: 'white',
                            },
                            label: 2080,
                        },
                    }}
                    onChange={(v) => handleYearOption(v as number)}
                />
            </div>

            <br></br>
            <br></br>
            {/* <p className="subtitle">Value</p>
            <p className="description">
                Visualise either the absolute value of the metric, or the
                changes from a baseline period average from 1980 to 1995.
            </p>
            <div className="pill-container">
                <PillComponent
                    name={'Absolute'}
                    val={'Absolute'}
                    active={selectChange === 'Absolute'}
                    onClick={handleBaselineOption}
                />
                <PillComponent
                    name={'Change from baseline'}
                    val={'Change'}
                    active={selectChange === 'Change'}
                    onClick={handleBaselineOption}
                />
            </div> */}
        </div>
    );
};

export default Sidebar;
