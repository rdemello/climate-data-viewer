import './Pill.scss'

interface PillProps {
    name:string;
    active:boolean;
    onClick: (val:string) => void;
    val:string;
}

const PillComponent:React.FC<PillProps> = ({name, active, onClick, val}) => {  
    return (
        <div className={`pill ${active ? 'active' : ''}`} onClick={() => onClick(val)}>
            {name}
        </div>
    );
};

export default PillComponent;