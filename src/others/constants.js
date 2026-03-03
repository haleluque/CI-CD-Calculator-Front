/**
 * API base URL for the Calculator backend.
 * In development, Vite proxy forwards /api to http://localhost:8080
 */
export const API_BASE_URL = import.meta.env.DEV ? '/api' : '/api'
