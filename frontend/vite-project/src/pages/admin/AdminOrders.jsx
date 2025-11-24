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

            {orders.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
                    <h3>No orders found</h3>
                    <p>Orders will appear here once customers start purchasing.</p>
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
                            {orders.map((order) => (
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
