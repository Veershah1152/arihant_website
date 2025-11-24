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

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Fetch Search Suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const { data } = await api.get("/products", {
            params: { limit: 5, sort: "newest" }
          });
          const filtered = data.products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchSuggestions(filtered);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Failed to fetch suggestions", err);
        }
      };
      const timer = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

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
        if (searchQuery) {
          // Simple search implementation - filter on frontend
          // For production, implement backend search endpoint
        }

        const { data } = await api.get("/products", { params });

        // Filter by search query if present
        let filteredProducts = data.products;
        if (searchQuery) {
          filteredProducts = data.products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setProducts(filteredProducts);
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
  }, [category, sort, page, searchQuery]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <section id="product-list" className="page-section">
      <SectionHeader
        title="Browse the catalog"
        subtitle="Shop"
        action={
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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

      {/* Search Bar */}
      <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto 2rem" }}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "0.75rem 3rem 0.75rem 1rem",
              fontSize: "1rem",
              border: "2px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-primary)";
              searchSuggestions.length > 0 && setShowSuggestions(true);
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-border)";
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "var(--color-text-muted)",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "0.5rem",
              background: "white",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              maxHeight: "300px",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {searchSuggestions.map((product) => (
              <div
                key={product._id}
                onClick={() => handleSuggestionClick(product.name)}
                style={{
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(139, 94, 60, 0.05)"}
                onMouseLeave={(e) => e.target.style.background = "white"}
              >
                {product.images && product.images[0] && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "500" }}>{product.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

