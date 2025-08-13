import { MS } from 'src/stores/masterStore';
import './MetricSelection.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PillComponent from '../Pill/Pill';
import { metricsDict } from 'src/utils/metricsDict';
import Select from 'react-select';

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

    const handleMetricOption = (selection: string | undefined) => {
        if (selection) {
            setMetric(selection);
        }
    };
    const metricOptions = [
        {
            label: 'Precipitation',
            options: [
                {
                    value: 'yearlySum',
                    label: 'Annual Rainfall',
                    color: metricsDict['yearlySum'].keyColour,
                },
                {
                    value: 'maxPR',
                    label: 'Wettest Day',
                    color: metricsDict['maxPR'].keyColour,
                },
                {
                    value: '3day',
                    label: 'Wettest 3 Day Period',
                    color: metricsDict['3day'].keyColour,
                },
            ],
        },
        {
            label: 'Water Scarcity',
            options: [
                {
                    value: 'spi',
                    label: 'Drought Risk (SPI)',
                    color: metricsDict['spi'].keyColour,
                },
                {
                    value: 'dry',
                    label: 'Dry Days',
                    color: metricsDict['dry'].keyColour,
                },
            ],
        },
        {
            label: 'Extreme Heat',
            options: [
                {
                    value: 'cdd',
                    label: 'Cooling Degree Days',
                    color: metricsDict['cdd'].keyColour,
                },
                {
                    value: 'hwfreq',
                    label: 'Heatwave Frequency',
                    color: metricsDict['hwfreq'].keyColour,
                },
                {
                    value: 'hwlen',
                    label: 'Heatwave Length',
                    color: metricsDict['hwlen'].keyColour,
                },
                {
                    value: 'maxT',
                    label: 'Max Temp',
                    color: metricsDict['maxT'].keyColour,
                },
            ],
        },
        {
            label: 'Extreme Cold',
            options: [
                {
                    value: 'hdd',
                    label: 'Heating Degree Days',
                    color: metricsDict['hdd'].keyColour,
                },
                {
                    value: 'cfd',
                    label: 'Consecutive Frost Days',
                    color: metricsDict['cfd'].keyColour,
                },
                {
                    value: 'minT',
                    label: 'Min Temperature',
                    color: metricsDict['minT'].keyColour,
                },
            ],
        },
    ];

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.data.color,
            // backgroundColor:'rgb(70,70,70)'
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: state.data.color,
        }),
        control: (baseStyles:any, state:any) => ({
            ...baseStyles,
            backgroundColor: 'rgb(70,70,70)',
            borderColor:'rgb(30,30,30)',
            color:'#fff'
        }),
    };

    return (
        <div className="metric-selection">
            <h3>Metrics</h3>
            {/* <div className="metrics">
                <div className="pill-container">
                    <h4>Precipitation</h4>
                    <div className="pill-wrap">
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
                    </div>
                </div>
                <div className="pill-container">
                    <h4>Water Scarcity</h4>
                    <div className="pill-wrap">
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
                <div className="pill-container">
                    <h4>Extreme Heat</h4>
                    <div className="pill-wrap">
                    <PillComponent
                        name={'Cooling Degree Days'}
                        val={'cdd'}
                        color={metricsDict['cdd'].keyColour}
                        active={selectedMetric === 'cdd'}
                        onClick={handleMetricOption}
                    />
                    <PillComponent
                        name={'Heatwave Frequency'}
                        val={'hwfreq'}
                        color={metricsDict['hwfreq'].keyColour}
                        active={selectedMetric === 'hwfreq'}
                        onClick={handleMetricOption}
                    />
                    <PillComponent
                        name={'Heatwave Length'}
                        val={'hwlen'}
                        color={metricsDict['hwlen'].keyColour}
                        active={selectedMetric === 'hwlen'}
                        onClick={handleMetricOption}
                    />
                    <PillComponent
                        name={'Max Temp'}
                        val={'maxT'}
                        color={metricsDict['maxT'].keyColour}
                        active={selectedMetric === 'maxT'}
                        onClick={handleMetricOption}
                    />
                    </div>
                </div>
                <div className="pill-container">
                    <h4>Extreme Cold</h4>
                    <div className="pill-wrap">
                        <PillComponent
                            name={'Heating Degree Days'}
                            val={'hdd'}
                            color={metricsDict['hdd'].keyColour}
                            active={selectedMetric === 'hdd'}
                            onClick={handleMetricOption}
                        />
                        <PillComponent
                            name={'Consecutive Frost Days'}
                            val={'cfd'}
                            color={metricsDict['cfd'].keyColour}
                            active={selectedMetric === 'cfd'}
                            onClick={handleMetricOption}
                        />
                        <PillComponent
                            name={'Min Temperature'}
                            val={'minT'}
                            color={metricsDict['minT'].keyColour}
                            active={selectedMetric === 'minT'}
                            onClick={handleMetricOption}
                        />
                    </div>
                </div>
            </div> */}
            <div className="select-wrap">
                <Select
                    options={metricOptions}
                    value={metricOptions
                        .flatMap((group) => group.options)
                        .find((option) => option.value === selectedMetric)}
                    onChange={(option) => handleMetricOption(option?.value)}
                    styles={customStyles}
                    isSearchable={false}
                    placeholder="Select a metric..."
                />
            </div>
        </div>
    );
};

export default MetricSelection;
