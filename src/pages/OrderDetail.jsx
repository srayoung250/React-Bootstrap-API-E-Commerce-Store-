import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getOrder } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading Order..." />;
  if (!order)
    return (
      <Container className="py-4">
        <p>Order not found.</p>
      </Container>
    );

  return (
    <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
      <button
        className="btn-cyber btn-cyber-secondary mb-4"
        style={{ fontSize: ".65rem", padding: "7px 16px" }}
        onClick={() => navigate("/orders")}
      >
        ← Back to Orders
      </button>

      <div className="page-header">
        <h1 className="page-title gradient-text">
          Order #{order.id.slice(0, 8)}
        </h1>
        <div className="page-divider" />
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: ".85rem",
            marginTop: 10,
          }}
        >
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="glass-card p-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center py-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="d-flex justify-content-between mt-3 fw-bold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </Container>
  );
}
