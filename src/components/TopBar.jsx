import { Save, Download, Upload, Grid, ZoomIn, ZoomOut, RotateCcw, FileText, Undo, Redo, Cloud, HardDrive, FolderOpen, ChevronDown, FileType } from 'lucide-react';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import './TopBar.css';

function TopBar({ projectName, setProjectName, canvasRef, zoom, setZoom, gridEnabled, setGridEnabled }) {
    const fileInputRef = useRef(null);
    const [isExportOpen, setIsExportOpen] = useState(false);

    const handleUndo = () => { if (canvasRef && canvasRef.undo) canvasRef.undo(); };
    const handleRedo = () => { if (canvasRef && canvasRef.redo) canvasRef.redo(); };

    // --- Export Handlers ---

    const handleExportSVG = () => {
        if (!canvasRef?.paper?.project) return;
        const svg = canvasRef.paper.project.exportSVG({ asString: true });
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        saveAs(blob, `${projectName}.svg`);
        setIsExportOpen(false);
    };

    const handleExportPNG = () => {
        if (!canvasRef?.paper?.view?.element) return;
        const canvas = canvasRef.paper.view.element;
        canvas.toBlob((blob) => {
            saveAs(blob, `${projectName}.png`);
        });
        setIsExportOpen(false);
    };

    const handleExportPDF = () => {
        if (!canvasRef?.paper?.view?.element) return;
        const canvas = canvasRef.paper.view.element;
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${projectName}.pdf`);
        setIsExportOpen(false);
    };

    const handleExportWord = async () => {
        if (!canvasRef?.paper?.view?.element) return;
        const canvas = canvasRef.paper.view.element;
        const imgData = canvas.toDataURL('image/png');

        // Convert base64 to buffer for docx
        const res = await fetch(imgData);
        const buffer = await res.arrayBuffer();

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: buffer,
                                transformation: {
                                    width: 600, // standard word width
                                    height: (600 / canvas.width) * canvas.height,
                                },
                            }),
                        ],
                    }),
                ],
            }],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `${projectName}.docx`);
        });
        setIsExportOpen(false);
    };

    // --- Save/Load System ---

    // Quick Save (Browser Storage)
    const handleSaveLocal = () => {
        if (!canvasRef?.paper?.project) return;
        const json = canvasRef.paper.project.exportJSON();
        const data = { name: projectName, data: json, timestamp: new Date().toISOString() };
        localStorage.setItem('vectorcraft_project', JSON.stringify(data));
        flashButton('.btn-save-local');
    };

    // Save As (Download .json file)
    const handleSaveToFile = () => {
        if (!canvasRef?.paper?.project) return;
        const json = canvasRef.paper.project.exportJSON();
        const data = { name: projectName, data: json, version: '1.0' };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        saveAs(blob, `${projectName}.vc`);
    };

    // Load from Browser
    const handleLoadLocal = () => {
        const saved = localStorage.getItem('vectorcraft_project');
        if (!saved) { alert('No locally saved project found.'); return; }
        if (confirm('Load last browser-saved project? Current unsaved work will be lost.')) {
            const data = JSON.parse(saved);
            loadProjectData(data);
        }
    };

    // Load from File
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                loadProjectData(data);
            } catch (err) {
                alert('Invalid project file.');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const loadProjectData = (data) => {
        if (data.name) setProjectName(data.name);
        canvasRef.paper.project.clear();
        canvasRef.paper.project.importJSON(data.data);
        canvasRef.paper.view.update();
    };

    const handleNewProject = () => {
        if (confirm('Start a new project? Unsaved changes will be lost.')) {
            canvasRef?.paper?.project?.clear();
            setProjectName('Untitled Project');
        }
    };

    // --- Helpers ---
    const flashButton = (selector) => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.classList.add('success-flash');
            setTimeout(() => btn.classList.remove('success-flash'), 1000);
        }
    };

    const handleZoomIn = () => setZoom && setZoom(Math.min(zoom * 1.2, 5));
    const handleZoomOut = () => setZoom && setZoom(Math.max(zoom / 1.2, 0.1));

    return (
        <div className="topbar glass">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".vc,.json"
                onChange={handleFileUpload}
            />

            <div className="topbar-left">
                <div className="logo-small">
                    <svg width="32" height="32" viewBox="0 0 80 80">
                        <path d="M20 40 L40 20 L60 40 L40 60 Z" fill="#667eea" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="project-name-input"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                />
            </div>

            <div className="scroll-wrapper"> {/* For mobile scrolling */}
                <div className="topbar-center">
                    <button
                        className="btn-icon tooltip"
                        onClick={handleNewProject}
                        data-tooltip-title="New Project"
                        data-tooltip-desc="Create a blank canvas. Discards current unsaved work."
                    >
                        <FileText size={18} />
                    </button>

                    <div className="divider"></div>

                    <div className="btn-group">
                        <button
                            className="btn-icon tooltip btn-save-local"
                            onClick={handleSaveLocal}
                            data-tooltip-title="Quick Save"
                            data-tooltip-desc="Save current progress to browser storage."
                        >
                            <Save size={18} />
                        </button>
                        <button
                            className="btn-icon tooltip"
                            onClick={handleSaveToFile}
                            data-tooltip-title="Save As..."
                            data-tooltip-desc="Download project file (.vc) to your computer."
                        >
                            <HardDrive size={18} />
                        </button>
                    </div>

                    <div className="btn-group">
                        <button
                            className="btn-icon tooltip"
                            onClick={handleLoadLocal}
                            data-tooltip-title="Load Recent"
                            data-tooltip-desc="Restore last saved project from browser."
                        >
                            <RotateCcw size={18} />
                        </button>
                        <button
                            className="btn-icon tooltip"
                            onClick={() => fileInputRef.current.click()}
                            data-tooltip-title="Open File"
                            data-tooltip-desc="Open a .vc project file from your computer."
                        >
                            <FolderOpen size={18} />
                        </button>
                    </div>

                    <div className="divider"></div>

                    <button
                        className="btn-icon tooltip"
                        onClick={handleUndo}
                        data-tooltip-title="Undo"
                        data-tooltip-desc="Revert action."
                    >
                        <Undo size={18} />
                    </button>
                    <button
                        className="btn-icon tooltip"
                        onClick={handleRedo}
                        data-tooltip-title="Redo"
                        data-tooltip-desc="Restore action."
                    >
                        <Redo size={18} />
                    </button>

                    <div className="divider"></div>

                    <button
                        className={`btn-icon tooltip ${gridEnabled ? 'active' : ''}`}
                        onClick={() => setGridEnabled(!gridEnabled)}
                        data-tooltip-title="Grid"
                        data-tooltip-desc="Toggle grid."
                    >
                        <Grid size={18} />
                    </button>

                    <div className="zoom-controls">
                        <button className="btn-icon tooltip" onClick={handleZoomOut}><ZoomOut size={16} /></button>
                        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                        <button className="btn-icon tooltip" onClick={handleZoomIn}><ZoomIn size={16} /></button>
                    </div>
                </div>
            </div>

            <div className="topbar-right">
                <div className="dropdown-container">
                    <button
                        className={`btn btn-primary dropdown-trigger ${isExportOpen ? 'active' : ''}`}
                        onClick={() => setIsExportOpen(!isExportOpen)}
                    >
                        <Download size={16} /> Export As <ChevronDown size={14} />
                    </button>

                    {isExportOpen && (
                        <>
                            <div className="dropdown-backdrop" onClick={() => setIsExportOpen(false)}></div>
                            <div className="dropdown-menu glass slide-in-top">
                                <button onClick={handleExportPNG} className="dropdown-item">
                                    <span className="badge png">PNG</span>
                                    <div className="item-text">
                                        <span className="title">Image</span>
                                        <span className="desc">High Quality</span>
                                    </div>
                                </button>
                                <button onClick={handleExportSVG} className="dropdown-item">
                                    <span className="badge svg">SVG</span>
                                    <div className="item-text">
                                        <span className="title">Vector</span>
                                        <span className="desc">Editable</span>
                                    </div>
                                </button>
                                <button onClick={handleExportPDF} className="dropdown-item">
                                    <span className="badge pdf">PDF</span>
                                    <div className="item-text">
                                        <span className="title">Document</span>
                                        <span className="desc">Print Ready</span>
                                    </div>
                                </button>
                                <button onClick={handleExportWord} className="dropdown-item">
                                    <span className="badge doc">DOC</span>
                                    <div className="item-text">
                                        <span className="title">Word</span>
                                        <span className="desc">Microsoft Word</span>
                                    </div>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TopBar;
