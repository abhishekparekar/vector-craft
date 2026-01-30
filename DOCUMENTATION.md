# 📚 VectorCraft - Technical Documentation

## Architecture Overview

### Component Hierarchy
```
App (Main State Container)
├── WelcomeScreen (Conditional)
└── Main Application
    ├── TopBar (Project Management)
    ├── Workspace
    │   ├── Toolbar (Left Panel)
    │   ├── Canvas (Main Area)
    │   └── Right Panels
    │       ├── PropertiesPanel
    │       └── LayersPanel
```

---

## State Management

### App-Level State
```javascript
{
  activeTool: string,           // Current active drawing tool
  selectedObject: PaperItem,    // Selected Paper.js object
  layers: Array,                // All layer objects
  showWelcome: boolean,         // Welcome screen visibility
  projectName: string,          // Current project name
  canvasRef: Paper,             // Paper.js instance reference
  zoom: number,                 // Current zoom level
  gridEnabled: boolean          // Grid visibility
}
```

---

## Core Features Implementation

### 1. Canvas Setup (Canvas.jsx)

**Paper.js Initialization:**
```javascript
useEffect(() => {
  paper.setup(canvasRef.current);
  setCanvasRef(paper);
  
  // Grid creation
  const grid = createGrid();
  grid.visible = gridEnabled;
}, []);
```

**Zoom & Pan:**
- Mouse wheel zooming with bounds (0.1x - 10x)
- Space + drag or Hand tool for panning
- Maintains center point during zoom

**Grid System:**
- 20px grid size
- Low opacity (5%) for subtlety
- Toggle-able visibility

---

### 2. Tool System

Each tool is implemented as a Paper.js Tool with three main events:

#### **Select Tool**
```javascript
tool.onMouseDown = (event) => {
  const hitResult = paper.project.hitTest(event.point);
  // Handle selection
};

tool.onMouseDrag = (event) => {
  // Move selected object
};
```

#### **Shape Tools (Rectangle, Circle)**
```javascript
tool.onMouseDown = (event) => {
  // Create new shape
};

tool.onMouseDrag = (event) => {
  // Update shape size
};

tool.onMouseUp = () => {
  // Finalize and update layers
};
```

#### **Pen Tool**
```javascript
tool.onMouseDown = (event) => {
  // Start new path
};

tool.onMouseDrag = (event) => {
  // Add points to path
};

tool.onMouseUp = () => {
  // Simplify path for smoothness
};
```

---

### 3. Properties Panel

**Real-time Property Updates:**
- Color changes immediately reflect on selected object
- Stroke width adjustable via range slider
- Opacity control (0-100%)
- Rotation (0-360°)
- Independent X/Y scaling

**Implementation Pattern:**
```javascript
const handlePropertyChange = (property, value) => {
  setLocalState(value);
  if (selectedObject && canvasRef) {
    selectedObject[property] = value;
  }
};
```

---

### 4. Layer Management

**Layer Data Structure:**
```javascript
{
  id: number,           // Paper.js item ID
  name: string,         // Display name
  visible: boolean,     // Visibility state
  type: string          // 'rectangle', 'circle', 'path', 'text'
}
```

**Layer Operations:**
- **Visibility Toggle:** `item.visible = !item.visible`
- **Delete:** `item.remove()`
- **Reorder:** `item.insertAbove()` / `item.insertBelow()`

---

### 5. Export System

**SVG Export:**
```javascript
const svg = canvasRef.project.exportSVG({ asString: true });
const blob = new Blob([svg], { type: 'image/svg+xml' });
// Trigger download
```

**PNG Export:**
```javascript
const canvas = canvasRef.view.element;
canvas.toBlob((blob) => {
  // Trigger download
});
```

---

## Design System

### Color Palette

```css
--primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

--bg-primary: #0f0f1e;
--bg-secondary: #1a1a2e;
--bg-tertiary: #252541;
```

### Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
```

### Animation Patterns

**Fade In:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Hover Effects:**
- Transform: `translateY(-2px)` or `scale(1.05)`
- Box-shadow enhancement
- Border color transitions
- Glow effects on primary actions

---

## Performance Considerations

### React Optimizations
1. **useRef for Paper.js** - Avoid re-renders
2. **Controlled Re-renders** - Only update when necessary
3. **Event Delegation** - Single listener per tool

### Paper.js Optimizations
1. **Path Simplification** - `path.simplify(10)` on pen tool
2. **Layer Caching** - Grid as separate layer
3. **Efficient Hit Testing** - Tolerance parameter

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Opera (76+)

### Required Features
- Canvas API
- CSS Backdrop Filter (for glassmorphism)
- ES6+ JavaScript
- CSS Grid & Flexbox

---

## Future Implementation Guide

### Undo/Redo System
```javascript
const history = {
  past: [],
  present: currentState,
  future: []
};

// On action
history.past.push(history.present);
history.present = newState;
history.future = [];

// Undo
history.future.push(history.present);
history.present = history.past.pop();
```

### Firebase Integration
```javascript
// Save to Firestore
await setDoc(doc(db, "projects", projectId), {
  name: projectName,
  data: canvasRef.project.exportJSON(),
  userId: currentUser.uid,
  timestamp: serverTimestamp()
});

// Load from Firestore
const docSnap = await getDoc(doc(db, "projects", projectId));
canvasRef.project.importJSON(docSnap.data().data);
```

### Collaborative Editing
1. Use Firebase Realtime Database
2. Send incremental updates (not full state)
3. Implement operational transformation
4. Show other users' cursors

---

## Testing Strategy

### Unit Tests
- Tool creation functions
- Property update handlers
- Layer manipulation logic
- Export functions

### Integration Tests
- Tool switching
- Object selection and editing
- Layer panel interactions
- Export workflow

### E2E Tests
- Complete drawing workflow
- Save and load projects
- Export in different formats
- Responsive behavior

---

## Deployment Guide

### Build for Production
```bash
npm run build
```

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Hosting Options
1. **Vercel** - Recommended for React apps
2. **Netlify** - Great for static sites
3. **Firebase Hosting** - Integrated with Firebase
4. **GitHub Pages** - Free option

---

## Troubleshooting

### Common Issues

**Issue: Canvas not rendering**
- Check if Paper.js is properly installed
- Verify canvas ref is set
- Check browser console for errors

**Issue: Tools not working**
- Ensure tool is properly activated
- Check if Paper.js events are attached
- Verify canvas has focus

**Issue: Properties not updating**
- Check if object is selected
- Verify canvasRef is available
- Ensure proper state management

---

## API Reference

### Canvas Component Props
```typescript
interface CanvasProps {
  activeTool: string;
  setSelectedObject: (obj: any) => void;
  setLayers: (layers: Layer[]) => void;
  setCanvasRef: (ref: any) => void;
  gridEnabled: boolean;
  zoom: number;
  setZoom: (zoom: number) => void;
}
```

### Layer Object
```typescript
interface Layer {
  id: number;
  name: string;
  visible: boolean;
  type: 'rectangle' | 'circle' | 'path' | 'text';
}
```

---

## Resources

- [Paper.js Documentation](http://paperjs.org/reference/)
- [React Documentation](https://react.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)

---

**Last Updated:** January 2026
**Version:** 1.0.0
