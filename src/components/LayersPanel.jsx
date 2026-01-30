import { Layers, Eye, EyeOff, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import './LayersPanel.css';

function LayersPanel({ layers, setLayers, canvasRef }) {

    const toggleLayerVisibility = (layerId) => {
        if (!canvasRef?.project) return;

        const item = canvasRef.project.getItem({ id: layerId });
        if (item) {
            item.visible = !item.visible;
            setLayers(layers.map(layer =>
                layer.id === layerId
                    ? { ...layer, visible: !layer.visible }
                    : layer
            ));
        }
    };

    const deleteLayer = (layerId) => {
        if (!canvasRef?.project) return;

        const item = canvasRef.project.getItem({ id: layerId });
        if (item) {
            item.remove();
            setLayers(layers.filter(layer => layer.id !== layerId));
        }
    };

    const moveLayerUp = (index) => {
        if (index === 0 || !canvasRef?.project) return;

        const layerId = layers[index].id;
        const item = canvasRef.project.getItem({ id: layerId });
        if (item) {
            item.insertAbove(canvasRef.project.activeLayer.children[index - 1]);

            const newLayers = [...layers];
            [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
            setLayers(newLayers);
        }
    };

    const moveLayerDown = (index) => {
        if (index === layers.length - 1 || !canvasRef?.project) return;

        const layerId = layers[index].id;
        const item = canvasRef.project.getItem({ id: layerId });
        if (item) {
            item.insertBelow(canvasRef.project.activeLayer.children[index + 1]);

            const newLayers = [...layers];
            [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
            setLayers(newLayers);
        }
    };

    const getLayerIcon = (type) => {
        const icons = {
            rectangle: '▭',
            circle: '●',
            path: '✎',
            text: 'T'
        };
        return icons[type] || '▢';
    };

    return (
        <div className="layers-panel glass slide-in-right">
            <div className="panel-header">
                <Layers size={18} />
                <h3>Layers</h3>
                <span className="layer-count">{layers.length}</span>
            </div>

            {layers.length === 0 ? (
                <div className="empty-state">
                    <Layers size={48} opacity={0.3} />
                    <p>No layers yet. Start drawing to create layers!</p>
                </div>
            ) : (
                <div className="layers-list">
                    {layers.slice().reverse().map((layer, reverseIndex) => {
                        const index = layers.length - 1 - reverseIndex;
                        return (
                            <div
                                key={layer.id}
                                className="layer-item"
                                style={{ animationDelay: `${reverseIndex * 0.05}s` }}
                            >
                                <div className="layer-main">
                                    <span className="layer-icon">{getLayerIcon(layer.type)}</span>
                                    <span className="layer-name">{layer.name}</span>
                                </div>

                                <div className="layer-actions">
                                    <button
                                        className="layer-action-btn tooltip"
                                        data-tooltip="Move Up"
                                        onClick={() => moveLayerUp(index)}
                                        disabled={index === 0}
                                    >
                                        <ArrowUp size={14} />
                                    </button>

                                    <button
                                        className="layer-action-btn tooltip"
                                        data-tooltip="Move Down"
                                        onClick={() => moveLayerDown(index)}
                                        disabled={index === layers.length - 1}
                                    >
                                        <ArrowDown size={14} />
                                    </button>

                                    <button
                                        className="layer-action-btn tooltip"
                                        data-tooltip={layer.visible ? "Hide" : "Show"}
                                        onClick={() => toggleLayerVisibility(layer.id)}
                                    >
                                        {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                                    </button>

                                    <button
                                        className="layer-action-btn delete-btn tooltip"
                                        data-tooltip="Delete"
                                        onClick={() => deleteLayer(layer.id)}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default LayersPanel;
