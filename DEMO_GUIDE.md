# 🎯 VectorCraft - Complete Installation & Demo Guide

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v16 or higher) - Check with: `node --version`
- ✅ npm (v7 or higher) - Check with: `npm --version`
- ✅ A modern browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

**What this does:**
- Installs React & React-DOM (UI framework)
- Installs Paper.js (vector graphics library)
- Installs Lucide React (icon library)
- Installs Firebase (cloud services, prepared)
- Installs all development tools (Vite, ESLint, etc.)

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s
```

---

### Step 2: Start Development Server

```bash
npm run dev
```

**What this does:**
- Starts Vite development server
- Compiles React components
- Opens hot-reload server
- Usually opens at `http://localhost:5173`

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 3: Open in Browser

1. Open your browser
2. Navigate to `http://localhost:5173`
3. You should see the **VectorCraft Welcome Screen**!

---

## 🎨 Demo Walkthrough

### Part 1: Welcome Screen (First Launch)

**What you'll see:**
- Animated VectorCraft logo
- 5 feature cards showcasing capabilities
- "Start Creating" button with pulsing glow
- Smooth fade-in animations
- Floating particle effects in background

**Try this:**
- Hover over feature cards (they lift up)
- Notice the glassmorphism effect
- Click "Start Creating"

---

### Part 2: Main Editor Interface

**What you'll see:**
- **TopBar** (top) - Project controls and export buttons
- **Toolbar** (left) - 7 drawing and interaction tools
- **Canvas** (center) - Your creative workspace with grid
- **Properties Panel** (top right) - Object editing controls
- **Layers Panel** (bottom right) - Layer management

**Try this:**
- Notice how everything has smooth animations
- Hover over tool buttons (they highlight)
- See the glassmorphism effect on all panels

---

### Part 3: Drawing Your First Shape

#### Draw a Rectangle

1. **Click** the Rectangle tool (square icon, 3rd tool)
2. **Click and drag** anywhere on the canvas
3. **Release** to create the rectangle
4. **Notice**: 
   - Rectangle appears with purple gradient
   - It's added to the Layers Panel
   - Layer count increases

**Expected result:**
- A beautiful purple gradient rectangle
- Smooth creation animation
- Visible in layers list

---

#### Draw a Circle

1. **Click** the Circle tool (circle icon, 4th tool)
2. **Click** where you want the center
3. **Drag outward** to set the radius
4. **Release** to create the circle
5. **Notice**:
   - Circle has pink gradient
   - Different from rectangle colors
   - Also added to layers

**Expected result:**
- A pink gradient circle
- Smooth, perfect circle shape
- Listed as separate layer

---

#### Free-hand Drawing with Pen Tool

1. **Click** the Pen tool (pen icon, 5th tool)
2. **Click and drag** to draw freely
3. **Release** when done
4. **Notice**:
   - Smooth, simplified path
   - Blue stroke color
   - Great for signatures or custom shapes

**Expected result:**
- Smooth curved line
- Automatically simplified
- Professional looking path

---

#### Add Text

1. **Click** the Text tool (T icon, 6th tool)
2. **Click** anywhere on canvas
3. **Text appears** with "Edit me..."
4. **Notice**:
   - Clean white text
   - Inter font (professional)
   - Ready to edit (coming feature)

**Expected result:**
- Text object on canvas
- Modern typography
- Visible in layers

---

### Part 4: Selecting and Editing Objects

#### Select an Object

1. **Click** the Select tool (arrow icon, 1st tool)
2. **Click** any object you created
3. **Notice**:
   - Object gets selected (highlighted)
   - Properties Panel shows its settings
   - You can now edit it

**Expected result:**
- Selected object is highlighted
- Properties Panel becomes active
- Shows fill color, stroke, etc.

---

#### Change Colors

1. **With object selected**, go to Properties Panel
2. **Click** the Fill Color picker (colored square)
3. **Choose** a new color
4. **Notice**: Object updates instantly!
5. **Try** the Stroke Color picker too

**Expected result:**
- Immediate color update
- No lag or delay
- Smooth transition

---

#### Adjust Stroke Width

1. **In Properties Panel**, find "Stroke Width" slider
2. **Drag** the slider left/right
3. **Notice**: Border thickness changes in real-time
4. **Try**: 0px (no border) to 20px (thick border)

