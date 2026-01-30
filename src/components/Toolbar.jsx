import { MousePointer, Square, Circle, Minus, ArrowRight, Pen, Type, Move, Hand } from 'lucide-react';
import './Toolbar.css';

function Toolbar({ activeTool, setActiveTool }) {
    const tools = [
        {
            id: 'select',
            icon: <MousePointer size={20} />,
            label: 'Select',
            title: 'Select Tool (V)',
            desc: 'Select, move, and resize objects. Click to select, drag to move.'
        },
        {
            id: 'move',
            icon: <Move size={20} />,
            label: 'Move',
            title: 'Move Tool (M)',
            desc: 'Move objects freely without resizing them.'
        },
        {
            id: 'hand',
            icon: <Hand size={20} />,
            label: 'Pan',
            title: 'Hand Tool (H)',
            desc: 'Pan around the canvas. Drag to move the view.'
        },
        {
            id: 'rectangle',
            icon: <Square size={20} />,
            label: 'Rect',
            title: 'Rectangle Tool (R)',
            desc: 'Draw rectangles and squares. Drag to create.'
        },
        {
            id: 'circle',
            icon: <Circle size={20} />,
            label: 'Circle',
            title: 'Circle Tool (C)',
            desc: 'Draw circles and ellipses. Drag to create.'
        },
        {
            id: 'line',
            icon: <Minus size={20} />,
            label: 'Line',
            title: 'Line Tool (L)',
            desc: 'Draw straight lines between two points.'
        },
        {
            id: 'arrow',
            icon: <ArrowRight size={20} />,
            label: 'Arrow',
            title: 'Arrow Tool (A)',
            desc: 'Draw lines with directional arrowheads.'
        },
        {
            id: 'pen',
            icon: <Pen size={20} />,
            label: 'Pen',
            title: 'Pen Tool (P)',
            desc: 'Freehand drawing tool. Draw organic shapes.'
        },
        {
            id: 'text',
            icon: <Type size={20} />,
            label: 'Text',
            title: 'Text Tool (T)',
            desc: 'Add text to the canvas. Click to place text.'
        }
    ];

    const copyColor = (color) => {
        navigator.clipboard.writeText(color);
    };

    return (
        <div className="toolbar glass slide-in-left">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                    onClick={() => setActiveTool(tool.id)}
                    data-tooltip-title={tool.title}
                    data-tooltip-desc={tool.desc}
                >
                    {tool.icon}
                    <span className="tool-label">{tool.label}</span>
                </button>
            ))}

            <div className="divider-h"></div>

            <div className="color-swatches">
                {['#000000', '#ffffff', '#f5576c', '#4facfe', '#43e97b', '#f093fb'].map(color => (
                    <div
                        key={color}
                        className="swatch"
                        style={{ background: color }}
                        onClick={() => copyColor(color)}
                        data-tooltip-title={color}
                        data-tooltip-desc="Click to copy Hex code."
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Toolbar;
