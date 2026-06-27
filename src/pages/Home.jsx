import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "🛍️",
    title: "Browse Products",
    description:
      "Explore 20 curated products spanning electronics, jewellery, fashion, and more.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Powered by FakeStoreAPI — real REST calls with instant feedback on every action.",
  },
  {
    icon: "🔧",
    title: "Full CRUD Control",
    description:
      "Add, edit, and delete products with smooth form flows and confirmation modals.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero-section">
        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <div className="hero-badge">SimpleYoung Store · Est. 2024</div>
              <h1 className="hero-title">
                <span className="gradient-text">The Future</span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>
                  of Shopping
                </span>
                <br />
                <span className="neon-cyan">Is Here</span>
              </h1>
              <p className="hero-subtitle">
                Discover a next-generation shopping experience, we offer the
                best products at thrifty prices. Order now and have your item at
                your doorstep in less than 15 minutes with the fastest drones
                around.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn-cyber btn-cyber-primary"
                  onClick={() => navigate("/products")}
                >
                  Explore Products
                </button>
                <button
                  className="btn-cyber btn-cyber-secondary"
                  onClick={() => navigate("/add-product")}
                >
                  + Add Product
                </button>
              </div>
            </Col>

            <Col lg={5} className="d-flex justify-content-center">
              <div className="hero-visual">
                <div className="hero-orb" />
                <div className="glass-card floating-card">
                  <span className="hero-store-icon">🛒</span>
                  <p className="hero-store-label">SimpleYoung Store</p>
                  <p className="hero-store-count">20 Products</p>
                  <p className="hero-store-sub">Powered by FakeStoreAPI</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{ position: "relative", zIndex: 1 }}>
        <Container>
          <div className="page-header">
            <h2 className="page-title gradient-text">What We Offer</h2>
            <div className="page-divider" />
          </div>
          <Row className="gy-4 mt-1">
            {features.map((f) => (
              <Col md={4} key={f.title}>
                <div className="glass-card feature-card h-100">
                  <span className="feature-icon">{f.icon}</span>
                  <h5 className="feature-title">{f.title}</h5>
                  <p className="feature-desc">{f.description}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className="glass-card text-center mt-5 py-4 px-3">
            <h4
              style={{
                fontFamily: "Orbitron, monospace",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: 8,
                color: "var(--text-primary)",
              }}
            >
              Ready to explore?
            </h4>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: ".88rem",
                marginBottom: 20,
              }}
            >
              Browse all products or create your own — no sign-up needed.
            </p>
            <button
              className="btn-cyber btn-cyber-pink"
              onClick={() => navigate("/products")}
            >
              Shop Now →
            </button>
          </div>
        </Container>
      </section>
    </>
  );
}
