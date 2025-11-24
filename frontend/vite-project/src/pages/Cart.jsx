import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import SectionHeader from "../components/others/SectionHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Badge from "../components/others/Badge";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, coupon, applyCoupon, removeCoupon } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.15;

  let discountAmount = 0;
  if (coupon) {
    discountAmount = (subtotal * coupon.discount) / 100;
  }

  const total = subtotal + shipping + tax - discountAmount;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await api.post("/coupons/validate", { code: couponCode }, config);
      applyCoupon(data);
      setCouponError("");
      setCouponCode("");
    } catch (error) {
      setCouponError(error.response?.data?.message || "Invalid coupon");
      removeCoupon();
    }
  };

  const checkoutHandler = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
      return;
    }

    if (!user.address || !user.phoneVerified) {
      const missing = [];
      if (!user.address) missing.push("Address");
      if (!user.phoneVerified) missing.push("Phone Verification");

      alert(`Please complete your profile to proceed. Missing: ${missing.join(" & ")}`);
      navigate("/dashboard", { state: { from: "cart" } });
      return;
    }

    navigate("/checkout");
  };

  return (
    <section id="cart" className="page-section">
      <SectionHeader
        title="Cart overview"
        subtitle="Cart"
        action={<Badge tone="info">{cartItems.length} items</Badge>}
      />

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h3>Your cart is empty</h3>
          <Link to="/shop">
            <PrimaryButton variant="outline">Go Shopping</PrimaryButton>
          </Link>
        </div>
      ) : (
        <div className="two-column">
          <div className="panel">
            <ul className="list">
              {cartItems.map((item) => (
                <li key={item.product} className="list-item">
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <button
                          onClick={() => updateQuantity(item.product, item.qty - 1)}
                          disabled={item.qty <= 1}
                          style={{
                            padding: "0.25rem 0.5rem",
                            cursor: item.qty <= 1 ? "not-allowed" : "pointer",
                            border: "1px solid #ddd",
                            background: "#fff",
                            borderRadius: "4px"
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.product, item.qty + 1)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            background: "#fff",
                            borderRadius: "4px"
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span>${item.price * item.qty}</span>
                    <button
                      onClick={() => removeFromCart(item.product)}
                      style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "0.8rem" }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel section-grid">
            <div className="list-item">
              <span className="muted">Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="list-item">
              <span className="muted">Shipping</span>
              <strong>${shipping.toFixed(2)}</strong>
            </div>
            <div className="list-item">
              <span className="muted">Estimated Tax (15%)</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>

            {/* Coupon Section */}
            <div style={{ padding: "1rem 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
              {coupon ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "green" }}>
                  <span>Coupon ({coupon.code}) applied!</span>
                  <button onClick={removeCoupon} style={{ background: "none", border: "none", color: "red", cursor: "pointer", textDecoration: "underline" }}>Remove</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{ flex: 1, padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px" }}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      style={{ padding: "0.5rem 1rem", background: "#333", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.5rem" }}>{couponError}</p>}
                </div>
              )}
            </div>

            {coupon && (
              <div className="list-item" style={{ color: "green" }}>
                <span>Discount ({coupon.discount}%)</span>
                <strong>-${discountAmount.toFixed(2)}</strong>
              </div>
            )}

            <div className="list-item">
              <span className="muted">Order Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <PrimaryButton onClick={checkoutHandler}>Proceed to Checkout</PrimaryButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