**Expected result:**
- Real-time stroke updates
- Smooth slider interaction
- Value displayed next to slider

---

#### Change Opacity

1. **Find** the "Opacity" slider in Properties Panel
2. **Drag** left to make transparent, right to make solid
3. **Notice**: Object becomes see-through
4. **Try**: 50% opacity for subtle effects

**Expected result:**
- Transparent object
- Still interactable
- Layers behind show through

---

#### Rotate Object

1. **Find** the "Rotation" slider
2. **Drag** to rotate 0° to 360°
3. **Notice**: Object rotates around its center
4. **Try**: 45° for diamond effect on rectangles

**Expected result:**
- Smooth rotation
- Degree displayed
- Maintains position

---

#### Scale Object

1. **Find** the "Scale" inputs (X and Y)
2. **Change** X to 2 (double width)
3. **Change** Y to 0.5 (half height)
4. **Notice**: Independent scaling!

**Expected result:**
- Stretched or squished object
- Maintains rotation and position
- Real-time updates

---

### Part 5: Layer Management

#### View Layers

1. **Look** at the Layers Panel (bottom right)
2. **Notice**:
   - Each object is listed
   - Icons show object type
   - Layer count badge at top
   - Newest layers on top

**Expected result:**
- Clear layer list
- Visual hierarchy
- Easy to identify objects

---

#### Toggle Layer Visibility

1. **Hover** over any layer item
2. **Click** the Eye icon (👁️)
3. **Notice**: Object disappears from canvas
4. **Click** again to show it

**Expected result:**
- Object hides (icon changes to EyeOff)
- Layer still in list
- Click again to show

---

#### Reorder Layers

1. **Hover** over a layer
2. **Click** Up Arrow (⬆️) or Down Arrow (⬇️)
3. **Notice**: Layer moves in list AND on canvas
4. **Try**: Bring a layer to front

**Expected result:**
- Layer order changes
- Visual stacking changes
- Smooth transition

---

#### Delete Layer

1. **Hover** over a layer
2. **Click** the Trash icon (🗑️)
3. **Notice**: 
   - Object removed from canvas
   - Layer disappears from list
   - Layer count decreases

**Expected result:**
- Permanent deletion
- Smooth removal animation
- List updates immediately

---

### Part 6: Navigation & View Controls

#### Pan the Canvas

**Method 1: Hand Tool**
1. **Click** Hand tool (hand icon, 7th tool)
2. **Click and drag** anywhere on canvas
3. **Notice**: View moves, objects stay in place

**Method 2: Spacebar**
1. **With any tool active**, hold Spacebar
2. **Drag** on canvas
3. **Release** Spacebar
4. **Notice**: Returns to previous tool

**Expected result:**
- Smooth panning
- No object movement
- Easy navigation of large canvases

---

#### Zoom In/Out

**Method 1: Mouse Wheel**
1. **Scroll up** to zoom in
2. **Scroll down** to zoom out
3. **Notice**: Zooms toward cursor position

**Method 2: Zoom Buttons**
1. **Click** + button in TopBar
2. **Click** - button in TopBar
3. **Notice**: Current zoom shows as percentage

**Expected result:**
- Smooth zoom (10% to 1000%)
- Zoom level displayed
- Centered on cursor

---

#### Toggle Grid

1. **Click** the Grid button (grid icon in TopBar)
2. **Notice**: Grid disappears or reappears
3. **Try**: Grid helps with alignment

**Expected result:**
- Grid visibility toggles
- Subtle 20px grid
- Helpful for precise work

---

### Part 7: Saving & Loading

#### Save Project

1. **Click** the Save button (💾 icon in TopBar)
2. **Notice**: Button briefly turns green (success!)
3. **Your project is saved** to browser storage

**Expected result:**
- Visual feedback (green flash)
- No page refresh needed
- Saves all objects and settings

---

#### Load Saved Project

1. **Refresh** the page (to test)
2. **Click** "Start Creating" on welcome screen
3. **Click** Load button (📁 icon in TopBar)
4. **Notice**: Your project is restored!

**Expected result:**
- All objects return
- Same positions and colors
- Layer list matches

---

### Part 8: Exporting Your Work

#### Export as SVG

