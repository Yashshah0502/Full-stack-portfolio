export interface HealthStatus {
  status: string;
  service: string;
  timestamp: string;
}

export interface Node {
  id: number;
  title: string;
  description?: string;
  technologies: string[];
  demoURL?: string;
  createdAt: string;
}

export type CardColumn = "Upcoming" | "In-Progress" | "Completed";

export interface Card {
  id: number;
  title: string;
  column: CardColumn;
  nodeId?: number | null;
  position: number;
}

export type AnalyticsEventType = "nodeClick" | "cardMove" | "themeChange";

export interface AnalyticsEvent {
  id: number;
  eventType: AnalyticsEventType | string;
  userSessionId?: string;
  timestamp: string;
  details?: Record<string, unknown>;
}
