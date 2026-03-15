import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { count } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMega, setShowMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const megaRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setShowMega(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">N</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">NexStore</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 10,000+ products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </form>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Categories dropdown */}
            <div className="relative hidden md:block" ref={megaRef}>
              <button
                onClick={() => setShowMega(!showMega)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Categories <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {showMega && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-80 glass rounded-xl p-4 grid grid-cols-2 gap-2"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setShowMega(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                      >
                        <span>{cat.icon}</span>
                        <span className="text-foreground">{cat.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            <Link to="/login" className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              <User className="w-4 h-4" />
              Login
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <form onSubmit={handleSearch} className="py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </form>
              <div className="grid grid-cols-2 gap-2 pb-4">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products?category=${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                  >
                    <span>{cat.icon}</span>
                    <span className="text-foreground">{cat.name}</span>
                  </Link>
                ))}
              </div>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg hover:bg-secondary transition-colors text-sm text-muted-foreground">
                <User className="w-4 h-4" /> Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
