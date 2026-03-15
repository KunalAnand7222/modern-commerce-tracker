import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative rounded-xl border border-border bg-card overflow-hidden hover:glow-primary transition-all duration-300"
    >
      {/* Discount badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-accent text-accent-foreground text-xs font-bold">
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-secondary">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Quick actions overlay */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link
          to={`/product/${product.id}`}
          className="w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-display font-bold text-foreground">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addItem(product)}
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
