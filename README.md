# SimpleYoung Store

A modern e-commerce front-end built with React, featuring a glassmorphic UI with cyberpunk-inspired colours. Backed end-to-end by **Firebase** — Authentication for user accounts, Firestore for products/users/orders, and route protection to keep sensitive pages behind a login.

**Live demo:** [TODO — paste your Vercel production URL here](https://your-app.vercel.app)

---

## Features

- **Authentication** — register, login, and logout with Firebase Auth; a matching `users` document is created in Firestore on signup
- **Route protection** — `/add-product`, `/edit-product/:id`, `/profile`, and `/orders*` redirect to `/login` when signed out
- **Product catalog** — all product data lives in Firestore; browse, filter by category, and view full product detail with star ratings
- **Product CRUD** — create, edit, and delete products, with a confirmation modal before deletion
- **Shopping cart** — add, subtract, remove, and clear controls, with a live cart item count badge in the navbar
- **Checkout & orders** — placing an order writes it to Firestore; view past orders in Order History and drill into an Order Detail page
- **Profile management** — edit name/address, and permanently delete your account (removes both the Firestore user doc and the Firebase Auth account)
- Fully responsive on desktop and mobile
- Loading spinners and user-friendly error messages throughout

---

## Tech Stack

| Tool                                                        | Purpose                          |
| ----------------------------------------------------------- | --------------------------------- |
| [React 18](https://react.dev)                               | UI framework                      |
| [Vite](https://vitejs.dev)                                  | Build tool & dev server           |
| [React Router v6](https://reactrouter.com)                  | Client-side routing & route guards|
| [Firebase Authentication](https://firebase.google.com/docs/auth) | User registration/login/logout |
| [Cloud Firestore](https://firebase.google.com/docs/firestore)    | Products, users, and orders data |
| [React Bootstrap](https://react-bootstrap.netlify.app)      | Layout & form components          |
| [Bootstrap 5](https://getbootstrap.com)                     | Base CSS utilities                |
| [Google Fonts — Orbitron & Inter](https://fonts.google.com) | Typography                        |

---

## Pages & Routes

| Route               | Page            | Auth required | Description                                          |
| ------------------- | --------------- | :-----------: | ----------------------------------------------------- |
| `/`                 | Home            |               | Hero section, feature highlights, and CTA              |
| `/products`         | Product Listing |               | Grid of all products with category filters             |
| `/products/:id`     | Product Detail  |               | Full detail view with edit/delete/cart actions          |
| `/add-product`      | Add Product     | ✅            | Form to create a new product in Firestore               |
| `/edit-product/:id` | Edit Product    | ✅            | Pre-filled form to update a product in Firestore         |
| `/cart`             | Cart            |               | Cart items with quantity controls and order summary      |
| `/orders`           | Order History   | ✅            | List of the current user's past orders                   |
| `/orders/:id`       | Order Detail    | ✅            | Full detail view of a single order                        |
| `/register`         | Register        |               | Create a new account                                       |
| `/login`            | Login           |               | Sign in to an existing account                              |
| `/profile`          | Profile         | ✅            | Edit name/address, view orders, delete account                |

---

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx      # Firebase Auth state, register/login/logout
│   └── CartContext.jsx      # Global cart state (add, remove, update qty, clear)
├── components/
│   ├── NavBar.jsx           # Fixed glass navbar with auth links + live cart badge
│   ├── PrivateRoute.jsx     # Route guard — redirects to /login when signed out
│   ├── ProductCard.jsx      # Reusable product card with add-to-cart
│   ├── LoadingSpinner.jsx   # Cyberpunk dual-colour spinner
│   └── DeleteModal.jsx      # Confirmation modal before deletion
├── pages/
│   ├── Home.jsx             # Landing page with hero and features
│   ├── Products.jsx         # Fetches and displays all products from Firestore
│   ├── ProductDetail.jsx    # Single product view
│   ├── AddProduct.jsx       # Create form (protected)
│   ├── EditProduct.jsx      # Edit form (protected)
│   ├── Cart.jsx             # Shopping cart page
│   ├── Register.jsx         # Firebase Auth registration
│   ├── Login.jsx            # Firebase Auth login
│   ├── Profile.jsx          # Profile edit + account deletion (protected)
│   ├── OrderHistory.jsx     # Past orders for the current user (protected)
│   └── OrderDetail.jsx      # Single order detail (protected)
├── firebase.js               # Firebase app/auth/Firestore initialization
├── api.js                    # Firestore data access helpers
├── App.jsx                  # Router, route guards, and provider setup
├── App.css                  # All custom styles (cyberpunk glass theme)
└── main.jsx                 # React root + Bootstrap import
```

---

## Firestore Data Model

| Collection | Document shape                                              |
| ---------- | ------------------------------------------------------------ |
| `users`    | `{ email, name, address, createdAt }` — keyed by Firebase Auth UID |
| `products` | Product fields (title, price, category, image, description, etc.) |
| `orders`   | Order items, total, and the owning user's UID                |

---

## Testing

Tests are written with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/react).

```bash
npm test          # run the full suite once (used in CI)
npm run test:watch  # watch mode for local development
```

Coverage includes:

- **Unit — `LoadingSpinner.test.jsx`**: renders default vs. custom text.
- **Unit — `ProductCard.test.jsx`**: renders product data and confirms the add-to-cart button calls `addToCart` and flips to a confirmation state.
- **Integration — `Cart.integration.test.jsx`**: renders `ProductCard` and `Cart` together under a real `CartProvider`, clicks "Add to cart", and asserts the Cart page updates (item appears, item count, totals).

---

## CI/CD Pipeline

Defined in [`.github/workflows/main.yml`](.github/workflows/main.yml), triggered on every push/PR to `main`:

1. **CI — Build & Test**: installs dependencies, runs `npm test`, then `npm run build`. A failing test blocks the pipeline.
2. **CD — Deploy**: only runs after CI passes, and only on a push to `main`. Uses the Vercel CLI to build and deploy to production.

Required GitHub Actions secrets (Settings → Secrets and variables → Actions):

| Secret | Purpose |
| --- | --- |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | Firebase config, needed at build time |
| `VERCEL_TOKEN` | Auth token for Vercel CLI deploys |
| `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Identify which Vercel project to deploy to |

---

## Design System

The UI uses a **glassmorphic + cyberpunk** visual language:

- **Background** — light white-to-lavender gradient with a subtle cyan grid overlay
- **Cards** — `backdrop-filter: blur(18px)` frosted glass with semi-transparent white fill
- **Colours** — Neon cyan `#00E5FF` · Hot pink `#FF1493` · Purple `#9C27FF`
- **Typography** — Orbitron (headings/labels) · Inter (body text)
- **Buttons** — Gradient fills and neon `box-shadow` glow on hover

---
