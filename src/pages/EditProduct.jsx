import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const CATEGORIES = [
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: CATEGORIES[0],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        const p = res.data;
        setForm({
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
        });
      })
      .catch(() => setFetchError("Could not load product data."))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price greater than 0.";
    if (!form.description.trim()) e.description = "Description is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setSubmitting(true);
    setApiError(null);
    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
      });
      setSuccess("Product updated successfully!");
    } catch {
      setApiError("Update failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading Product..." />;

  if (fetchError)
    return (
      <Container className="py-4" style={{ zIndex: 1, position: "relative" }}>
        <div className="cyber-alert cyber-alert-error">{fetchError}</div>
        <button
          className="btn-cyber btn-cyber-secondary mt-2"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>
      </Container>
    );

  return (
    <Container
      className="py-4"
      style={{ position: "relative", zIndex: 1, maxWidth: 680 }}
    >
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Edit</span> Product
        </h1>
        <div className="page-divider" />
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: ".85rem",
            marginTop: 10,
          }}
        >
          Update product #{id} via FakeStoreAPI PUT request
        </p>
      </div>

      {success && (
        <div className="cyber-alert cyber-alert-success">
          ✅ {success}
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <button
              className="btn-cyber btn-cyber-primary"
              style={{ fontSize: ".65rem", padding: "6px 14px" }}
              onClick={() => navigate(`/products/${id}`)}
            >
              View Product
            </button>
            <button
              className="btn-cyber btn-cyber-secondary"
              style={{ fontSize: ".65rem", padding: "6px 14px" }}
              onClick={() => navigate("/products")}
            >
              All Products
            </button>
          </div>
        </div>
      )}

      {apiError && (
        <div className="cyber-alert cyber-alert-error">❌ {apiError}</div>
      )}

      <div className="glass-card p-4">
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="gy-3">
            <Col xs={12}>
              <Form.Group>
                <label className="cyber-label">Product Title</label>
                <Form.Control
                  className="cyber-input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <label className="cyber-label">Price ($)</label>
                <Form.Control
                  className="cyber-input"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <label className="cyber-label">Category</label>
                <Form.Select
                  className="cyber-input"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <label className="cyber-label">Description</label>
                <Form.Control
                  className="cyber-input"
                  as="textarea"
                  rows={4}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            <button
              type="submit"
              className="btn-cyber btn-cyber-edit"
              disabled={submitting}
            >
              {submitting ? "Saving…" : "✏️ Save Changes"}
            </button>
            <button
              type="button"
              className="btn-cyber btn-cyber-secondary"
              onClick={() => navigate(`/products/${id}`)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
