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
        isHidden: false,
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
            data.append("isHidden", formData.isHidden);
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
        <section className="admin-products">
            <div className="panel" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <SectionHeader title="Add New Product" subtitle="Admin Panel" />

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
                    <label>
                        Product Name
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Ceramic Vase"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            name="description"
                            placeholder="Product details..."
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                        />
                    </label>

                    <div className="two-column">
                        <label>
                            Price ($)
                            <input
                                type="number"
                                name="price"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Category
                            <input
                                type="text"
                                name="category"
                                placeholder="e.g. Home Decor"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                            type="checkbox"
                            name="isHidden"
                            checked={formData.isHidden}
                            onChange={(e) => setFormData({ ...formData, isHidden: e.target.checked })}
                        />
                        Hide Product (Keep in database but do not show on website)
                    </label>

                    <label>
                        Product Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ padding: "0.5rem" }}
                        />
                    </label>

                    <div style={{ marginTop: "1rem" }}>
                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Product"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AdminProductForm;
