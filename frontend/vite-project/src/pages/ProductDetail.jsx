import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SectionHeader from "../components/others/SectionHeader";
import ProductCard from "../components/product/ProductCard";
import api from "../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
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

    fetchProduct();
  }, [id]);

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
            <PrimaryButton>Add to Cart</PrimaryButton>
            <PrimaryButton variant="outline">Add to Wishlist</PrimaryButton>
          </div>

          <div className="section-divider" />

          <div>
            <p className="muted">Category</p>
            <strong>{product.category || "General"}</strong>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Reviews Placeholder */}
      <div className="panel">
        <h3>Reviews</h3>
        <p className="muted">No reviews yet. Be the first to review!</p>
        <PrimaryButton variant="outline">Write a Review</PrimaryButton>
      </div>

      <div className="section-divider" />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h3>Related Products</h3>
          <div className="product-grid" style={{ marginTop: "1rem" }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} size="sm" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
