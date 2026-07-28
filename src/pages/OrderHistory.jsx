import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getOrdersByUser } from "../api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderHistory() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getOrdersByUser(currentUser.uid)
      .then(setOrders)
      .catch((err) => {
        console.error("Order fetch error:", err);
        setError("Failed to load orders. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  if (!currentUser)
    return (
      <Container className="py-4" style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
        <div className="page-header">
          <h1 className="page-title gradient-text">Order History</h1>
          <div className="page-divider" />
        </div>
        <div className="glass-card text-center py-5 px-3 mt-4">
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🔒</div>
          <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
            Please sign in to view your orders.
          </p>
          <button className="btn-cyber btn-cyber-primary" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </Container>
    );

  if (loading) return <LoadingSpinner text="Loading Orders..." />;

  return (
    <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-header">
        <h1 className="page-title gradient-text">Order History</h1>
        <div className="page-divider" />
        <p style={{ color: "var(--text-muted)", fontSize: ".88rem", marginTop: 10 }}>
          {orders.length} order{orders.length !== 1 ? "s" : ""} placed
        </p>
      </div>

      {error && (
        <div className="cyber-alert cyber-alert-error mt-3">{error}</div>
      )}

      {!error && orders.length === 0 && (
        <div className="glass-card text-center py-5 px-3 mt-4">
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>📦</div>
          <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
            No orders yet. Start shopping!
          </p>
          <button
            className="btn-cyber btn-cyber-primary"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      )}

      <Row className="gy-3 mt-1">
        {orders.map((order) => (
          <Col xs={12} key={order.id}>
            <div
              className="glass-card p-3 order-row"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <p
                    style={{
                      fontFamily: "Orbitron, monospace",
                      fontSize: ".72rem",
                      fontWeight: 700,
                      color: "var(--neon-cyan)",
                      margin: 0,
                      letterSpacing: 1,
                    }}
                  >
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p style={{ fontSize: ".8rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                    {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                    {" · "}
                    {new Date(order.createdAt).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: "Orbitron, monospace",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    ${order.total.toFixed(2)}
                  </p>
                  <p style={{ fontSize: ".75rem", color: "var(--neon-purple)", margin: "2px 0 0" }}>
                    View details →
                  </p>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
