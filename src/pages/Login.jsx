import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
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
        <h1 className="page-title gradient-text">Welcome Back</h1>
        <div className="page-divider" />
        <p style={{ color: "var(--text-muted)", fontSize: ".88rem", marginTop: 10 }}>
          Sign in to your SimpleYoung account
        </p>
      </div>

      {error && (
        <div className="cyber-alert cyber-alert-error">❌ {error}</div>
      )}

      <div className="glass-card p-4">
        <Form onSubmit={handleSubmit} noValidate>
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
              placeholder="••••••••"
              required
            />
          </Form.Group>

          <button
            type="submit"
            className="btn-cyber btn-cyber-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing In…" : "Sign In"}
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
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          style={{ color: "var(--neon-cyan)", textDecoration: "none", fontWeight: 600 }}
        >
          Register
        </Link>
      </p>
    </Container>
  );
}
