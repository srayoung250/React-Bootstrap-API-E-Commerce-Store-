# SimpleYoung Store

A modern e-commerce front-end built with React, featuring a glassmorphic UI with cyberpunk-inspired colours. Powered by [FakeStoreAPI](https://fakestoreapi.com) for all product data and CRUD interactions.

---

## Features

- Browse 20 real products fetched from FakeStoreAPI
- Filter products by category
- View full product detail with star ratings
- Add, edit, and delete products (mock API — responses confirm but do not persist)
- Shopping cart with add, subtract, remove, and clear controls
- Cart item count badge in the navbar
- Click any cart item to jump to its product detail page
- Fully responsive on desktop and mobile
- Loading spinners and user-friendly error messages throughout

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP requests |
| [React Bootstrap](https://react-bootstrap.netlify.app) | Layout & form components |
| [Bootstrap 5](https://getbootstrap.com) | Base CSS utilities |
| [Google Fonts — Orbitron & Inter](https://fonts.google.com) | Typography |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd simpleyoung-store

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, feature highlights, and CTA |
| `/products` | Product Listing | Grid of all products with category filters |
| `/products/:id` | Product Detail | Full detail view with edit/delete/cart actions |
| `/add-product` | Add Product | Form to POST a new product |
| `/edit-product/:id` | Edit Product | Pre-filled form to PUT an existing product |
| `/cart` | Cart | Cart items with quantity controls and order summary |

---

## Project Structure

```
src/
├── context/
│   └── CartContext.jsx      # Global cart state (add, remove, update qty, clear)
├── components/
│   ├── NavBar.jsx           # Fixed glass navbar with live cart badge
│   ├── ProductCard.jsx      # Reusable product card with add-to-cart
│   ├── LoadingSpinner.jsx   # Cyberpunk dual-colour spinner
│   └── DeleteModal.jsx      # Confirmation modal before deletion
├── pages/
│   ├── Home.jsx             # Landing page with hero and features
│   ├── Products.jsx         # Fetches and displays all products
│   ├── ProductDetail.jsx    # Single product view (GET /products/:id)
│   ├── AddProduct.jsx       # Create form (POST /products)
│   ├── EditProduct.jsx      # Edit form (PUT /products/:id)
│   └── Cart.jsx             # Shopping cart page
├── App.jsx                  # Router + CartProvider setup
├── App.css                  # All custom styles (cyberpunk glass theme)
└── main.jsx                 # React root + Bootstrap import
```

---

## API Reference

All data comes from **[FakeStoreAPI](https://fakestoreapi.com)** — a free mock REST API.

| Action | Method | Endpoint |
|---|---|---|
| Get all products | `GET` | `/products` |
| Get single product | `GET` | `/products/:id` |
| Create product | `POST` | `/products` |
| Update product | `PUT` | `/products/:id` |
| Delete product | `DELETE` | `/products/:id` |

> **Note:** FakeStoreAPI is a testing/learning API. POST, PUT, and DELETE requests return successful responses, but no data is actually changed or saved. This is expected behaviour.

---

## Design System

The UI uses a **glassmorphic + cyberpunk** visual language:

- **Background** — light white-to-lavender gradient with a subtle cyan grid overlay
- **Cards** — `backdrop-filter: blur(18px)` frosted glass with semi-transparent white fill
- **Colours** — Neon cyan `#00E5FF` · Hot pink `#FF1493` · Purple `#9C27FF`
- **Typography** — Orbitron (headings/labels) · Inter (body text)
- **Buttons** — Gradient fills and neon `box-shadow` glow on hover

---

## License

This project was built for educational purposes as part of a front-end module assessment.
