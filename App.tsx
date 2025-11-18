import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  BackgroundVariant,
  MiniMap,
  Panel
} from 'reactflow';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { INITIAL_NODES, INITIAL_EDGES } from './constants';
import { DiagramData } from './types';
import { DecisionNode, UmlClassNode } from './components/CustomNodes';

// Define custom node types for React Flow
const nodeTypes = {
  decision: DecisionNode,
  umlClass: UmlClassNode,
};

const Flow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Handle new connections (lines between nodes)
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
    [setEdges]
  );

  // Handle Drag and Drop from Sidebar
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: { 
          label: label,
          attributes: type === 'umlClass' ? ['+ id: int', '+ name: string'] : undefined,
          methods: type === 'umlClass' ? ['+ save(): void', '+ update(): boolean'] : undefined
        },
      };

      // Add styling based on type for default nodes that aren't custom components
      if (type === 'input') {
        newNode.style = { backgroundColor: '#d1fae5', borderColor: '#10b981' }; // Green
      } else if (type === 'output') {
        newNode.style = { backgroundColor: '#fee2e2', borderColor: '#ef4444' }; // Red
      } else if (type === 'default') {
        newNode.style = { backgroundColor: '#white', borderColor: '#334155' }; // Default Slate
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Actions
  const handleSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const blob = new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'diagram.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [reactFlowInstance]);

  const handleLoad = useCallback((data: any) => {
    const { nodes: loadedNodes, edges: loadedEdges, viewport } = data;
    if (loadedNodes) setNodes(loadedNodes);
    if (loadedEdges) setEdges(loadedEdges);
    if (viewport && reactFlowInstance) {
      reactFlowInstance.setViewport(viewport);
    }
  }, [setNodes, setEdges, reactFlowInstance]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const handleAiGenerate = useCallback((data: any) => {
      if(data.nodes) {
          setNodes(data.nodes);
      }
      if(data.edges) {
          setEdges(data.edges);
      }
      // Auto fit view after a short delay to allow rendering
      setTimeout(() => reactFlowInstance?.fitView(), 100);
  }, [setNodes, setEdges, reactFlowInstance]);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <TopBar 
        onSave={handleSave} 
        onLoad={handleLoad} 
        onClear={handleClear}
        onAiGenerate={handleAiGenerate}
      />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <Sidebar />
        <div className="flex-1 relative h-full bg-slate-50" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            defaultEdgeOptions={{ type: 'smoothstep', animated: false, style: { strokeWidth: 2, stroke: '#64748b' }}}
          >
            <Controls className="!bg-white !border-slate-200 !shadow-sm !text-slate-700" />
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
            <MiniMap 
              className="!bg-white !border !border-slate-200 !shadow-sm rounded-lg overflow-hidden"
              nodeColor={(n) => {
                 if (n.type === 'input') return '#10b981';
                 if (n.type === 'output') return '#ef4444';
                 if (n.type === 'decision') return '#f59e0b';
                 return '#64748b';
              }} 
            />
            <Panel position="bottom-right" className="bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-200 text-xs text-slate-500 shadow-sm">
                FlowGenius AI v1.0
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
