import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./nav.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Collections" },
];

const MainNav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="main-nav">
      {/* Brand Logo + Name */}
      <Link to="/" className="nav-brand" style={{ textDecoration: "none", color: "inherit" }}>
        <span className="brand-mark">🪞</span>
        <div>
          <strong>ARIHANT JWELLERS</strong>
          <p>Decor & Lifestyle</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path}>
            {link.label}
          </Link>
        ))}

        {/* Admin Link - Only for Admin Users */}
        {user?.isAdmin && (
          <Link to="/admin" style={{ color: "#4CAF50", fontWeight: "600" }}>
            Admin
          </Link>
        )}

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span>Hi, {user.name.split(" ")[0]}</span>
            <button
              onClick={logout}
              style={{ background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default MainNav;