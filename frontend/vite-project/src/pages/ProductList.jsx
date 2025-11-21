import { useState, useEffect } from "react";
import ProductCard from "../components/product/ProductCard";
import SectionHeader from "../components/others/SectionHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import api from "../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Sort State
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/products/categories");
        setCategories(["All", ...data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        // Fallback
        setCategories(["All", "Living", "Workspace", "Wellness", "Tech", "Travel"]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: 8,
          sort,
        };
        if (category !== "All") {
          params.category = category;
        }
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const { data } = await api.get("/products", { params });
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    // Debounce price filter slightly or just fetch on effect
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [category, sort, page, minPrice, maxPrice]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <section id="product-list" className="page-section">
      <SectionHeader
        title="Browse the catalog"
        subtitle="Shop"
        action={
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {/* Price Filter */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="number"
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ width: "70px", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ width: "70px", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={handleSortChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        }
      />

      {/* Filter Tabs */}
      <div className="cards-row" style={{ marginBottom: "2rem", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <PrimaryButton
            key={cat}
            variant={category === cat ? "primary" : "ghost"}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </PrimaryButton>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} size="sm" />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination" style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <PrimaryButton
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </PrimaryButton>
            <span style={{ alignSelf: "center" }}>
              Page {page} of {totalPages}
            </span>
            <PrimaryButton
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </PrimaryButton>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;

