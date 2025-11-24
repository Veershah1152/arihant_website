import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import SectionHeader from "../components/others/SectionHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Badge from "../components/others/Badge";

const Checkout = () => {
  const { cartItems, clearCart, coupon } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState(""); // Will map to District
  const [country, setCountry] = useState(""); // Will map to State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullAddressString, setFullAddressString] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await api.get("/users/profile", config);

          setPhoneNumber(data.phoneNumber || "");
          setFullAddressString(data.address || "");

          if (data.address) {
            const parts = data.address.split(", ");
            if (parts.length >= 3) {
              // Format: "Address, District, State"
              const state = parts[parts.length - 1];
              const district = parts[parts.length - 2];
              const addr = parts.slice(0, parts.length - 2).join(", ");

              setAddress(addr);
              setCity(district);
              setCountry(state);
            } else {
              setAddress(data.address);
              setCity("N/A");
              setCountry("N/A");
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  let discountAmount = 0;
  if (coupon) {
    discountAmount = (itemsPrice * coupon.discount) / 100;
  }

  const totalPrice = itemsPrice + shippingPrice + taxPrice - discountAmount;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login?redirect=/checkout");
      return;
    }

    if (!fullAddressString || !phoneNumber) {
      alert("Please complete your profile (Address and Phone) in the Dashboard before placing an order.");
      navigate("/dashboard");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems,
        shippingAddress: {
          address: address,
          city: city || "N/A",
          postalCode: "000000", // Dummy postal code as it's not in profile but required by backend
          country: country || "N/A",
        },
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        couponCode: coupon ? coupon.code : null,
        discountAmount,
      };

      const { data } = await api.post("/orders", orderData, config);

      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (error) {
      console.error("Order failed", error);
      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="page-section">
        <SectionHeader title="Checkout" subtitle="Cart is empty" />
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <PrimaryButton onClick={() => navigate("/shop")}>Go Shopping</PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="page-section">
      <SectionHeader title="Finalize your order" subtitle="Checkout" />

      <div className="two-column">
        {/* Shipping & Payment Info (Read Only) */}
        <div className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}>
            <h3>Shipping Details</h3>
            <Link to="/dashboard" style={{ fontSize: "0.9rem", color: "var(--color-primary)", textDecoration: "underline" }}>Change</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <p className="muted" style={{ marginBottom: "0.25rem" }}>Deliver To:</p>
              {fullAddressString ? (
                <div style={{ fontSize: "1.1rem", fontWeight: "500" }}>{fullAddressString}</div>
              ) : (
                <div style={{ color: "red" }}>Address missing. Please update in Dashboard.</div>
              )}
            </div>

            <div>
              <p className="muted" style={{ marginBottom: "0.25rem" }}>Phone Number:</p>
              {phoneNumber ? (
                <div style={{ fontSize: "1.1rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {phoneNumber}
                  <Badge tone="success">Verified</Badge>
                </div>
              ) : (
                <div style={{ color: "red" }}>Phone number missing. Please update in Dashboard.</div>
              )}
            </div>
          </div>

          <h3 style={{ marginTop: "2.5rem", marginBottom: "1rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}>Payment Method</h3>
          <form id="checkout-form" onSubmit={submitHandler}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", cursor: "pointer", background: paymentMethod === "Razorpay" ? "rgba(139, 94, 60, 0.05)" : "transparent", borderColor: paymentMethod === "Razorpay" ? "var(--color-primary)" : "var(--color-border)" }}>
                <input
                  type="radio"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: "auto" }}
                />
                <span style={{ fontWeight: "bold" }}>Online Payment (Razorpay)</span>
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="panel section-grid" style={{ height: "fit-content" }}>
          <h3 style={{ marginBottom: "1rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}>Order Summary</h3>

          <div className="checkout-items" style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
                <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "500", fontSize: "0.95rem" }}>{item.name}</div>
                  <div className="muted" style={{ fontSize: "0.85rem" }}>{item.qty} x ${item.price}</div>
                </div>
                <div style={{ fontWeight: "600" }}>${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div className="list-item">
              <span className="muted">Items</span>
              <strong>${itemsPrice.toFixed(2)}</strong>
            </div>
            <div className="list-item">
              <span className="muted">Shipping</span>
              <strong>${shippingPrice.toFixed(2)}</strong>
            </div>
            <div className="list-item">
              <span className="muted">Tax</span>
              <strong>${taxPrice.toFixed(2)}</strong>
            </div>
            {coupon && (
              <div className="list-item" style={{ color: "var(--color-success, green)" }}>
                <span>Discount ({coupon.code})</span>
                <strong>-${discountAmount.toFixed(2)}</strong>
              </div>
            )}
            <div className="list-item" style={{ fontSize: "1.2rem", borderTop: "2px solid var(--color-border)", paddingTop: "1rem", marginTop: "0.5rem" }}>
              <span>Total</span>
              <strong className="price-tag">${totalPrice.toFixed(2)}</strong>
            </div>
          </div>

          <PrimaryButton
            type="submit"
            form="checkout-form"
            disabled={loading || !fullAddressString || !phoneNumber}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {loading ? "Processing..." : "Place Order"}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
