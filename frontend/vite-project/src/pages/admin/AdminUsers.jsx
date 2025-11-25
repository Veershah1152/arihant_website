import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import "./admin.css";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get("/users", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchUsers();
        }
    }, [user]);

    // Search filter
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((u) => {
                const search = searchTerm.toLowerCase();
                return (
                    u.name?.toLowerCase().includes(search) ||
                    u.email?.toLowerCase().includes(search) ||
                    u.phoneNumber?.includes(search) ||
                    u.address?.toLowerCase().includes(search)
                );
            });
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin-products">
            <SectionHeader title="Manage Users" subtitle="Admin Panel" />

            {/* Search Bar */}
            <div className="panel" style={{ marginBottom: "2rem", maxWidth: "600px" }}>
                <label>
                    Search Users
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginTop: "0.5rem" }}
                    />
                </label>
                <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                    Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
                </p>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Admin</th>
                        <th>Phone Verified</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                                No users found
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map((u) => (
                            <tr key={u._id}>
                                <td><strong>{u.name}</strong></td>
                                <td>{u.email}</td>
                                <td>{u.phoneNumber || <span className="muted">Not provided</span>}</td>
                                <td style={{ maxWidth: "250px" }}>
                                    {u.address ? (
                                        <span style={{ fontSize: "0.9rem" }}>{u.address}</span>
                                    ) : (
                                        <span className="muted">Not provided</span>
                                    )}
                                </td>
                                <td>
                                    {u.isAdmin ? (
                                        <span className="pill pill--success">Admin</span>
                                    ) : (
                                        <span className="pill pill--info">User</span>
                                    )}
                                </td>
                                <td>
                                    {u.phoneVerified ? (
                                        <span className="pill pill--success">✓ Verified</span>
                                    ) : (
                                        <span className="pill pill--warning">Not verified</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default AdminUsers;
