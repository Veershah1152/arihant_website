import "./footer.css";

const footerLinks = [
  { title: "Shop", items: ["New Arrivals", "Best Sellers", "Gift Cards"] },
  { title: "Support", items: ["Help Center", "Shipping", "Returns"] },
  { title: "Company", items: ["About", "Careers", "Press"] },
];

const SiteFooter = () => (
  <footer className="site-footer">
    <div>
      <strong>NovaCommerce</strong>
      <p className="muted">Static UI built with React + Vite</p>
    </div>
    <div className="footer-links">
      {footerLinks.map((group) => (
        <div key={group.title}>
          <p className="footer-title">{group.title}</p>
          {group.items.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>
      ))}
    </div>
    <p className="muted">© {new Date().getFullYear()} NovaCommerce Concepts</p>
  </footer>
);

export default SiteFooter;

