import { useEffect, useRef, useCallback } from 'react';
import paper from 'paper';
import './Canvas.css';

function Canvas({ activeTool, setSelectedObject, setLayers, setCanvasRef, gridEnabled, zoom, setZoom }) {
    const canvasRef = useRef(null);
    const toolRef = useRef(null);
    const historyRef = useRef([]);
    const historyStepRef = useRef(-1);

    // Helper: Save state for Undo/Redo
    const saveHistory = useCallback(() => {
        if (!paper.project) return;
        const json = paper.project.exportJSON();

        if (historyStepRef.current < historyRef.current.length - 1) {
            historyRef.current = historyRef.current.slice(0, historyStepRef.current + 1);
        }

        historyRef.current.push(json);
        historyStepRef.current++;
        updateLayers(setLayers);
    }, [setLayers]);

    // Initialize Canvas
    useEffect(() => {
        if (!canvasRef.current) return;

        paper.setup(canvasRef.current);
        saveHistory(); // Initial state

        const grid = createGrid();
        grid.visible = gridEnabled;

        // Expose API
        setCanvasRef({
            paper,
            undo: () => {
                if (historyStepRef.current > 0) {
                    historyStepRef.current--;
                    paper.project.clear();
                    paper.project.importJSON(historyRef.current[historyStepRef.current]);
                    updateLayers(setLayers);
                    setSelectedObject(null);
                }
            },
            redo: () => {
                if (historyStepRef.current < historyRef.current.length - 1) {
                    historyStepRef.current++;
                    paper.project.clear();
                    paper.project.importJSON(historyRef.current[historyStepRef.current]);
                    updateLayers(setLayers);
                    setSelectedObject(null);
                }
            },
            deleteSelected: () => {
                const selected = paper.project.selectedItems;
                if (selected.length > 0) {
                    selected.forEach(item => item.remove());
                    setSelectedObject(null);
                    saveHistory();
                    updateLayers(setLayers);
                }
            },
            bringToFront: () => {
                const selected = paper.project.selectedItems;
                selected.forEach(item => item.bringToFront());
                saveHistory();
                updateLayers(setLayers);
            },
            sendToBack: () => {
                const selected = paper.project.selectedItems;
                selected.forEach(item => item.sendToBack());
                const grid = paper.project.getItem({ name: 'grid' });
                if (grid) grid.sendToBack();
                saveHistory();
                updateLayers(setLayers);
            }
        });

        // Global Key Handlers
        const handleKeyDown = (e) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && !isInputActive()) {
                const selected = paper.project.selectedItems;
                if (selected.length > 0) {
                    selected.forEach(item => item.remove());
                    setSelectedObject(null);
                    saveHistory();
                    updateLayers(setLayers);
                }
            }
        };

        paper.view.onDoubleClick = (event) => {
            const hitResult = paper.project.hitTest(event.point, {
                fill: true, stroke: true, tolerance: 5
            });

            if (hitResult && hitResult.item) {
                const item = hitResult.item;
                if (item.className === 'PointText') {
                    const newText = prompt("Edit Text:", item.content);
                    if (newText !== null) {
                        item.content = newText;
                        saveHistory();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            paper.project?.clear();
        };
    }, []);

    useEffect(() => {
        if (!paper.project) return;
        const grid = paper.project.getItem({ name: 'grid' });
        if (grid) grid.visible = gridEnabled;
    }, [gridEnabled]);

    useEffect(() => {
        if (paper.view) paper.view.zoom = zoom;
    }, [zoom]);

    useEffect(() => {
        if (!paper.project) return;
        if (toolRef.current) toolRef.current.remove();

        const tool = new paper.Tool();
        toolRef.current = tool;

        switch (activeTool) {
            case 'select': setupSelectTool(tool, setSelectedObject); break;
            case 'rectangle': setupRectangleTool(tool, setLayers, saveHistory); break;
            case 'circle': setupCircleTool(tool, setLayers, saveHistory); break;
            case 'line': setupLineTool(tool, setLayers, saveHistory); break;
            case 'arrow': setupArrowTool(tool, setLayers, saveHistory); break;
            case 'pen': setupPenTool(tool, setLayers, saveHistory); break;
            case 'text': setupTextTool(tool, setLayers, saveHistory); break;
            case 'move': setupMoveTool(tool, setSelectedObject, saveHistory); break;
            case 'hand': setupHandTool(tool); break;
        }

        tool.activate();
    }, [activeTool, saveHistory]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="main-canvas" resize="true" data-paper-resize="true"></canvas>
            <div className="canvas-overlay">
                <div className="canvas-info glass">
                    <span>Tool: <strong>{activeTool}</strong></span>
                    <span>Zoom: <strong>{Math.round(zoom * 100)}%</strong></span>
                </div>
            </div>
        </div>
    );
}

function isInputActive() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

function createGrid() {
    const grid = new paper.Group();
    grid.name = 'grid';
    grid.locked = true;
    const startX = -5000, endX = 5000, startY = -5000, endY = 5000, gridSize = 20;

    for (let x = startX; x <= endX; x += gridSize) {
        grid.addChild(new paper.Path.Line({
            from: [x, startY], to: [x, endY], strokeColor: new paper.Color(1, 1, 1, 0.05), strokeWidth: 1
        }));
    }
    for (let y = startY; y <= endY; y += gridSize) {
        grid.addChild(new paper.Path.Line({
            from: [startX, y], to: [endX, y], strokeColor: new paper.Color(1, 1, 1, 0.05), strokeWidth: 1
        }));
    }
    grid.sendToBack();
    return grid;
}

function updateLayers(setLayers) {
    if (!paper.project) return;
    const items = paper.project.activeLayer.children
        .filter(item => item.name !== 'grid')
        .map((item, index) => ({
            id: item.id,
            name: item.name || `Shape ${index}`,
            type: item.className,
            visible: item.visible
        })).reverse();
    setLayers(items);
}

function setupSelectTool(tool, setSelectedObject) {
    let hitItem = null;
    tool.onMouseDown = (event) => {
        const hitResult = paper.project.hitTest(event.point, { fill: true, stroke: true, segments: true, tolerance: 5 });
        paper.project.deselectAll();
        if (hitResult && hitResult.item.name !== 'grid') {
            hitItem = hitResult.item;
            if (hitItem.parent && hitItem.parent.name === 'Arrow') hitItem = hitItem.parent;
            hitItem.selected = true;
            setSelectedObject(hitItem);
        } else {
            setSelectedObject(null);
            hitItem = null;
        }
    };
    tool.onMouseDrag = (event) => {
        if (hitItem) hitItem.position = hitItem.position.add(event.delta);
    };
}

function setupMoveTool(tool, setSelectedObject, saveHistory) {
    let hitItem = null;
    tool.onMouseDown = (event) => {
        const hitResult = paper.project.hitTest(event.point, { fill: true, stroke: true, tolerance: 5 });
        if (hitResult && hitResult.item.name !== 'grid') {
            hitItem = hitResult.item;
            while (hitItem.parent && hitItem.parent.className === 'Group' && hitItem.parent.name !== 'grid') hitItem = hitItem.parent;
            paper.project.deselectAll();
            hitItem.selected = true;
            setSelectedObject(hitItem);
        }
    };
    tool.onMouseDrag = (event) => { if (hitItem) hitItem.position = hitItem.position.add(event.delta); };
    tool.onMouseUp = () => { if (hitItem) saveHistory(); };
}

function setupHandTool(tool) {
    tool.onMouseDrag = (event) => paper.view.center = paper.view.center.subtract(event.delta.divide(paper.view.zoom));
}

function setupRectangleTool(tool, setLayers, saveHistory) {
    let path;
    tool.onMouseDown = (event) => {
        if (path) path.selected = false;
        path = new paper.Path.Rectangle({
            from: event.point, to: event.point, fillColor: '#667eea', strokeColor: '#764ba2', strokeWidth: 2, name: 'Rectangle'
        });
    };
    tool.onMouseDrag = (event) => {
        if (path) {
            path.remove();
            path = new paper.Path.Rectangle({
                from: event.downPoint, to: event.point, fillColor: '#667eea', strokeColor: '#764ba2', strokeWidth: 2, name: 'Rectangle'
            });
        }
    };
    tool.onMouseUp = () => { updateLayers(setLayers); saveHistory(); };
}

function setupCircleTool(tool, setLayers, saveHistory) {
    let path;
    tool.onMouseDown = (event) => {
        path = new paper.Path.Circle({ center: event.point, radius: 0, fillColor: '#f5576c', strokeColor: '#f093fb', strokeWidth: 2, name: 'Circle' });
    };
    tool.onMouseDrag = (event) => {
        if (path) {
            const radius = event.point.subtract(event.downPoint).length;
            path.remove();
            path = new paper.Path.Circle({ center: event.downPoint, radius: radius, fillColor: '#f5576c', strokeColor: '#f093fb', strokeWidth: 2, name: 'Circle' });
        }
    };
    tool.onMouseUp = () => { updateLayers(setLayers); saveHistory(); };
}

function setupLineTool(tool, setLayers, saveHistory) {
    let path;
    tool.onMouseDown = (event) => {
        path = new paper.Path.Line({ from: event.point, to: event.point, strokeColor: '#4facfe', strokeWidth: 2, name: 'Line', strokeCap: 'round' });
    };
    tool.onMouseDrag = (event) => { if (path) path.segments[1].point = event.point; };
    tool.onMouseUp = () => { updateLayers(setLayers); saveHistory(); };
}

function setupArrowTool(tool, setLayers, saveHistory) {
    let group;
    const drawArrow = (start, end) => {
        if (group) group.remove();
        const line = new paper.Path.Line({ from: start, to: end, strokeColor: '#43e97b', strokeWidth: 2 });
        const vector = end.subtract(start);
        const arrowVector = vector.normalize(10);
        const head = new paper.Path([end.subtract(arrowVector.rotate(150)), end, end.subtract(arrowVector.rotate(-150))]);
        head.strokeColor = '#43e97b'; head.strokeWidth = 2; head.fillColor = '#43e97b'; head.closed = true;
        group = new paper.Group([line, head]); group.name = 'Arrow';
    };
    tool.onMouseDown = (event) => { group = drawArrow(event.point, event.point); };
    tool.onMouseDrag = (event) => { drawArrow(event.downPoint, event.point); };
    tool.onMouseUp = () => { updateLayers(setLayers); saveHistory(); };
}

function setupPenTool(tool, setLayers, saveHistory) {
    let path;
    tool.onMouseDown = (event) => {
        path = new paper.Path({ strokeColor: '#4facfe', strokeWidth: 3, strokeCap: 'round', strokeJoin: 'round', name: 'Path' });
        path.add(event.point);
    };
    tool.onMouseDrag = (event) => { if (path) path.add(event.point); };
    tool.onMouseUp = () => { if (path) { path.simplify(10); updateLayers(setLayers); saveHistory(); } };
}

function setupTextTool(tool, setLayers, saveHistory) {
    tool.onMouseDown = (event) => {
        const text = new paper.PointText({
            point: event.point, content: 'Double click to edit', fillColor: 'white', fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24, name: 'Text'
        });
        updateLayers(setLayers);
        saveHistory();
    };
}

export default Canvas;
