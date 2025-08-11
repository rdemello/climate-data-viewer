import Slider from 'node_modules/rc-slider/lib';
import './YearSelection.scss';
import { MS } from 'src/stores/masterStore';
import { metricsDict } from 'src/utils/metricsDict';

const YearSelection: React.FC = () => {
    const setSelectedYear = MS.getState().setSelectedYear;
    const selectedMetric = MS.use.metric();
    const handleYearOption = (selection: number) => {
        if (selection) {
            setSelectedYear(selection);
        }
    };

    const keyColour = metricsDict[selectedMetric].secondaryColor;

    const rgbColour = `rgb(${keyColour[0]}, ${keyColour[1]}, ${keyColour[2]})`;

    return (
        <div className="year-selection">
            <h3>Year</h3>
            <div className="slider-wrap">
                <Slider
                    min={1990}
                    max={2080}
                    defaultValue={2080}
                    step={10}
                    dots={true}
                    marks={{
                        1990: {
                            style: {
                                color: 'white',
                            },
                            label: 1990,
                        },
                        2000: {
                            style: {
                                color: 'white',
                            },
                            label: 2000,
                        },
                        2010: {
                            style: {
                                color: 'white',
                            },
                            label: 2010,
                        },
                        2020: {
                            style: {
                                color: 'white',
                            },
                            label: 2020,
                        },
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
                    styles={{
                        // rail: {
                        //     background: `linear-gradient(to right, blue, red)`,
                        // },
                        track: {
                            background: rgbColour,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default YearSelection;
