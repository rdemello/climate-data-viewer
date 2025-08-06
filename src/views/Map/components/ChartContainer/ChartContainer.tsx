import './ChartContainer.scss';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useMemo } from 'react';
import type { Chart } from 'chart.js';
import { MS } from 'src/stores/masterStore';
import { metricsDict } from 'src/utils/metricsDict';

const plugin = {
    id: 'uniqueid5', //typescript crashes without id
    afterDraw: function (chart: Chart) {
        if (
            chart &&
            chart.config &&
            chart.config.options &&
            chart.config.options.plugins &&
            (chart.config.options.plugins as any).intersectLine
        ) {
            if (
                (chart as any).tooltip._active &&
                (chart as any).tooltip._active.length
            ) {
                const activePoint = (chart as any).tooltip._active[0];
                const ctx = chart.ctx;
                const x = activePoint.element.x;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#fff';
                ctx.stroke();
                ctx.restore();
            }
        }
    },
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    plugin,
);

interface ChartContainerProps {
    name: string;
    metric: string;
    code: string;
}
ChartJS.defaults.borderColor = '#555';
ChartJS.defaults.color = '#fff';

const ChartContainer: React.FC<ChartContainerProps> = ({ name, metric, code }) => {
    const years = ['2030', '2040', '2050', '2060', '2070', '2080'];
    const mainColor = 'rgba(75, 192, 192, 0.8)';
    const fadedColor = 'rgba(75, 192, 192, 0.2)';
    const graphData = MS.use.graphData();
    const selectedCoordinates = MS.use.selectedCoordinates();

    const theseOptions = {
        // intersectLine: true,
        responsive: true,
        elements: {
            point: {
                borderWidth: 0,
                radius: 0,
            },
            line: {
                fill: '-1',
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    };

    const minData = useMemo(() => {
        if (!selectedCoordinates || !graphData) return [];
        return graphData['min'][selectedCoordinates][metric];
    }, [selectedCoordinates, graphData, metric]);

    const maxData = useMemo(() => {
        if (!selectedCoordinates || !graphData) return [];
        return graphData['max'][selectedCoordinates][metric];
    }, [selectedCoordinates, graphData, metric]);

    const medData = useMemo(() => {
        if (!selectedCoordinates || !graphData) return [];
        return graphData['med'][selectedCoordinates][metric];
    }, [selectedCoordinates, graphData, metric]);

    const thisData = useMemo(
        () => ({
            labels: years,
            datasets: [
                {
                    label: 'Max',
                    data: maxData,
                    borderColor: metricsDict[code].fadedColour,
                    backgroundColor: metricsDict[code].fadedColour,
                    borderWidth: 0.5,
                    fill: '+1',
                },
                {
                    label: 'Med',
                    data: medData,
                    borderColor: metricsDict[code].graphMainColour,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 2,
                },
                {
                    label: 'Min',
                    data: minData,
                    borderColor: metricsDict[code].fadedColour,
                    backgroundColor: metricsDict[code].fadedColour,
                    borderWidth: 0.5,
                },
            ],
        }),
        [years, name, maxData, medData, minData, fadedColor, mainColor],
    );

    return (
        <div className="chart-wrap">
            {selectedCoordinates && graphData && (
                <>
                    <h3>{name}</h3>
                    <Line data={thisData} options={theseOptions} />
                </>
            )}
        </div>
    );
};

export default ChartContainer;
