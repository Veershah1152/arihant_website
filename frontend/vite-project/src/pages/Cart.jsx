import SectionHeader from "../components/others/SectionHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Badge from "../components/others/Badge";

const cartItems = [
  { name: "Aurora Headset", qty: 1, price: 199 },
  { name: "Atlas Backpack", qty: 2, price: 189 },
  { name: "Nimbus Throw", qty: 1, price: 89 },
];

const Cart = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <section id="cart" className="page-section">
      <SectionHeader
        title="Cart overview"
        subtitle="Cart"
        action={<Badge tone="info">3 items</Badge>}
      />

      <div className="two-column">
        <div className="panel">
          <ul className="list">
            {cartItems.map((item) => (
              <li key={item.name} className="list-item">
                <div>
                  <strong>{item.name}</strong>
                  <p className="muted">Quantity: {item.qty}</p>
                </div>
                <span>${item.price * item.qty}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel section-grid">
          <div className="list-item">
            <span className="muted">Subtotal</span>
            <strong>${subtotal}</strong>
          </div>
          <div className="list-item">
            <span className="muted">Shipping</span>
            <strong>$24</strong>
          </div>
          <div className="list-item">
            <span className="muted">Estimated Tax</span>
            <strong>$58</strong>
          </div>
          <div className="list-item">
            <span className="muted">Order Total</span>
            <strong>${subtotal + 24 + 58}</strong>
          </div>
          <PrimaryButton>Proceed to Checkout</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Cart;

