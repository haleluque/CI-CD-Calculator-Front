import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('renders the calculator page', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: /calculator/i })
    expect(heading).toBeDefined()
    expect(heading.textContent).toBe('Calculator')
  })
})
