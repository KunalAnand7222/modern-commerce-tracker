import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { getProducts } from "@/lib/products";
import { CATEGORIES, BRANDS } from "@/lib/types";

const ITEMS_PER_PAGE = 24;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("");

  const { products, total } = useMemo(() => {
    return getProducts(page, ITEMS_PER_PAGE, {
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice < 1000 ? maxPrice : undefined,
      minRating: minRating || undefined,
      brand: selectedBrand || undefined,
      search: search || undefined,
      sort: sort || undefined,
    });
  }, [page, category, minPrice, maxPrice, minRating, selectedBrand, search, sort]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchParams({});
    setMinPrice(0);
    setMaxPrice(1000);
    setMinRating(0);
    setSelectedBrand("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              {category ? CATEGORIES.find(c => c.slug === category)?.name || "Products" : search ? `Results for "${search}"` : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{total.toLocaleString()} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 rounded-lg bg-secondary border border-border hover:bg-surface-hover transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "fixed inset-0 z-40 bg-background p-6 overflow-auto" : "hidden"} md:block md:static md:w-64 flex-shrink-0`}>
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h3 className="font-display font-bold text-foreground">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="text-sm font-display font-bold text-foreground mb-3">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => updateParam("category", "")}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!category ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => updateParam("category", cat.slug)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === cat.slug ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-display font-bold text-foreground mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => { setMinPrice(Number(e.target.value)); setPage(1); }}
                      placeholder="Min"
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground">—</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                      placeholder="Max"
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-sm font-display font-bold text-foreground mb-3">Min Rating</h4>
                <div className="flex gap-2">
                  {[0, 3, 3.5, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => { setMinRating(r); setPage(1); }}
                      className={`px-3 py-1 rounded-lg text-xs border transition-colors ${minRating === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                    >
                      {r === 0 ? "All" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h4 className="text-sm font-display font-bold text-foreground mb-3">Brand</h4>
                <div className="space-y-1 max-h-48 overflow-auto">
                  <button
                    onClick={() => { setSelectedBrand(""); setPage(1); }}
                    className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors ${!selectedBrand ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    All Brands
                  </button>
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => { setSelectedBrand(b); setPage(1); }}
                      className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors ${selectedBrand === b ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-primary hover:underline">Clear filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-secondary transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-muted-foreground px-4">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-secondary transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
