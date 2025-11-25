import { useState, useEffect, useContext } from "react";
import SectionHeader from "../../components/others/SectionHeader";
import Badge from "../../components/others/Badge";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import AuthContext from "../../context/AuthContext";
import api from "../../utils/api";
import "./admin.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all"); // all, pending, delivered
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.get("/orders", config);
            setOrders(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err.response?.data?.message || "Failed to fetch orders");
            setLoading(false);
        }
    };

    const handleMarkDelivered = async (orderId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await api.put(`/orders/${orderId}/deliver`, {}, config);
            fetchOrders(); // Refresh orders
        } catch (err) {
            console.error("Error updating order:", err);
            alert(err.response?.data?.message || "Failed to update order");
        }
    };

    const toggleExpandRow = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    // Filter orders based on status and search
    const filteredOrders = orders.filter(order => {
        // Filter by status
        if (filterStatus === "pending" && order.isDelivered) return false;
        if (filterStatus === "delivered" && !order.isDelivered) return false;

        // Filter by search term
        if (searchTerm.trim() !== "") {
            const search = searchTerm.toLowerCase();
            return (
                order._id.toLowerCase().includes(search) ||
                order.user?.name?.toLowerCase().includes(search) ||
                order.user?.email?.toLowerCase().includes(search)
            );
        }

        return true;
    });

    // Calculate statistics
    const stats = {
        total: orders.length,
        pending: orders.filter(o => !o.isDelivered).length,
        delivered: orders.filter(o => o.isDelivered).length,
        totalRevenue: orders.reduce((sum, o) => sum + o.totalPrice, 0)
    };

    if (loading) {
        return (
            <section className="admin-products">
                <SectionHeader title="Manage Orders" subtitle="Admin Panel" />
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <p>Loading orders...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="admin-products">
                <SectionHeader title="Manage Orders" subtitle="Admin Panel" />
                <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="admin-products">
            <SectionHeader title="Manage Orders" subtitle="Admin Panel" />

            {/* Statistics Cards */}
            <div className="cards-row" style={{ marginBottom: "2rem" }}>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>📦 Total Orders</h3>
                    <p className="price-tag">{stats.total}</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>⏳ Pending</h3>
                    <p className="price-tag" style={{ color: "#f59e0b" }}>{stats.pending}</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>✅ Delivered</h3>
                    <p className="price-tag" style={{ color: "#10b981" }}>{stats.delivered}</p>
                </div>
                <div className="panel" style={{ flex: 1, textAlign: "center" }}>
                    <h3>💰 Total Revenue</h3>
                    <p className="price-tag">${stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="panel" style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                    {/* Search */}
                    <div style={{ flex: "1 1 300px" }}>
                        <label>
                            Search Orders
                            <input
                                type="text"
                                placeholder="Search by Order ID, customer name, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ marginTop: "0.5rem" }}
                            />
                        </label>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                            onClick={() => setFilterStatus("all")}
                            style={{
                                padding: "0.75rem 1.5rem",
                                background: filterStatus === "all" ? "var(--color-primary)" : "transparent",
                                color: filterStatus === "all" ? "#fff" : "var(--color-text)",
                                border: `2px solid ${filterStatus === "all" ? "var(--color-primary)" : "var(--color-border)"}`,
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: filterStatus === "all" ? "600" : "400",
                                transition: "all 0.2s"
                            }}
                        >
                            All ({stats.total})
                        </button>
                        <button
                            onClick={() => setFilterStatus("pending")}
                            style={{
                                padding: "0.75rem 1.5rem",
                                background: filterStatus === "pending" ? "#f59e0b" : "transparent",
                                color: filterStatus === "pending" ? "#fff" : "var(--color-text)",
                                border: `2px solid ${filterStatus === "pending" ? "#f59e0b" : "var(--color-border)"}`,
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: filterStatus === "pending" ? "600" : "400",
                                transition: "all 0.2s"
                            }}
                        >
                            ⏳ Pending ({stats.pending})
                        </button>
                        <button
                            onClick={() => setFilterStatus("delivered")}
                            style={{
                                padding: "0.75rem 1.5rem",
                                background: filterStatus === "delivered" ? "#10b981" : "transparent",
                                color: filterStatus === "delivered" ? "#fff" : "var(--color-text)",
                                border: `2px solid ${filterStatus === "delivered" ? "#10b981" : "var(--color-border)"}`,
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: filterStatus === "delivered" ? "600" : "400",
                                transition: "all 0.2s"
                            }}
                        >
                            ✅ Delivered ({stats.delivered})
                        </button>
                    </div>
                </div>

                <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                    Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
                <div className="panel" style={{ padding: "3rem", textAlign: "center" }}>
                    <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</p>
                    <h3>No orders found</h3>
                    <p className="muted">
                        {searchTerm ? "Try adjusting your search" : "Orders will appear here once customers start purchasing."}
                    </p>
                </div>
            ) : (
                <div className="panel" style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                                <th style={{ padding: "1rem", textAlign: "left" }}>Order ID</th>
                                <th style={{ padding: "1rem", textAlign: "left" }}>User</th>
                                <th style={{ padding: "1rem", textAlign: "left" }}>Date</th>
                                <th style={{ padding: "1rem", textAlign: "right" }}>Total</th>
                                <th style={{ padding: "1rem", textAlign: "center" }}>Paid</th>
                                <th style={{ padding: "1rem", textAlign: "center" }}>Delivered</th>
                                <th style={{ padding: "1rem", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <>
                                    <tr
                                        key={order._id}
                                        style={{
                                            borderBottom: "1px solid var(--color-border)",
                                            cursor: "pointer",
                                            backgroundColor: expandedOrderId === order._id ? "rgba(139, 94, 60, 0.05)" : "transparent"
                                        }}
                                        onClick={() => toggleExpandRow(order._id)}
                                    >
                                        <td style={{ padding: "1rem" }}>
                                            <code style={{ fontSize: "0.85rem" }}>
                                                {order._id.substring(0, 8)}...
                                            </code>
                                        </td>
                                        <td style={{ padding: "1rem" }}>
                                            <div>
                                                <strong>{order.user?.name || "N/A"}</strong>
                                                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                                                    {order.user?.email || "N/A"}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: "1rem" }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: "1rem", textAlign: "right" }}>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </td>
                                        <td style={{ padding: "1rem", textAlign: "center" }}>
                                            {order.isPaid ? (
                                                <Badge tone="success">Paid</Badge>
                                            ) : (
                                                <Badge tone="warning">Unpaid</Badge>
                                            )}
                                        </td>
                                        <td style={{ padding: "1rem", textAlign: "center" }}>
                                            {order.isDelivered ? (
                                                <Badge tone="success">
                                                    {new Date(order.deliveredAt).toLocaleDateString()}
                                                </Badge>
                                            ) : (
                                                <Badge tone="warning">Not Delivered</Badge>
                                            )}
                                        </td>
                                        <td style={{ padding: "1rem", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                                            {!order.isDelivered && (
                                                <PrimaryButton
                                                    onClick={() => handleMarkDelivered(order._id)}
                                                    style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                                                >
                                                    Mark Delivered
                                                </PrimaryButton>
                                            )}
                                        </td>
                                    </tr>
                                    {expandedOrderId === order._id && (
                                        <tr>
                                            <td colSpan="7" style={{ padding: "1.5rem", backgroundColor: "rgba(139, 94, 60, 0.02)" }}>
                                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                                                    {/* Contact Information */}
                                                    <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
                                                        <h4 style={{ marginTop: 0, marginBottom: "1rem", color: "var(--color-primary)" }}>📞 Contact Information</h4>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                                            <div>
                                                                <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Name:</span>
                                                                <div><strong>{order.user?.name || "N/A"}</strong></div>
                                                            </div>
                                                            <div>
                                                                <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Email:</span>
                                                                <div><strong>{order.user?.email || "N/A"}</strong></div>
                                                            </div>
                                                            <div>
                                                                <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Phone:</span>
                                                                <div><strong>{order.user?.phoneNumber || "Not provided"}</strong></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Shipping Address */}
                                                    <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
                                                        <h4 style={{ marginTop: 0, marginBottom: "1rem", color: "var(--color-primary)" }}>📍 Shipping Address</h4>
                                                        <div style={{ lineHeight: "1.6" }}>
                                                            <div><strong>{order.shippingAddress?.address}</strong></div>
                                                            <div>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</div>
                                                            <div>{order.shippingAddress?.country}</div>
                                                        </div>
                                                    </div>

                                                    {/* Order Items */}
                                                    <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
                                                        <h4 style={{ marginTop: 0, marginBottom: "1rem", color: "var(--color-primary)" }}>📦 Order Items ({order.orderItems?.length || 0})</h4>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "150px", overflowY: "auto" }}>
                                                            {order.orderItems?.map((item, idx) => (
                                                                <div key={idx} style={{ fontSize: "0.9rem", paddingBottom: "0.5rem", borderBottom: "1px solid #eee" }}>
                                                                    <strong>{item.name}</strong> x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default AdminOrders;
