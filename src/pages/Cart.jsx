import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total, itemCount } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
        <div className="page-header">
          <h1 className="page-title gradient-text">Your Cart</h1>
          <div className="page-divider" />
        </div>
        <div className="glass-card text-center py-5 px-3 mt-4">
          <div style={{ fontSize: "5rem", marginBottom: 16 }}>🛒</div>
          <h4
            style={{
              fontFamily: "Orbitron, monospace",
              fontSize: "1rem",
              marginBottom: 8,
              color: "var(--text-primary)",
            }}
          >
            Your cart is empty
          </h4>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: ".88rem",
              marginBottom: 24,
            }}
          >
            Add some products to get started
          </p>
          <button
            className="btn-cyber btn-cyber-primary"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-header">
        <h1 className="page-title gradient-text">Your Cart</h1>
        <div className="page-divider" />
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: ".88rem",
            marginTop: 10,
          }}
        >
          {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <Row className="gy-4 mt-1">
        {/* ── ITEM LIST ── */}
        <Col lg={8}>
          <div className="d-flex flex-column gap-3">
            {cart.map((item) => (
              <div key={item.id} className="glass-card cart-item-card">
                {/* Clickable image */}
                <div
                  className="cart-item-img"
                  onClick={() => navigate(`/products/${item.id}`)}
                  title="View product"
                >
                  <img src={item.image} alt={item.title} />
                </div>

                {/* Info */}
                <div className="cart-item-info">
                  <p className="product-category mb-1">{item.category}</p>
                  <h6
                    className="cart-item-title"
                    onClick={() => navigate(`/products/${item.id}`)}
                    title="View product"
                  >
                    {item.title}
                  </h6>
                  <p className="cart-item-unit-price">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                {/* Controls */}
                <div className="cart-item-controls">
                  <p className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-cyber btn-cyber-danger cart-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 d-flex gap-3 flex-wrap">
            <button
              className="btn-cyber btn-cyber-secondary"
              style={{ fontSize: ".65rem", padding: "7px 16px" }}
              onClick={() => navigate("/products")}
            >
              ← Continue Shopping
            </button>
            <button
              className="btn-cyber btn-cyber-danger"
              style={{ fontSize: ".65rem", padding: "7px 16px" }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </Col>

        {/* ── ORDER SUMMARY ── */}
        <Col lg={4}>
          <div className="glass-card p-4 cart-summary">
            <h5 className="cart-summary-title">Order Summary</h5>

            <div className="cart-summary-row">
              <span>Items ({itemCount})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span style={{ color: "var(--neon-cyan)", fontWeight: 600 }}>
                Free
              </span>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="btn-cyber btn-cyber-primary w-100 mt-3">
              Checkout
            </button>
            <button
              className="btn-cyber btn-cyber-secondary w-100 mt-2"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
