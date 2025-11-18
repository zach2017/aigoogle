import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Decision Node (Diamond)
export const DecisionNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="relative w-32 h-32">
      {/* Rotate the inner square to make a diamond, counter-rotate text */}
      <div className="absolute inset-0 bg-amber-100 border-2 border-amber-500 transform rotate-45 flex items-center justify-center shadow-sm rounded-sm hover:shadow-md transition-shadow">
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2">
        <div className="text-xs font-medium text-center text-amber-900 break-words w-24">
          {data.label}
        </div>
      </div>

      {/* Handles - positioned absolutely relative to the non-rotated container */}
      <Handle type="target" position={Position.Top} id="t" isConnectable={isConnectable} className="w-3 h-3 !bg-amber-600" style={{ top: 0 }} />
      <Handle type="source" position={Position.Right} id="r" isConnectable={isConnectable} className="w-3 h-3 !bg-amber-600" style={{ right: 0 }} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} className="w-3 h-3 !bg-amber-600" style={{ bottom: 0 }} />
      <Handle type="source" position={Position.Left} id="l" isConnectable={isConnectable} className="w-3 h-3 !bg-amber-600" style={{ left: 0 }} />
    </div>
  );
});

// UML Class Node
export const UmlClassNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-white border-2 border-slate-700 w-64 shadow-md rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-slate-100 border-b-2 border-slate-700 p-2 font-bold text-center text-slate-900">
        {data.label}
      </div>
      
      {/* Attributes */}
      <div className="p-2 border-b border-slate-700 bg-white min-h-[20px]">
        {data.attributes && data.attributes.length > 0 ? (
          <ul className="text-xs text-slate-700 space-y-1 text-left list-none">
            {data.attributes.map((attr: string, i: number) => <li key={i}>{attr}</li>)}
          </ul>
        ) : (
          <div className="text-xs text-slate-400 italic">No attributes</div>
        )}
      </div>

      {/* Methods */}
      <div className="p-2 bg-white min-h-[20px]">
         {data.methods && data.methods.length > 0 ? (
          <ul className="text-xs text-slate-700 space-y-1 text-left list-none">
            {data.methods.map((method: string, i: number) => <li key={i}>{method}</li>)}
          </ul>
        ) : (
           <div className="text-xs text-slate-400 italic">No methods</div>
        )}
      </div>

      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="!bg-slate-700" />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="!bg-slate-700" />
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="!bg-slate-700" />
      <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="!bg-slate-700" />
    </div>
  );
});
