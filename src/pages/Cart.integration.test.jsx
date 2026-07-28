import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { CartProvider } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Cart from './Cart'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ currentUser: null }),
}))

const product = {
  id: 7,
  title: 'Neon Sneakers',
  image: 'https://example.com/sneakers.png',
  price: 89.5,
  category: 'footwear',
}

describe('Cart integration', () => {
  it('adding a product from ProductCard updates the Cart page', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={product} />
          <Cart />
        </CartProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()

    await user.click(screen.getByTitle('Add to cart'))

    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
    // Appears twice once added: once on the ProductCard, once in the Cart line item
    expect(screen.getAllByText('Neon Sneakers')).toHaveLength(2)
    expect(screen.getByText('1 item in your cart')).toBeInTheDocument()

    const totals = screen.getAllByText('$89.50')
    expect(totals.length).toBeGreaterThan(0)
  })
})
