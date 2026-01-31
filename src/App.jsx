import { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import LayersPanel from './components/LayersPanel';
import TopBar from './components/TopBar';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';
import './responsive.css';


function App() {
    const [activeTool, setActiveTool] = useState('select');
    const [selectedObject, setSelectedObject] = useState(null);
    const [layers, setLayers] = useState([]);
    const [showWelcome, setShowWelcome] = useState(true);
    const [projectName, setProjectName] = useState('Untitled Project');
    const [canvasRef, setCanvasRef] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [gridEnabled, setGridEnabled] = useState(true);

    // useEffect removed to show Welcome Screen on every reload as requested

    const handleStartCreating = () => {
        localStorage.setItem('vectorcraft_visited', 'true');
        setShowWelcome(false);
    };

    if (showWelcome) {
        return <WelcomeScreen onStart={handleStartCreating} />;
    }

    return (
        <div className="app">
            <TopBar
                projectName={projectName}
                setProjectName={setProjectName}
                canvasRef={canvasRef}
                zoom={zoom}
                setZoom={setZoom}
                gridEnabled={gridEnabled}
                setGridEnabled={setGridEnabled}
            />

            <div className="workspace">
                <Toolbar
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                />

                <Canvas
                    activeTool={activeTool}
                    setSelectedObject={setSelectedObject}
                    setLayers={setLayers}
                    setCanvasRef={setCanvasRef}
                    gridEnabled={gridEnabled}
                    zoom={zoom}
                    setZoom={setZoom}
                />

                <div className="right-panels slide-in-right">
                    <PropertiesPanel
                        selectedObject={selectedObject}
                        canvasRef={canvasRef}
                    />
                    <LayersPanel
                        layers={layers}
                        setLayers={setLayers}
                        canvasRef={canvasRef}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
