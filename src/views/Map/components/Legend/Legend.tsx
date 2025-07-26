import './Legend.scss';

interface LegendProps {
    colourDomains: [number, number];
    colourRange: Uint8ClampedArray[];
}

const Legend: React.FC<LegendProps> = ({ colourDomains, colourRange }) => {
    return (
        <div className="legend">
            {colourRange.map((color, idx) => {
                const [r, g, b, a = 255] = color;
                const backgroundColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                return (
                    <div className="segment" key={idx}>
                        <div
                            className="color-box"
                            style={{
                                backgroundColor,
                            }}
                        />
                        {idx === 0 && <span className='label'>{colourDomains[0]}</span>}
                        {idx === colourRange.length - 1 && <span className='label'>{colourDomains[1]}</span>}
                    </div>
                );
            })}
        </div>
    );
};

export default Legend;