1. **Click** the "SVG" button (top right corner)
2. **Browser downloads** a .svg file
3. **Open** the file in any app
4. **Notice**: Perfect quality, scalable!

**Use cases for SVG:**
- Web graphics
- Print materials
- Logo files
- Scalable graphics

**Expected result:**
- Downloaded `ProjectName.svg` file
- Opens in browser/editor
- Perfect vector quality

---

#### Export as PNG

1. **Click** the "PNG" button (top right)
2. **Browser downloads** a .png file
3. **Open** in any image viewer
4. **Notice**: Raster image, ready to use!

**Use cases for PNG:**
- Social media posts
- Email attachments
- Quick sharing
- Presentations

**Expected result:**
- Downloaded `ProjectName.png` file
- Opens anywhere
- Transparent background (if set)

---

## 🎓 Advanced Demo Scenarios

### Scenario 1: Create a Simple Logo

**Steps:**
1. Draw circle (base shape)
2. Add text in center
3. Change circle color to brand color
4. Adjust text size (via scale)
5. Export as SVG

**Time:** 2 minutes
**Result:** Professional logo file

---

### Scenario 2: Design a Social Media Banner

**Steps:**
1. Draw rectangle (full width)
2. Set attractive gradient colors
3. Add text with message
4. Add accent circles
5. Adjust opacity for depth
6. Export as PNG

**Time:** 3 minutes
**Result:** Shareable banner

---

### Scenario 3: Create an Icon Set

**Steps:**
1. Enable grid for consistency
2. Draw shapes at consistent sizes
3. Use same stroke width (2-3px)
4. Organize with layers
5. Hide/show to preview each
6. Export individual icons

**Time:** 5 minutes
**Result:** Icon set

---

## 🐛 Troubleshooting

### Issue: "Canvas is blank"
**Solutions:**
- Check if layers are visible (eye icon)
- Try zooming out (might be too zoomed in)
- Refresh page and reload project

### Issue: "Tool not working"
**Solutions:**
- Ensure correct tool is selected (highlighted)
- Click tool again to reactivate
- Refresh page if persists

### Issue: "Can't modify object"
**Solutions:**
- Use Select tool first
- Click object to select it
- Check if object is locked (coming feature)

### Issue: "Export not working"
**Solutions:**
- Create at least one object first
- Check browser allows downloads
- Try different export format

---

## 📊 Performance Tips

### For Best Performance:
1. **Delete unused layers** regularly
2. **Work at 100% zoom** when possible
3. **Save frequently**
4. **Close other browser tabs**
5. **Use latest browser version**

### Optimal Workflow:
1. Sketch rough ideas first
2. Refine with precise tools
3. Organize with layers
4. Save checkpoints
5. Export final versions

---

## 🎯 Demo Script for Presentations

**Total Time: 5 minutes**

### Minute 1: Introduction
> "VectorCraft is a web-based vector design tool I built with React and Paper.js. Let me show you what it can do."

### Minute 2: Drawing
> "I can create shapes with intuitive tools. Watch as I draw a rectangle, circle, and free-hand path."
[Draw 3 shapes quickly]

### Minute 3: Editing
> "Selecting any object opens the properties panel where I can change colors, stroke, opacity, rotation, and scale—all in real-time."
[Change colors and rotate object]

### Minute 4: Layers
> "The layer panel lets me manage all objects. I can reorder, hide, or delete layers easily."
[Reorder and toggle visibility]

### Minute 5: Export
> "Finally, I can export as SVG for scalable graphics or PNG for immediate use. The whole workflow is smooth and fast."
[Export both formats]

---

## ✅ Success Checklist

After completing this demo, you should:
- [ ] See the welcome screen
- [ ] Draw all 4 shape types
- [ ] Select and edit an object
- [ ] Change colors and properties
- [ ] Manage layers (hide/show/delete)
- [ ] Pan and zoom the canvas
- [ ] Save and load a project
- [ ] Export as SVG and PNG

---

## 🎉 Congratulations!

You've now experienced all core features of VectorCraft!

### Next Steps:
1. **Create something** - Make a real project
2. **Experiment** - Try combining tools
3. **Share** - Show others your work
4. **Contribute** - Add features you want
5. **Learn** - Explore the codebase

---

**VectorCraft: Professional vector design, free and open. 🎨**

*Built with React, Paper.js, and passion for great UX.*
