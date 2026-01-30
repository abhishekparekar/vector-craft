import { Palette, Sliders, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import './PropertiesPanel.css';

function PropertiesPanel({ selectedObject, canvasRef }) {
    const [fill, setFill] = useState('#000000');
    const [stroke, setStroke] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [opacity, setOpacity] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    useEffect(() => {
        if (selectedObject) {
            if (selectedObject.fillColor) {
                setFill(selectedObject.fillColor.toCSS(true));
            } else {
                setFill('#ffffff');
            }

            if (selectedObject.strokeColor) {
                setStroke(selectedObject.strokeColor.toCSS(true));
            } else {
                setStroke('#000000');
            }

            setStrokeWidth(selectedObject.strokeWidth || 0);
            setOpacity(selectedObject.opacity !== undefined ? selectedObject.opacity : 1);
            setRotation(selectedObject.rotation || 0);
            setScaleX(1);
            setScaleY(1);
        }
    }, [selectedObject]);

    const updateProperty = (prop, value) => {
        if (!selectedObject) return;

        switch (prop) {
            case 'fillColor': selectedObject.fillColor = value; setFill(value); break;
            case 'strokeColor': selectedObject.strokeColor = value; setStroke(value); break;
            case 'strokeWidth': selectedObject.strokeWidth = parseFloat(value); setStrokeWidth(value); break;
            case 'opacity': selectedObject.opacity = parseFloat(value); setOpacity(value); break;
            case 'rotation':
                const delta = parseFloat(value) - rotation;
                selectedObject.rotate(delta);
                setRotation(parseFloat(value));
                break;
            case 'scaleX':
                const sx = parseFloat(value);
                if (sx > 0) {
                    const factor = sx / scaleX;
                    selectedObject.scale(factor, 1);
                    setScaleX(sx);
                }
                break;
            case 'scaleY':
                const sy = parseFloat(value);
                if (sy > 0) {
                    const factor = sy / scaleY;
                    selectedObject.scale(1, factor);
                    setScaleY(sy);
                }
                break;
        }
    };

    const handleDelete = () => { if (canvasRef?.deleteSelected) canvasRef.deleteSelected(); };
    const handleBringToFront = () => { if (canvasRef?.bringToFront) canvasRef.bringToFront(); };
    const handleSendToBack = () => { if (canvasRef?.sendToBack) canvasRef.sendToBack(); };


    if (!selectedObject) {
        return (
            <div className="properties-panel glass slide-in-right">
                <div className="panel-header">
                    <Sliders size={18} />
                    <h3>Properties</h3>
                </div>
                <div className="empty-state">
                    <Palette size={48} opacity={0.3} />
                    <p>Select an object to edit properties</p>
                </div>
            </div>
        );
    }

    return (
        <div className="properties-panel glass slide-in-right">
            <div className="panel-header">
                <Sliders size={18} />
                <h3>Properties</h3>
            </div>

            <div className="properties-content">
                <div className="selected-item-info">
                    <div style={{ width: 30, height: 30, background: fill, border: `2px solid ${stroke}`, borderRadius: 4 }}></div>
                    <span>{selectedObject.name || 'Selected Object'}</span>
                </div>

                <div className="divider"></div>

                {/* Fill Color */}
                <div className="property-group">
                    <label
                        className="property-label"
                        data-tooltip-title="Fill Color"
                        data-tooltip-desc="The interior color of the shape. Use transparent for no fill."
                    >
                        Fill Color
                    </label>
                    <div className="color-input-group">
                        <input
                            type="color"
                            value={fill}
                            onChange={(e) => updateProperty('fillColor', e.target.value)}
                            className="color-picker"
                        />
                        <input
                            type="text"
                            value={fill}
                            onChange={(e) => updateProperty('fillColor', e.target.value)}
                            className="color-text"
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Stroke Color */}
                <div className="property-group">
                    <label
                        className="property-label"
                        data-tooltip-title="Stroke Color"
                        data-tooltip-desc="The color of the shape's outline or border."
                    >
                        Stroke Color
                    </label>
                    <div className="color-input-group">
                        <input
                            type="color"
                            value={stroke}
                            onChange={(e) => updateProperty('strokeColor', e.target.value)}
                            className="color-picker"
                        />
                        <input
                            type="text"
                            value={stroke}
                            onChange={(e) => updateProperty('strokeColor', e.target.value)}
                            className="color-text"
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Stroke Width */}
                <div className="property-group">
                    <div className="flex-between">
                        <label
                            className="property-label"
                            data-tooltip-title="Stroke Width"
                            data-tooltip-desc="Thickness of the outline in pixels."
                        >
                            Stroke Width
                        </label>
                        <span className="value-badge">{strokeWidth}px</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={strokeWidth}
                        onChange={(e) => updateProperty('strokeWidth', e.target.value)}
                        className="range-slider"
                    />
                </div>

                {/* Opacity */}
                <div className="property-group">
                    <div className="flex-between">
                        <label
                            className="property-label"
                            data-tooltip-title="Opacity"
                            data-tooltip-desc="Transparency level. 100% is solid, 0% is invisible."
                        >
                            Opacity
                        </label>
                        <span className="value-badge">{Math.round(opacity * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={opacity}
                        onChange={(e) => updateProperty('opacity', e.target.value)}
                        className="range-slider"
                    />
                </div>

                <div className="divider"></div>

                {/* Transforms */}
                <div className="property-group">
                    <div className="flex-between">
                        <label className="property-label">Rotation</label>
                        <span className="value-badge">{Math.round(rotation)}°</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={(e) => updateProperty('rotation', e.target.value)}
                        className="range-slider"
                    />
                </div>

                <div className="property-row">
                    <div className="property-group half">
                        <label className="property-label">Scale X</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={scaleX}
                            onChange={(e) => updateProperty('scaleX', e.target.value)}
                            className="number-input"
                        />
                    </div>
                    <div className="property-group half">
                        <label className="property-label">Scale Y</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={scaleY}
                            onChange={(e) => updateProperty('scaleY', e.target.value)}
                            className="number-input"
                        />
                    </div>
                </div>

                <div className="divider"></div>

                {/* Actions */}
                <div className="action-grid">
                    <button
                        className="btn-icon-action"
                        onClick={handleBringToFront}
                        data-tooltip-title="Bring to Front"
                        data-tooltip-desc="Move selected object to the very top layer."
                    >
                        <ArrowUp size={18} />
                    </button>
                    <button
                        className="btn-icon-action"
                        onClick={handleSendToBack}
                        data-tooltip-title="Send to Back"
                        data-tooltip-desc="Move selected object behind all other objects."
                    >
                        <ArrowDown size={18} />
                    </button>
                    <button
                        className="btn-icon-action danger"
                        onClick={handleDelete}
                        data-tooltip-title="Delete"
                        data-tooltip-desc="Permanently remove the selected object."
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PropertiesPanel;
