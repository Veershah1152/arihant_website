import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SectionHeader from "../components/others/SectionHeader";
import ProductCard from "../components/product/ProductCard";
import api from "../utils/api";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import Rating from "../components/others/Rating";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      if (data.images && data.images.length > 0) {
        setSelectedImage(data.images[0].url);
      }

      // Fetch Related Products
      if (data.category) {
        const relatedRes = await api.get("/products", {
          params: { category: data.category, limit: 4 },
        });
        // Filter out current product
        setRelatedProducts(relatedRes.data.products.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to fetch product", err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.post("/users/wishlist", { productId: product._id }, config);
      alert("Added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist", error);
      alert(error.response?.data?.message || "Error adding to wishlist");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.post(`/products/${id}/reviews`, { rating, comment }, config);
      setReviewSuccess("Review submitted successfully");
      setComment("");
      setRating(5);
      setReviewError("");
      fetchProduct(); // Refetch to show new review
    } catch (error) {
      setReviewError(error.response?.data?.message || "Error submitting review");
      setReviewSuccess("");
    }
  };

  if (loading) return <p className="page-section">Loading...</p>;
  if (error) return <p className="page-section error-text">{error}</p>;
  if (!product) return <p className="page-section">Product not found</p>;

  return (
    <section id="product-detail" className="page-section">
      <SectionHeader
        title="Product detail walk-through"
        subtitle="Product Detail"
        action={<PrimaryButton variant="ghost">Share</PrimaryButton>}
      />

      <div className="two-column">
        <div className="panel">
          {/* Main Image */}
          <div style={{ marginBottom: "1rem", borderRadius: "8px", overflow: "hidden" }}>
            <img
              src={selectedImage || "https://via.placeholder.com/600"}
              alt={product.name}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="cards-row" style={{ gap: "0.5rem" }}>
              {product.images.map((img) => (
                <img
                  key={img.public_id}
                  src={img.url}
                  alt="thumbnail"
                  onClick={() => setSelectedImage(img.url)}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: selectedImage === img.url ? "2px solid #333" : "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="panel section-grid">
          <p className="pill pill--success">In stock</p>
          <h3>{product.name}</h3>
          <p className="muted">{product.description}</p>

          <div className="price-tag">${product.price}</div>

          <div className="cards-row">
            <PrimaryButton onClick={handleAddToCart}>Add to Cart</PrimaryButton>
            <PrimaryButton variant="outline" onClick={handleAddToWishlist}>Add to Wishlist</PrimaryButton>
          </div>

          <div className="section-divider" />

          <div>
            <p className="muted">Category</p>
            <strong>{product.category || "General"}</strong>
          </div>

          <div>
            <p className="muted">Rating</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Reviews Section */}
      <div className="panel">
        <h3>Reviews</h3>
        {product.reviews.length === 0 && <p className="muted">No reviews yet. Be the first to review!</p>}



        <div className="reviews-list" style={{ marginTop: '1rem' }}>
          {product.reviews.map((review) => (
            <div key={review._id} style={{
              padding: '1rem',
              borderBottom: '1px solid #eee',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <span className="muted" style={{ fontSize: '0.85rem' }}>
                  {review.createdAt && new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        <h4>Write a Review</h4>
        {reviewError && <p className="error-text">{reviewError}</p>}
        {reviewSuccess && <p className="success-text">{reviewSuccess}</p>}

        {user ? (
          <form onSubmit={submitReview} className="form-group" style={{ maxWidth: '600px', background: '#f9f9f9', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Rate this product</label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: star <= (hoverRating || rating) ? '#f8e825' : '#e4e5e9',
                      transition: 'transform 0.2s, color 0.2s',
                      transform: star <= (hoverRating || rating) ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '1rem', color: '#666', fontWeight: '500' }}>
                {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Write your review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-field"
                rows="4"
                placeholder="What did you like or dislike? What did you use this product for?"
                required
                style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical' }}
              ></textarea>
            </div>

            <div style={{ textAlign: 'right' }}>
              <PrimaryButton type="submit">Submit Review</PrimaryButton>
            </div>
          </form>
        ) : (
          <p>Please <Link to="/login">login</Link> to write a review.</p>
        )}
      </div>

      <div className="section-divider" />

      {/* Related Products */}
      {
        relatedProducts.length > 0 && (
          <div>
            <h3>Related Products</h3>
            <div className="product-grid" style={{ marginTop: "1rem" }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} size="sm" />
              ))}
            </div>
          </div>
        )
      }
    </section >
  );
};

export default ProductDetail;
