import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import ProductCard from "../components/product/ProductCard";
import SectionHeader from "../components/others/SectionHeader";
import HeroBanner from "../components/hero/HeroBanner";
import { FeatureSteps } from "../components/others/FeatureSteps";
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

      <FeatureSteps
        features={[
          {
            step: 'Step 1',
            title: 'Browse Our Collection',
            content: 'Explore our curated selection of premium products across various categories.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
          },
          {
            step: 'Step 2',
            title: 'Add to Cart',
            content: 'Select your favorite items and add them to your shopping cart with ease.',
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop'
          },
          {
            step: 'Step 3',
            title: 'Secure Checkout',
            content: 'Complete your purchase with our secure and seamless checkout process.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop'
          },
        ]}
        title="How to Shop With Us"
        autoPlayInterval={4000}
      />

      <section className="page-section">
        <SectionHeader
          title="About Us"
          subtitle="Our Story"
          action={<Link to="/about"><PrimaryButton variant="ghost">Read More</PrimaryButton></Link>}
        />
        <div className="panel" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--color-text-muted)" }}>
            At <strong>Arihant Jewellers</strong>, we craft timeless elegance. With a legacy of trust and a passion for purity, we bring you exquisite gold, silver, and diamond jewelry that celebrates every moment of your life. From traditional artistry to modern designs, our collections are a tribute to beauty and heritage.
          </p>
        </div>
      </section>
    </>
  );
};

export default Homepage;

