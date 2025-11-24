import SectionHeader from "../../components/others/SectionHeader";
import "./admin.css";

const AdminAnalytics = () => {
    return (
        <section className="admin-products">
            <SectionHeader title="Analytics" subtitle="Admin Panel" />

            <div className="cards-row" style={{ marginTop: "2rem" }}>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>Total Sales</h3>
                    <p className="price-tag">$0.00</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>Total Orders</h3>
                    <p className="price-tag">0</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>Total Users</h3>
                    <p className="price-tag">--</p>
                </div>
            </div>

            <div style={{ marginTop: "2rem", padding: "2rem", textAlign: "center", color: "#666", border: "1px dashed #ccc", borderRadius: "8px" }}>
                <h3>Charts Coming Soon</h3>
                <p>Visual analytics will be available after order data is collected.</p>
            </div>
        </section>
    );
};

export default AdminAnalytics;
