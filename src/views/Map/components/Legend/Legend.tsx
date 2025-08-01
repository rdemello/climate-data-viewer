import './Legend.scss';

interface LegendProps {
    colourDomains: [number, number];
    colourRange: Uint8ClampedArray[];
}

const Legend: React.FC<LegendProps> = ({ colourDomains, colourRange }) => {
    return (
        <div className="legend">
            {[...colourRange].reverse().map((color, idx) => {
                const [r, g, b, a = 255] = color;
                const backgroundColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                const reversedIdx = colourRange.length - 1 - idx;
                return (
                    <div className="segment" key={reversedIdx}>
                        <div
                            className="color-box"
                            style={{
                                backgroundColor,
                            }}
                        />
                        {reversedIdx === 0 && (
                            <span className="label">{colourDomains[0]}</span>
                        )}
                        {reversedIdx === colourRange.length - 1 && (
                            <span className="label">{colourDomains[1]}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Legend;
