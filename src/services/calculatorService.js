import { API_BASE_URL } from '../others/constants.js'

/**
 * Calculator API service – calls the Spring Boot CalculatorController endpoints.
 */

async function request(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }
  const text = await res.text()
  const value = parseFloat(text)
  if (Number.isNaN(value)) throw new Error(`Invalid response: ${text}`)
  return value
}

export async function sum(a, b) {
  return request(`/sum/${a}/${b}`)
}

export async function subtract(a, b) {
  return request(`/subtract/${a}/${b}`)
}

export async function multiply(a, b) {
  return request(`/multiply/${a}/${b}`)
}

export async function divide(a, b) {
  return request(`/divide/${a}/${b}`)
}
