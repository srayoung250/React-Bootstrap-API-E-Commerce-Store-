import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteModal from "../components/DeleteModal";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [cartMsg, setCartMsg] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Product not found or failed to load."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setShowModal(false);
      navigate("/products", {
        state: { toast: `Product "${product.title}" was deleted.` },
      });
    } catch {
      setError("Delete failed. Please try again.");
      setDeleting(false);
      setShowModal(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setCartMsg(`"${product.title}" added to cart!`);
    setTimeout(() => setCartMsg(null), 3000);
  };

  const renderStars = (rate) => {
    const full = Math.round(rate);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  if (loading) return <LoadingSpinner text="Loading Product..." />;

  if (error)
    return (
      <Container className="py-4" style={{ zIndex: 1, position: "relative" }}>
        <div className="cyber-alert cyber-alert-error">{error}</div>
        <button
          className="btn-cyber btn-cyber-secondary mt-2"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>
      </Container>
    );

  return (
    <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
      <button
        className="btn-cyber btn-cyber-secondary mb-4"
        style={{ fontSize: ".65rem", padding: "7px 16px" }}
        onClick={() => navigate("/products")}
      >
        ← Back
      </button>

      {cartMsg && (
        <div className="cyber-alert cyber-alert-success">{cartMsg}</div>
      )}

      <div className="glass-card p-4 p-lg-5">
        <Row className="gy-4 align-items-center">
          {/* Image */}
          <Col lg={5}>
            <div className="detail-img-wrap">
              <img src={product.image} alt={product.title} />
            </div>
          </Col>

          {/* Info */}
          <Col lg={7}>
            <span className="detail-category-badge">{product.category}</span>
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-price">${product.price.toFixed(2)}</p>

            {product.rating && (
              <p className="detail-rating">
                <span className="star">{renderStars(product.rating.rate)}</span>
                &nbsp;{product.rating.rate} / 5 &nbsp;·&nbsp;{" "}
                {product.rating.count} reviews
              </p>
            )}

            <p className="detail-description">{product.description}</p>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn-cyber btn-cyber-primary"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
              <button
                className="btn-cyber btn-cyber-edit"
                onClick={() => navigate(`/edit-product/${id}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn-cyber btn-cyber-danger"
                onClick={() => setShowModal(true)}
              >
                🗑 Delete
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <DeleteModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </Container>
  );
}
