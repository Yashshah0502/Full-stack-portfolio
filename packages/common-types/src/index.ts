// Shared types for the full-stack portfolio application

export interface HealthResponse {
  status: string
  service: string
}

export interface ApiError {
  message: string
  code?: string
}

// Add more shared types here as your application grows
