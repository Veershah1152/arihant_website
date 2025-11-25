import { Link } from "react-router-dom";
import "./footer.css";

const footerLinks = [
  { title: "Shop", items: ["New Arrivals", "Best Sellers", "Gift Cards"] },
  { title: "Support", items: ["Help Center", "Shipping", "Returns"] },
  { title: "Company", items: ["About", "Careers"] },
];

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <strong>Arihant Jewellers</strong>
        <p className="muted">Exquisite jewellery with transparency and trust.</p>
      </div>

      <div className="footer-links">
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="footer-title">{group.title}</p>
            {group.items.map((item) => {
              if (item === "About") return <Link key={item} to="/about">{item}</Link>;
              if (["New Arrivals", "Best Sellers", "Gift Cards"].includes(item)) return <Link key={item} to="/">{item}</Link>;
              if (["Help Center", "Shipping", "Returns"].includes(item)) return <Link key={item} to="/about">{item}</Link>;

              return (
                <a key={item} href="#">
                  {item}
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>

    <div className="footer-legal">
      <p className="muted" style={{ fontSize: "0.9rem", marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
        © {new Date().getFullYear()} Arihant Jewellers. All rights reserved. Based in Nashik, Maharashtra.
        By using our site, you agree to our <Link to="/legal">Terms & Conditions</Link>, <Link to="/legal">Privacy Policy</Link>, and <Link to="/legal">Shipping & Refund Policies</Link>.
        For support, contact us at <a href="mailto:arihantsilver@gmail.com">arihantsilver@gmail.com</a>.
      </p>

      {/* Developer Credit */}
      <p className="muted" style={{
        fontSize: "0.85rem",
        marginTop: "1rem",
        paddingTop: "0.75rem",
        borderTop: "1px solid rgba(139, 94, 60, 0.1)",
        textAlign: "center",
        opacity: 0.85
      }}>
        Website developed by <strong style={{ color: "var(--color-primary)" }}>Veer Shah</strong> •
        <a href="tel:9527761897" style={{ marginLeft: "0.5rem", color: "inherit", textDecoration: "none" }}>
          📞 9527761897
        </a>
      </p>
    </div>
  </footer>
);

export default SiteFooter;
