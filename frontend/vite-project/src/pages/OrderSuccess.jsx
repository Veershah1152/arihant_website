import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeader from "../components/others/SectionHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";

const OrderSuccess = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="page-section" style={{ textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="panel" style={{ maxWidth: "600px", width: "100%", padding: "3rem" }}>
        <div style={{ fontSize: "4rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
          ✓
        </div>
        <SectionHeader 
          title="Order Placed Successfully!" 
          subtitle={`Order #${id}`} 
        />
        
        <p className="muted" style={{ marginBottom: "2rem", fontSize: "1.1rem" }}>
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/dashboard">
            <PrimaryButton variant="outline">View Order</PrimaryButton>
          </Link>
          <Link to="/shop">
            <PrimaryButton>Continue Shopping</PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
