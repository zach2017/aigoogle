import { Node, Edge } from 'reactflow';

export type NodeType = 'process' | 'decision' | 'umlClass' | 'start' | 'end' | 'state';

export interface DiagramData {
  nodes: Node[];
  edges: Edge[];
  viewport: { x: number; y: number; zoom: number };
}

export interface NodeData {
  label: string;
  attributes?: string[]; // For UML
  methods?: string[]; // For UML
  color?: string;
}

export interface GeminiDiagramResponse {
  nodes: {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: { label: string; attributes?: string[]; methods?: string[] };
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    label?: string;
  }[];
}
