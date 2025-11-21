import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import ProductCard from "../components/product/ProductCard";
import SectionHeader from "../components/others/SectionHeader";
import HeroBanner from "../components/hero/HeroBanner";
import api from "../utils/api";

const collectionHighlights = [
  {
    title: "The Grand Lodge",
    description: "Earthy ceramics, antique brass, and wooden inlays.",
    swatch: "#c79a6b",
  },
  {
    title: "Crystalware",
    description: "Cut glass silhouettes that glow after dusk.",
    swatch: "#d9c6b0",
  },
  {
    title: "Petit Jardin",
    description: "Botanical accents for mindful corners.",
    swatch: "#a7c4a0",
  },
];

const Homepage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await api.get("/products", {
          params: { sort: "newest", limit: 4 },
        });
        setTrendingProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch trending products", err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <>
      <HeroBanner />

      <section className="page-section">
        <SectionHeader
          title="Curations we love"
          subtitle="Curations"
          action={<Link to="/shop"><PrimaryButton variant="ghost">View all collections</PrimaryButton></Link>}
        />

        <div className="collection-grid">
          {collectionHighlights.map((collection) => (
            <article key={collection.title} className="collection-card">
              <div
                className="collection-card__image"
                style={{ backgroundColor: collection.swatch }}
              />
              <div>
                <h3>{collection.title}</h3>
                <p className="muted">{collection.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          title="Trending now"
          subtitle="Product Cards"
          action={<Link to="/shop"><PrimaryButton variant="ghost">View all</PrimaryButton></Link>}
        />

        <div className="product-grid">
          {trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Homepage;

