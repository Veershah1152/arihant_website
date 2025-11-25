import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import "./nav.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Collection" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const MainNav = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="main-nav">
      {/* Brand Logo + Name */}
      <Link to="/" className="nav-brand">
        <span className="brand-mark">🪞</span>
        <div>
          <strong>ARIHANT JWELLERS</strong>
          <p>Decor & Lifestyle</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path}>
            {link.label}
          </Link>
        ))}

        <Link to="/cart" className="cart-link">
          Cart {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
        </Link>

        {/* Admin Link - Only for Admin Users */}
        {user?.isAdmin && (
          <Link to="/admin" className="admin-link">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <Link to="/Dashboard">Profile</Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default MainNav;