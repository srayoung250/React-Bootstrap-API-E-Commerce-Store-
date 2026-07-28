import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, name);
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      className="py-4"
      style={{ position: "relative", zIndex: 1, maxWidth: 460 }}
    >
      <div className="page-header">
        <h1 className="page-title gradient-text">Create Account</h1>
        <div className="page-divider" />
        <p style={{ color: "var(--text-muted)", fontSize: ".88rem", marginTop: 10 }}>
          Join SimpleYoung Store today
        </p>
      </div>

      {error && (
        <div className="cyber-alert cyber-alert-error">❌ {error}</div>
      )}

      <div className="glass-card p-4">
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <label className="cyber-label">Full Name</label>
            <Form.Control
              className="cyber-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <label className="cyber-label">Email Address</label>
            <Form.Control
              className="cyber-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <label className="cyber-label">Password</label>
            <Form.Control
              className="cyber-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              required
              minLength={6}
            />
          </Form.Group>

          <button
            type="submit"
            className="btn-cyber btn-cyber-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </Form>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: ".88rem",
          color: "var(--text-muted)",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "var(--neon-cyan)", textDecoration: "none", fontWeight: 600 }}
        >
          Sign In
        </Link>
      </p>
    </Container>
  );
}
