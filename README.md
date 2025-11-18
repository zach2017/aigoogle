# FlowGenius AI

A modern, professional-grade web application for creating Flowcharts, UML Diagrams, and State Diagrams. Built with React 18, TypeScript, Tailwind CSS, and React Flow.

## Features

- **Interactive Canvas**: Drag and drop nodes, connect them with edges, and reorganize your diagrams effortlessly.
- **AI Powered**: Describe your diagram in natural language (e.g., "Create a flowchart for an e-commerce checkout process") and watch it appear instantly using the Google Gemini API.
- **Support for Multiple Diagram Types**:
  - **Flowcharts**: Start, End, Process, and Decision (Diamond) nodes.
  - **UML**: Class nodes with support for attributes and methods.
  - **State Diagrams**: State nodes and transitions.
- **Persistence**: Export your diagrams to JSON and import them back later to continue working.
- **Responsive Design**: Fully styled with Tailwind CSS for a clean, modern aesthetic.

## Setup & Installation

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install react react-dom reactflow lucide-react @google/genai clsx tailwind-merge
    ```
    *Note: TypeScript and Vite/Webpack dev dependencies are assumed.*
3.  **Environment Variables**:
    Create a `.env` file in the root and add your Google Gemini API Key (required for AI generation features):
    ```
    API_KEY=your_google_gemini_api_key
    ```
    *Ensure your bundler (e.g., Vite) exposes this as `process.env.API_KEY` or `import.meta.env.VITE_API_KEY` depending on your setup. The provided code uses `process.env.API_KEY`.*
4.  **Run the development server** (e.g., `npm start` or `vite`).

## Usage

- **Adding Nodes**: Drag shapes from the Left Sidebar onto the canvas.
- **Connecting Nodes**: Drag from the handles (dots) on the sides of a node to another node.
- **Deleting**: Select a node or edge and press `Backspace`.
- **AI Generation**: Type a prompt in the top bar input and press Enter or click the Sparkles icon.
- **Save/Load**: Use the Export/Import buttons in the top right.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Diagramming**: React Flow (v11)
- **Icons**: Lucide React
- **AI**: Google GenAI SDK (Gemini 2.5 Flash)
