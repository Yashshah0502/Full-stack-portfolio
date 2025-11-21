export type CardColumn = "Upcoming" | "In-Progress" | "Completed";

export interface Node {
  id: number;
  title: string;
  description?: string;
  technologies: string[];
  demoURL?: string;
  createdAt: string;
}

export interface Card {
  id: number;
  title: string;
  column: CardColumn;
  nodeId?: number | null;
  position: number;
}