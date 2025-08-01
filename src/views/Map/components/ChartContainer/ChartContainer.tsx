import './ChartContainer.scss';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartContainerProps {
    data: number[];
    name: string;
}
ChartJS.defaults.borderColor = '#555';
ChartJS.defaults.color = '#fff';

const ChartContainer: React.FC<ChartContainerProps> = ({ data, name }) => {
    const years = [
        '2030',
        '2040',
        '2050',
        '2060',
        '2070',
        '2080',
    ]
    return (
        <div className="chart-wrap">
            <h3>{name}</h3>
            <Line
                data={{
                    labels: years,
                    datasets: [
                        {
                            label: name,
                            data: data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 2,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display:false
                        },
                        title: {
                            display: false
                        },
                    },
                    interaction:{
                        intersect: false,
                        mode: 'index',
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
                }}
            />
        </div>
    );
};

export default ChartContainer;
