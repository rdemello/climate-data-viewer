import ChartContainer from "../ChartContainer/ChartContainer";
import './MetricType.scss';
import {useState} from "react";

interface MetricTypeProps {
    title: string;
    description: string[];
    charts: ChartDataProps[];
}

interface ChartDataProps {
    name: string;
    code: string;
    metric: string;
}

const MetricType: React.FC<MetricTypeProps> = ({ title, description, charts }) => {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="metric-type-wrap">
            <h3>{title}</h3>
            <button className='toggle' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'}</button>
            {isOpen && (
                <ul className="metric-type-description">
                    {description.map((item, index) => (
                        <li className="description-item" key={index}>{item}</li>
                    ))}
                </ul>
            )}
            {isOpen && charts.map((chart) => (
                <ChartContainer
                    key={chart.code}
                    name={chart.name}
                    code={chart.code}
                    metric={chart.metric}
                />
            ))}
        </div>
    );
}

export default MetricType;