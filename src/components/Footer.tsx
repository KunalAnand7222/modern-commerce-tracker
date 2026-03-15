import { Link } from "react-router-dom";
import { CATEGORIES } from "@/lib/types";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">N</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">NexStore</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your premium destination for 10,000+ products across 10 categories with the best deals.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Categories</h4>
            <div className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link>
              <Link to="/cart" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Cart</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get updates on deals and new arrivals.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 NexStore. Built for web analytics demonstration.</p>
        </div>
      </div>
    </footer>
  );
}
