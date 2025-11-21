import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import "./admin.css";

const AdminProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            if (file) {
                data.append("file", file);
            }

            await api.post("/products/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            alert("Product created successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product");
            setLoading(false);
        }
    };

    return (
        <section className="admin-products" style={{ maxWidth: "600px" }}>
            <SectionHeader title="Add New Product" subtitle="Admin Panel" />

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />

                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Product Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ padding: "10px" }}
                    />
                </div>

                <PrimaryButton type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Product"}
                </PrimaryButton>
            </form>
        </section>
    );
};

export default AdminProductForm;
