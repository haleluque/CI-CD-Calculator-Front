import { useState } from 'react'
import * as calculatorService from '../services/calculatorService.js'
import './CalculatorPage.css'

export default function CalculatorPage() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const numA = parseFloat(a)
  const numB = parseFloat(b)
  const valid = Number.isFinite(numA) && Number.isFinite(numB)

  async function run(op) {
    setError(null)
    setResult(null)
    if (!valid) {
      setError('Enter two valid numbers')
      return
    }
    setLoading(true)
    try {
      let value
      switch (op) {
        case 'sum':
          value = await calculatorService.sum(numA, numB)
          break
        case 'subtract':
          value = await calculatorService.subtract(numA, numB)
          break
        case 'multiply':
          value = await calculatorService.multiply(numA, numB)
          break
        case 'divide':
          if (numB === 0) {
            setError('Cannot divide by zero')
            return
          }
          value = await calculatorService.divide(numA, numB)
          break
        default:
          return
      }
      setResult(value)
    } catch (err) {
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="calculator-page">
      <h1>Calculator</h1>
      <p className="calculator-desc">Uses the backend API: sum, subtract, multiply, divide.</p>

      <div className="calculator-form">
        <label>
          <span>First number</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="e.g. 2"
            step="any"
          />
        </label>
        <label>
          <span>Second number</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="e.g. 3"
            step="any"
          />
        </label>

        <div className="calculator-ops">
          <button type="button" onClick={() => run('sum')} disabled={!valid || loading}>
            +
          </button>
          <button type="button" onClick={() => run('subtract')} disabled={!valid || loading}>
            −
          </button>
          <button type="button" onClick={() => run('multiply')} disabled={!valid || loading}>
            ×
          </button>
          <button type="button" onClick={() => run('divide')} disabled={!valid || loading}>
            ÷
          </button>
        </div>
      </div>

      {loading && <p className="calculator-status">Loading…</p>}
      {error && <p className="calculator-error">{error}</p>}
      {result != null && !error && (
        <p className="calculator-result">
          Result: <strong>{result}</strong>
        </p>
      )}
    </div>
  )
}
