import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="glass-card product-card h-100">
      <div
        className="product-img-wrap"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h5
          className="product-title"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.title}
        </h5>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="d-flex gap-2">
          <button
            className="btn-cyber btn-cyber-primary flex-fill"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Details
          </button>
          <button
            className={`btn-cyber flex-fill ${added ? 'btn-cyber-pink' : 'btn-cyber-secondary'}`}
            onClick={handleAddToCart}
            title="Add to cart"
          >
            {added ? '✓ Added' : '🛒'}
          </button>
        </div>
      </div>
    </div>
  )
}
