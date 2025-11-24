import PropTypes from "prop-types";
import Badge from "../others/Badge";
import "./product.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, size = "md" }) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "https://via.placeholder.com/300";

  return (
    <Link to={`/product/${product._id}`} className={`product-card product-card--${size}`}>
      <div className="product-card__media">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="product-card__overlay">
          <span className="btn-quick-view">View Details</span>
        </div>
      </div>
      <div className="product-card__body">
        <div className="product-card__header">
          <h3>{product.name}</h3>
          {product.category && <Badge tone="info">{product.category}</Badge>}
        </div>
        <p className="muted">{product.description && product.description.substring(0, 60)}...</p>
        <footer>
          <strong className="price-tag">${product.price}</strong>
        </footer>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(["sm", "md"]),
};

export default ProductCard;

