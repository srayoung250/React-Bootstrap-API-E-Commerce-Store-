import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function NavBar() {
  const { itemCount } = useCart()

  return (
    <Navbar expand="lg" className="cyber-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <span className="brand-simple">Simple</span>
          <span className="brand-young">Young</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-1 align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end className="cyber-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="cyber-nav-link">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-product" className="cyber-nav-link">
              + Add Product
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" className="cyber-nav-link">
              <span className="cart-badge-wrap">
                🛒 Cart
                {itemCount > 0 && (
                  <span className="cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
                )}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
