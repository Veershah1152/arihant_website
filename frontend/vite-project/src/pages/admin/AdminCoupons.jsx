import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import "./admin.css";

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // Form State
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [minPurchaseAmount, setMinPurchaseAmount] = useState("");
    const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
    const [usageLimit, setUsageLimit] = useState("");
    const [userUsageLimit, setUserUsageLimit] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const { data } = await api.get("/coupons", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setCoupons(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching coupons:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await api.post("/coupons", {
                code,
                discount: Number(discount),
                expirationDate,
                minPurchaseAmount: minPurchaseAmount ? Number(minPurchaseAmount) : 0,
                maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
                usageLimit: usageLimit ? Number(usageLimit) : null,
                userUsageLimit: userUsageLimit ? Number(userUsageLimit) : null
            }, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setCreating(false);
            setCode("");
            setDiscount("");
            setExpirationDate("");
            setMinPurchaseAmount("");
            setMaxDiscountAmount("");
            setUsageLimit("");
            setUserUsageLimit("");
            fetchCoupons();
            alert("Coupon created successfully!");
        } catch (error) {
            console.error("Error creating coupon:", error);
            setCreating(false);
            alert(error.response?.data?.message || "Failed to create coupon");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this coupon?")) return;

        try {
            await api.delete(`/coupons/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchCoupons();
        } catch (error) {
            console.error("Error deleting coupon:", error);
            alert("Failed to delete coupon");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin-products">
            <SectionHeader title="Manage Coupons" subtitle="Admin Panel" />

            {/* Add Coupon Form */}
            <div className="panel" style={{ marginBottom: "2.5rem", maxWidth: "600px" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>Create New Coupon</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <label>
                        Coupon Code
                        <input
                            type="text"
                            placeholder="e.g. SUMMER20"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            required
                        />
                    </label>
                    <label>
                        Discount Percentage (%)
                        <input
                            type="number"
                            placeholder="e.g. 20"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            min="1"
                            max="100"
                            required
                        />
                    </label>
                    <label>
                        Expiration Date
                        <input
                            type="date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Minimum Purchase Amount ($)
                        <input
                            type="number"
                            placeholder="e.g. 100 (optional)"
                            value={minPurchaseAmount}
                            onChange={(e) => setMinPurchaseAmount(e.target.value)}
                            min="0"
                        />
                    </label>
                    <label>
                        Maximum Discount Amount ($)
                        <input
                            type="number"
                            placeholder="e.g. 50 (optional)"
                            value={maxDiscountAmount}
                            onChange={(e) => setMaxDiscountAmount(e.target.value)}
                            min="0"
                        />
                    </label>
                    <label>
                        Total Usage Limit
                        <input
                            type="number"
                            placeholder="e.g. 100 (optional)"
                            value={usageLimit}
                            onChange={(e) => setUsageLimit(e.target.value)}
                            min="1"
                        />
                    </label>
                    <label>
                        Per User Usage Limit
                        <input
                            type="number"
                            placeholder="e.g. 1 (optional)"
                            value={userUsageLimit}
                            onChange={(e) => setUserUsageLimit(e.target.value)}
                            min="1"
                        />
                    </label>
                    <div style={{ marginTop: "0.5rem" }}>
                        <PrimaryButton disabled={creating}>
                            {creating ? "Creating..." : "Create Coupon"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Coupons List */}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Min Purchase</th>
                        <th>Max Discount</th>
                        <th>Usage</th>
                        <th>Expires</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((c) => (
                        <tr key={c._id}>
                            <td><strong>{c.code}</strong></td>
                            <td>{c.discount}%</td>
                            <td>${c.minPurchaseAmount || 0}</td>
                            <td>{c.maxDiscountAmount ? `$${c.maxDiscountAmount}` : 'No cap'}</td>
                            <td>{c.usedCount || 0}{c.usageLimit ? `/${c.usageLimit}` : ''} {c.userUsageLimit ? `(${c.userUsageLimit}/user)` : ''}</td>
                            <td>{new Date(c.expirationDate).toLocaleDateString()}</td>
                            <td>
                                {new Date(c.expirationDate) > new Date() ? (
                                    <span className="pill pill--success">Active</span>
                                ) : (
                                    <span className="pill pill--warning">Expired</span>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(c._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AdminCoupons;
