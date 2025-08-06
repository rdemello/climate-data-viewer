import './Pill.scss';

interface PillProps {
    name: string;
    active: boolean;
    onClick: (val: string) => void;
    val: string;
    color: [number, number, number]; // Optional color prop
}

const PillComponent: React.FC<PillProps> = ({
    name,
    active,
    onClick,
    val,
    color,
}) => {
    return (
        <div
            className={`pill ${active ? 'active' : ''}`}
            onClick={() => onClick(val)}
            style={active ? { 
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`, 
                borderColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            
            } : undefined}
        >
            {name}
        </div>
    );
};

export default PillComponent;
