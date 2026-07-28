import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders the default loading text when no prop is passed', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders custom text passed via the text prop', () => {
    render(<LoadingSpinner text="Fetching products..." />)
    expect(screen.getByText('Fetching products...')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
})
