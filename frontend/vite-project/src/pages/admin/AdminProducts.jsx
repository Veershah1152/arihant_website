import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import "./admin.css";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products?limit=100");
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin-products">
            <div className="admin-actions">
                <SectionHeader title="Manage Products" subtitle="Admin Panel" />
                <Link to="/admin/products/new">
                    <PrimaryButton>Add New Product</PrimaryButton>
                </Link>
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <img
                                    src={product.images[0]?.url || "/placeholder.png"}
                                    alt={product.name}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <div className="action-buttons">
                                    <Link to={`/admin/products/edit/${product._id}`}>
                                        <button className="btn-edit">Edit</button>
                                    </Link>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AdminProducts;
