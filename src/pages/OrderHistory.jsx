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

  useEffect(() => {
    if (!currentUser) return;
    getOrdersByUser(currentUser.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Container className="py-4">
        <p>Please log in to view your order history.</p>
      </Container>
    );
  }

  if (loading) return <LoadingSpinner text="Loading Orders..." />;

  return (
    <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-header">
        <h1 className="page-title gradient-text">Order History</h1>
        <div className="page-divider" />
      </div>

      {orders.length === 0 && (
        <div className="cyber-alert cyber-alert-success text-center mt-4">
          No past orders yet.
        </div>
      )}

      <Row className="gy-3 mt-1">
        {orders.map((order) => (
          <Col xs={12} key={order.id}>
            <div
              className="glass-card p-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <div className="d-flex justify-content-between flex-wrap">
                <span>Order #{order.id.slice(0, 8)}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
