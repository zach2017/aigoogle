import { Edge, Node } from 'reactflow';

export const INITIAL_NODES: Node[] = [
  {
    id: '1',
    type: 'input', // mapped to start
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  },
];

export const INITIAL_EDGES: Edge[] = [];

export const NODE_TYPES_LABEL = {
  process: 'Process',
  decision: 'Decision',
  umlClass: 'UML Class',
  start: 'Start',
  end: 'End',
  state: 'State Node',
};
