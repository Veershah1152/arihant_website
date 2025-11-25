import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import "./admin.css";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const adminCards = [
        { title: "Products", path: "/admin/products", icon: "📦", desc: "Manage products" },
        { title: "Banners", path: "/admin/banners", icon: "🖼️", desc: "Manage hero banners" },
        { title: "Collections", path: "/admin/collections", icon: "🎨", desc: "Manage homepage collections" },
        { title: "Analytics", path: "/admin/analytics", icon: "📊", desc: "View site stats" },
        { title: "Orders", path: "/admin/orders", icon: "📋", desc: "View orders" },
        { title: "Users", path: "/admin/users", icon: "👥", desc: "Manage users" },
        { title: "Reviews", path: "/admin/reviews", icon: "⭐", desc: "View product reviews" },
        { title: "Coupons", path: "/admin/coupons", icon: "🎟️", desc: "Manage discounts" },
    ];

    return (
        <section className="admin-dashboard">
            <SectionHeader
                title={`Welcome, ${user?.name}`}
                subtitle="Admin Dashboard"
            />

            <div className="admin-grid">
                {adminCards.map((card) => (
                    <Link key={card.path} to={card.path} className="admin-card">
                        <div className="admin-card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default AdminDashboard;
