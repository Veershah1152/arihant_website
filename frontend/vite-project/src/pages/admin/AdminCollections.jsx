import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import "../admin/admin.css";

const AdminCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [productCount, setProductCount] = useState("");
    const [order, setOrder] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [creating, setCreating] = useState(false);

    // Edit State
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const { data } = await api.get("/collections/admin", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setCollections(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching collections:", error);
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);

        try {
            const collectionData = {
                title,
                description,
                category,
                productCount: productCount ? Number(productCount) : 0,
                order: order ? Number(order) : 0,
                image,
            };

            if (editingId) {
                // Update
                await api.put(`/collections/${editingId}`, collectionData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                alert("Collection updated successfully!");
                setEditingId(null);
            } else {
                // Create
                await api.post("/collections", collectionData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                alert("Collection created successfully!");
            }

            // Reset form
            setTitle("");
            setDescription("");
            setCategory("");
            setProductCount("");
            setOrder("");
            setImage("");
            setImagePreview("");
            setCreating(false);
            fetchCollections();
        } catch (error) {
            console.error("Error saving collection:", error);
            setCreating(false);
            alert(error.response?.data?.message || "Failed to save collection");
        }
    };

    const handleEdit = (collection) => {
        setEditingId(collection._id);
        setTitle(collection.title);
        setDescription(collection.description);
        setCategory(collection.category);
        setProductCount(collection.productCount);
        setOrder(collection.order);
        setImagePreview(collection.image.url);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setCategory("");
        setProductCount("");
        setOrder("");
        setImage("");
        setImagePreview("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this collection?")) return;

        try {
            await api.delete(`/collections/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchCollections();
            alert("Collection deleted successfully!");
        } catch (error) {
            console.error("Error deleting collection:", error);
            alert("Failed to delete collection");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin-products">
            <SectionHeader title="Manage Collections" subtitle="Admin Panel" />

            {/* Add/Edit Collection Form */}
            <div className="panel" style={{ marginBottom: "2.5rem", maxWidth: "800px" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>
                    {editingId ? "Edit Collection" : "Create New Collection"}
                </h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <label>
                        Title
                        <input
                            type="text"
                            placeholder="e.g. The Grand Lodge"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description
                        <textarea
                            placeholder="e.g. Earthy ceramics, antique brass, and wooden inlays."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="3"
                        />
                    </label>
                    <label>
                        Category (URL-friendly, lowercase)
                        <input
                            type="text"
                            placeholder="e.g. grand-lodge"
                            value={category}
                            onChange={(e) => setCategory(e.target.value.toLowerCase())}
                            required
                        />
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <label>
                            Product Count
                            <input
                                type="number"
                                placeholder="e.g. 24"
                                value={productCount}
                                onChange={(e) => setProductCount(e.target.value)}
                                min="0"
                            />
                        </label>
                        <label>
                            Order (for sorting)
                            <input
                                type="number"
                                placeholder="e.g. 1"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                min="0"
                            />
                        </label>
                    </div>
                    <label>
                        Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={!editingId}
                        />
                    </label>
                    {imagePreview && (
                        <div style={{ marginTop: "0.5rem" }}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
                            />
                        </div>
                    )}
                    <div style={{ marginTop: "0.5rem", display: "flex", gap: "1rem" }}>
                        <PrimaryButton disabled={creating}>
                            {creating ? "Saving..." : editingId ? "Update Collection" : "Create Collection"}
                        </PrimaryButton>
                        {editingId && (
                            <PrimaryButton type="button" variant="outline" onClick={handleCancelEdit}>
                                Cancel
                            </PrimaryButton>
                        )}
                    </div>
                </form>
            </div>

            {/* Collections List */}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Products</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map((c) => (
                        <tr key={c._id}>
                            <td>
                                <img
                                    src={c.image.url}
                                    alt={c.title}
                                    style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px" }}
                                />
                            </td>
                            <td><strong>{c.title}</strong></td>
                            <td>{c.category}</td>
                            <td>{c.productCount}</td>
                            <td>{c.order}</td>
                            <td>
                                {c.isActive ? (
                                    <span className="pill pill--success">Active</span>
                                ) : (
                                    <span className="pill pill--warning">Inactive</span>
                                )}
                            </td>
                            <td>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button
                                        className="btn-outline"
                                        onClick={() => handleEdit(c)}
                                        style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(c._id)}
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

export default AdminCollections;
