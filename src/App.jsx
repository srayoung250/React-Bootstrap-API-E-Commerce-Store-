import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <main className="main-content grid-bg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route
                path="/add-product"
                element={
                  <PrivateRoute>
                    <AddProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-product/:id"
                element={
                  <PrivateRoute>
                    <EditProduct />
                  </PrivateRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <OrderHistory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <PrivateRoute>
                    <OrderDetail />
                  </PrivateRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
