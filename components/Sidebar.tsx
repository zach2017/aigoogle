import React from 'react';
import { Square, Circle, Diamond, Box, FileType2, Activity } from 'lucide-react';

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeLabel: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', nodeLabel);
    event.dataTransfer.effectAllowed = 'move';
  };

  const draggableItemClass = "flex items-center gap-3 p-3 mb-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:shadow-md hover:border-blue-400 transition-all select-none active:cursor-grabbing";

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-bold text-slate-800 text-lg">Components</h2>
        <p className="text-xs text-slate-500 mt-1">Drag shapes to the canvas</p>
      </div>
      
      <div className="p-4 space-y-4">
        
        {/* Flowchart Section */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Flowchart</h3>
          <div 
            className={draggableItemClass} 
            onDragStart={(event) => onDragStart(event, 'input', 'Start')} 
            draggable
          >
            <Circle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-slate-700">Start</span>
          </div>

          <div 
            className={draggableItemClass} 
            onDragStart={(event) => onDragStart(event, 'default', 'Process')} 
            draggable
          >
            <Square className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Process</span>
          </div>

          <div 
            className={draggableItemClass} 
            onDragStart={(event) => onDragStart(event, 'decision', 'Decision?')} 
            draggable
          >
            <Diamond className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-slate-700">Decision</span>
          </div>

          <div 
            className={draggableItemClass} 
            onDragStart={(event) => onDragStart(event, 'output', 'End')} 
            draggable
          >
            <Circle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-slate-700">End</span>
          </div>
        </div>

        {/* UML Section */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">UML / Structure</h3>
          <div 
            className={draggableItemClass} 
            onDragStart={(event) => onDragStart(event, 'umlClass', 'ClassName')} 
            draggable
          >
            <Box className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-slate-700">Class Node</span>
          </div>
           <div 
            className={draggableItemClass} 
            onDragStart={(event) => onDragStart(event, 'default', 'State')} 
            draggable
          >
            <Activity className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">State</span>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-3 rounded-lg border border-blue-100">
           <p className="text-xs text-blue-800 text-center">
             Tip: Select a node and press Backspace to delete it.
           </p>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
