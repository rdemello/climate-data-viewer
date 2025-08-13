import { metricsDict } from 'src/utils/metricsDict';
import './StatsText.scss';

interface StatsTextProps {
    med: number[];
    min: number[];
    max: number[];
    metric: string;
}

const StatsText: React.FC<StatsTextProps> = ({ med, min, max, metric }) => {
    const difference = (med[med.length - 1] / med[0]) * 100 - 100;
    const metricInfo = metricsDict[metric];

    const avgUncertainty =
        med.reduce((acc, val, i) => acc + ((max[i] - min[i]) / val) * 100, 0) /
        med.length;

    return (
        <p className="stats-text">
            {/* The {metricInfo.fullName.toLowerCase()} is forecasted to {' '}
            {difference > 1 ? 'increase' : 'decrease'} by {' '}
            {difference.toFixed(0)}% from {med[0].toFixed(metricInfo.rounding)} {' '}
            {metricInfo.units} to {' '}
            {med[med.length - 1].toFixed(metricInfo.rounding)} {' '}
            {metricInfo.units}. There is an average uncertainty of +/- {' '}
            {avgUncertainty.toFixed(metricInfo.rounding)}% between the different
            climate models. */}
{/* 
            The {metricInfo.fullName.toLowerCase()} is forecasted to {' '}
            {difference > 1 ? 'increase' : 'decrease'} by {' '}
            {difference.toFixed(0)}% with an average uncertainty of +/- {' '}
            {avgUncertainty.toFixed(metricInfo.rounding)}%. */}
        </p>
    );
};

export default StatsText;
