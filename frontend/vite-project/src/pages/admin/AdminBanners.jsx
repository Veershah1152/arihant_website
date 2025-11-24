import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import "./admin.css";

const AdminBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // Form State
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [link, setLink] = useState("/shop");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const { data } = await api.get("/banners");
            setBanners(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching banners:", error);
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please select an image");

        setUploading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("link", link);
        formData.append("image", image);

        try {
            await api.post("/banners", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setUploading(false);
            setTitle("");
            setSubtitle("");
            setImage(null);
            fetchBanners();
            alert("Banner added successfully!");
        } catch (error) {
            console.error("Error adding banner:", error);
            setUploading(false);
            alert("Failed to add banner");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;

        try {
            await api.delete(`/banners/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchBanners();
        } catch (error) {
            console.error("Error deleting banner:", error);
            alert("Failed to delete banner");
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.put(`/banners/${id}/status`, {}, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchBanners();
        } catch (error) {
            console.error("Error updating banner status:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin-products">
            <SectionHeader title="Manage Banners" subtitle="Admin Panel" />

            {/* Add Banner Form */}
            <div className="panel" style={{ marginBottom: "2.5rem", maxWidth: "600px" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>Add New Banner</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <label>
                        Title
                        <input
                            type="text"
                            placeholder="Banner Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Subtitle
                        <input
                            type="text"
                            placeholder="Banner Subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Link
                        <input
                            type="text"
                            placeholder="Link (e.g. /shop)"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </label>
                    <label>
                        Banner Image
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                            style={{ padding: "0.5rem" }}
                        />
                    </label>
                    <div style={{ marginTop: "0.5rem" }}>
                        <PrimaryButton disabled={uploading}>
                            {uploading ? "Uploading..." : "Add Banner"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Banners List */}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map((banner) => (
                        <tr key={banner._id}>
                            <td>
                                <img
                                    src={banner.image?.url}
                                    alt={banner.title}
                                    style={{ width: "120px", height: "auto", borderRadius: "var(--radius-sm)" }}
                                    onError={(e) => e.target.src = "https://via.placeholder.com/100"}
                                />
                            </td>
                            <td>
                                <strong style={{ fontSize: "1.1rem", color: "var(--color-secondary)" }}>{banner.title}</strong>
                                <br />
                                <span className="muted">{banner.subtitle}</span>
                            </td>
                            <td>
                                <button
                                    onClick={() => toggleStatus(banner._id)}
                                    className={`pill ${banner.isActive ? "pill--success" : "pill--warning"}`}
                                    style={{ border: "none", cursor: "pointer" }}
                                >
                                    {banner.isActive ? "Active" : "Inactive"}
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(banner._id)}
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

export default AdminBanners;
