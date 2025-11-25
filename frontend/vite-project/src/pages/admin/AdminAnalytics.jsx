import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import "./admin.css";

const AdminAnalytics = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalProducts: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };

                // Fetch orders
                const { data: orders } = await api.get("/orders", config);

                // Fetch users
                const { data: users } = await api.get("/users", config);

                // Fetch products
                const { data: productsData } = await api.get("/products");

                // Calculate stats
                const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
                const totalOrders = orders.length;
                const totalUsers = users.length;
                const totalProducts = productsData.products?.length || 0;

                setStats({
                    totalSales,
                    totalOrders,
                    totalUsers,
                    totalProducts,
                });

                // Get recent 5 orders
                setRecentOrders(orders.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics:", error);
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchAnalytics();
        }
    }, [user]);

    if (loading) return <div>Loading analytics...</div>;

    return (
        <section className="admin-products">
            <SectionHeader title="Analytics Dashboard" subtitle="Admin Panel" />

            {/* Stats Cards */}
            <div className="cards-row" style={{ marginTop: "2rem" }}>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>💰 Total Sales</h3>
                    <p className="price-tag">${stats.totalSales.toFixed(2)}</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>📋 Total Orders</h3>
                    <p className="price-tag">{stats.totalOrders}</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>👥 Total Users</h3>
                    <p className="price-tag">{stats.totalUsers}</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>📦 Total Products</h3>
                    <p className="price-tag">{stats.totalProducts}</p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="panel" style={{ marginTop: "2.5rem" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>Recent Orders</h3>
                {recentOrders.length === 0 ? (
                    <p className="muted" style={{ textAlign: "center", padding: "2rem" }}>
                        No orders yet
                    </p>
                ) : (
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td><strong>#{order._id.slice(-6)}</strong></td>
                                    <td>{order.user?.name || "N/A"}</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        {order.isDelivered ? (
                                            <span className="pill pill--success">Delivered</span>
                                        ) : (
                                            <span className="pill pill--warning">Pending</span>
                                        )}
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Quick Stats */}
            <div className="cards-row" style={{ marginTop: "2rem" }}>
                <div className="panel" style={{ flex: 1 }}>
                    <h4>Average Order Value</h4>
                    <p className="price-tag" style={{ fontSize: "1.5rem" }}>
                        ${stats.totalOrders > 0 ? (stats.totalSales / stats.totalOrders).toFixed(2) : "0.00"}
                    </p>
                </div>
                <div className="panel" style={{ flex: 1 }}>
                    <h4>Orders Per User</h4>
                    <p className="price-tag" style={{ fontSize: "1.5rem" }}>
                        {stats.totalUsers > 0 ? (stats.totalOrders / stats.totalUsers).toFixed(1) : "0"}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AdminAnalytics;
