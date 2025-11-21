import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../others/SectionHeader";
import "./admin.css";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const adminCards = [
        { title: "Products", path: "/admin/products", icon: "📦", desc: "Manage products" },
        { title: "Banners", path: "/admin/banners", icon: "🖼️", desc: "Manage hero banners" },
        { title: "Orders", path: "/admin/orders", icon: "📋", desc: "View orders" },
        { title: "Users", path: "/admin/users", icon: "👥", desc: "Manage users" },
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
