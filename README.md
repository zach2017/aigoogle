# FlowGenius AI

A professional-grade diagramming tool built entirely with Vanilla JavaScript, HTML, and Tailwind CSS.

## Features

- **Interactive Canvas**: Infinite canvas with panning, zooming, and drag-and-drop nodes.
- **Line Drawing**: Connect nodes with smooth bezier curves. Click a node's right handle and drag to another node's left handle.
- **AI Generation**: Describe your flow (e.g. "Login process") and Gemini AI creates the diagram instantly.
- **Import/Export**: Save your diagrams as JSON files.
- **No Build Steps**: Runs directly in the browser.

## Setup

1. Create a `process.env.API_KEY` environment variable or simple server to inject it if running locally (or use a proxy).
2. Open `index.html` in a browser.

## Technology Stack

- **Vanilla JS**: ES Modules, no bundlers required for logic.
- **Tailwind CSS**: Styling via CDN.
- **Lucide Icons**: Vector icons.
- **Google GenAI SDK**: Direct API integration via importmap.
