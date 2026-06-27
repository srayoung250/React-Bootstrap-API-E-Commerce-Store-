import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const CATEGORIES = [
  "all",
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  return (
    <Container className="py-2" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-header">
        <h1 className="page-title gradient-text">All Products</h1>
        <div className="page-divider" />
      </div>

      {/* Category filters */}
      {!loading && !error && (
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`btn-cyber ${activeCategory === cat ? "btn-cyber-primary" : "btn-cyber-secondary"}`}
              style={{
                fontSize: ".65rem",
                padding: "7px 16px",
                letterSpacing: "1.2px",
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingSpinner text="Fetching Products..." />}

      {error && (
        <div className="cyber-alert cyber-alert-error text-center">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="cyber-alert cyber-alert-success text-center">
          No products found in this category.
        </div>
      )}

      {!loading && !error && (
        <Row className="gy-4">
          {filtered.map((product) => (
            <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
