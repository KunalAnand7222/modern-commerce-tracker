import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Clock } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/types";
import { getFeaturedProducts, getTrendingProducts, getDealsOfTheDay } from "@/lib/products";

const featured = getFeaturedProducts();
const trending = getTrendingProducts();
const deals = getDealsOfTheDay();

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-3 h-3" /> 10,000+ Products Available
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground leading-tight mb-6">
              Shop the <span className="text-gradient">Future</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover premium products across 10 categories. From electronics to gaming — all with unbeatable prices and lightning-fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?sort=discount"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-display font-bold hover:bg-secondary transition-all"
              >
                View Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-display font-bold text-foreground mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:glow-primary transition-all duration-300 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count.toLocaleString()}+ items</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">Featured Products</h2>
          </div>
          <Link to="/products" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-display font-bold text-foreground">Deals of the Day</h2>
          </div>
          <Link to="/products?sort=discount" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">Trending Now</h2>
          </div>
          <Link to="/products" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Get the latest deals and product launches delivered to your inbox.</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
