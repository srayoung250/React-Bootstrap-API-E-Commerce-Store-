import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!currentUser) { setLoading(false); return; }
      const snap = await getDoc(doc(db, "users", currentUser.uid));
      if (snap.exists()) {
        setName(snap.data().name || "");
        setAddress(snap.data().address || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [currentUser]);

  async function handleUpdate(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { name, address });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    setError(null);
    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (!currentUser)
    return (
      <Container className="py-4" style={{ position: "relative", zIndex: 1 }}>
        <div className="cyber-alert cyber-alert-error">
          Please log in to view your profile.
        </div>
      </Container>
    );

  if (loading) return <LoadingSpinner text="Loading Profile..." />;

  return (
    <Container
      className="py-4"
      style={{ position: "relative", zIndex: 1, maxWidth: 560 }}
    >
      <div className="page-header">
        <h1 className="page-title gradient-text">Your Profile</h1>
        <div className="page-divider" />
        <p style={{ color: "var(--text-muted)", fontSize: ".88rem", marginTop: 10 }}>
          {currentUser.email}
        </p>
      </div>

      {error && <div className="cyber-alert cyber-alert-error">❌ {error}</div>}
      {success && (
        <div className="cyber-alert cyber-alert-success">✅ Profile updated!</div>
      )}

      <div className="glass-card p-4 mb-4">
        <Form onSubmit={handleUpdate} noValidate>
          <Row className="gy-3">
            <Col xs={12}>
              <Form.Group>
                <label className="cyber-label">Email</label>
                <Form.Control
                  className="cyber-input"
                  type="email"
                  value={currentUser?.email || ""}
                  disabled
                  style={{ opacity: 0.6 }}
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <label className="cyber-label">Full Name</label>
                <Form.Control
                  className="cyber-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <label className="cyber-label">Address</label>
                <Form.Control
                  className="cyber-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your shipping address"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            <button
              type="submit"
              className="btn-cyber btn-cyber-primary"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn-cyber btn-cyber-secondary"
              onClick={() => navigate("/orders")}
            >
              View Orders
            </button>
          </div>
        </Form>
      </div>

      {/* Danger zone */}
      <div
        className="glass-card p-4"
        style={{ borderColor: "rgba(255,69,96,.28)" }}
      >
        <h6
          style={{
            fontFamily: "Orbitron, monospace",
            fontSize: ".78rem",
            fontWeight: 700,
            color: "#FF4560",
            marginBottom: 10,
            letterSpacing: 1,
          }}
        >
          Danger Zone
        </h6>
        <p style={{ fontSize: ".85rem", color: "var(--text-muted)", marginBottom: 14 }}>
          Permanently delete your account and all associated data. This cannot be undone.
        </p>

        {!showConfirm ? (
          <button
            className="btn-cyber btn-cyber-danger"
            onClick={() => setShowConfirm(true)}
          >
            Delete Account
          </button>
        ) : (
          <div className="d-flex gap-3 align-items-center flex-wrap">
            <span style={{ fontSize: ".85rem", color: "#FF4560" }}>
              Are you sure?
            </span>
            <button className="btn-cyber btn-cyber-danger" onClick={handleDeleteAccount}>
              Yes, Delete
            </button>
            <button
              className="btn-cyber btn-cyber-secondary"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
