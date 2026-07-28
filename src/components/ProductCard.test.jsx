import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from './ProductCard'
import * as CartContext from '../context/CartContext'

const product = {
  id: 1,
  title: 'Cyber Jacket',
  image: 'https://example.com/jacket.png',
  price: 49.99,
  category: 'apparel',
}

function renderCard(addToCart = vi.fn()) {
  vi.spyOn(CartContext, 'useCart').mockReturnValue({ addToCart })
  return {
    addToCart,
    ...render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    ),
  }
}

describe('ProductCard', () => {
  it('renders the product title, category, and formatted price', () => {
    renderCard()
    expect(screen.getByText('Cyber Jacket')).toBeInTheDocument()
    expect(screen.getByText('apparel')).toBeInTheDocument()
    expect(screen.getByText('$49.99')).toBeInTheDocument()
  })

  it('calls addToCart and shows a confirmation state when clicked', async () => {
    const user = userEvent.setup()
    const { addToCart } = renderCard()

    const addButton = screen.getByTitle('Add to cart')
    await user.click(addButton)

    expect(addToCart).toHaveBeenCalledWith(product)
    expect(screen.getByText('✓ Added')).toBeInTheDocument()
  })
})
