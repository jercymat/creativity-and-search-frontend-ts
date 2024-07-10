import { Edge, Node } from "reactflow";

export interface IdeaMapperGraph {
  nodes: Node[];
  edges: Edge[];
}

export interface ThemeToggle {
  id: number;
  name: string;
  note: string;
  shown: boolean;
  noteShown: boolean;
  colorScheme: string;
  savedResults: {
    id: number;
    shown: boolean;
  }[];
}
