import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CATEGORIES = [
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
];

const empty = {
  title: "",
  price: "",
  description: "",
  category: CATEGORIES[0],
};

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [apiError, setApiError] = useState(null);

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
      const res = await axios.post("https://fakestoreapi.com/products", {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        image: "https://fakestoreapi.com/img/placeholder.jpg",
      });
      setSuccess(
        `Product "${res.data.title || form.title}" created successfully! (ID: ${res.data.id})`,
      );
      setForm(empty);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      className="py-4"
      style={{ position: "relative", zIndex: 1, maxWidth: 680 }}
    >
      <div className="page-header">
        <h1 className="page-title gradient-text">Add Product</h1>
        <div className="page-divider" />
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: ".85rem",
            marginTop: 10,
          }}
        >
          Create a new product via FakeStoreAPI POST request
        </p>
      </div>

      {success && (
        <div className="cyber-alert cyber-alert-success">
          ✅ {success}
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <button
              className="btn-cyber btn-cyber-primary"
              style={{ fontSize: ".65rem", padding: "6px 14px" }}
              onClick={() => navigate("/products")}
            >
              View Products
            </button>
            <button
              className="btn-cyber btn-cyber-secondary"
              style={{ fontSize: ".65rem", padding: "6px 14px" }}
              onClick={() => setSuccess(null)}
            >
              Add Another
            </button>
          </div>
        </div>
      )}

      {apiError && (
        <div className="cyber-alert cyber-alert-error">❌ {apiError}</div>
      )}

      {!success && (
        <div className="glass-card p-4">
          <Form onSubmit={handleSubmit} noValidate>
            <Row className="gy-3">
              {/* Title */}
              <Col xs={12}>
                <Form.Group>
                  <label className="cyber-label">Product Title</label>
                  <Form.Control
                    className="cyber-input"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Ultra-Light Wireless Earbuds"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Price + Category */}
              <Col sm={6}>
                <Form.Group>
                  <label className="cyber-label">Price ($)</label>
                  <Form.Control
                    className="cyber-input"
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
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

              {/* Description */}
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
                    placeholder="Describe the product..."
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
                className="btn-cyber btn-cyber-primary"
                disabled={submitting}
              >
                {submitting ? "Creating…" : "+ Create Product"}
              </button>
              <button
                type="button"
                className="btn-cyber btn-cyber-secondary"
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      )}
    </Container>
  );
}
