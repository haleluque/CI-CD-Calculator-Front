/**
 * API base URL for the Calculator backend.
 * In development, Vite proxy forwards /api to localhost:8080.
 * In production (e.g. GitHub Pages), set VITE_API_URL to the live backend (e.g. Render).
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : '')
