import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import "./admin.css";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
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

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin-products">
            <SectionHeader title="Manage Users" subtitle="Admin Panel" />

            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u._id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                                {u.isAdmin ? (
                                    <span style={{ color: "green", fontWeight: "bold" }}>Yes</span>
                                ) : (
                                    "No"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AdminUsers;
