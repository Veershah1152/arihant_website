import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../../context/AuthContext";
import SectionHeader from "../../components/others/SectionHeader";
import Rating from "../../components/others/Rating";

const AdminReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await api.get("/products/reviews", config);
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews", error);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchReviews();
        }
    }, [user]);

    return (
        <section className="page-section">
            <SectionHeader title="Product Reviews" subtitle="Admin Dashboard" />
            <div className="panel">
                {loading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p>No reviews found.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem' }}>Product</th>
                                <th style={{ padding: '1rem' }}>User</th>
                                <th style={{ padding: '1rem' }}>Rating</th>
                                <th style={{ padding: '1rem' }}>Comment</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{review.productName}</td>
                                    <td style={{ padding: '1rem' }}>{review.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <Rating value={review.rating} />
                                    </td>
                                    <td style={{ padding: '1rem' }}>{review.comment}</td>
                                    <td style={{ padding: '1rem' }}>{new Date(review.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
};

export default AdminReviews;
