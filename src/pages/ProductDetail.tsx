import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Star, ArrowLeft, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, generateProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(Number(id));
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">← Back to products</Link>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const related = [product.id + 1, product.id + 2, product.id + 3, product.id + 10].map(generateProduct);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border mb-4">
              <img src={product.images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
              <h1 className="text-3xl font-display font-bold text-foreground">{product.title}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} / 5.0</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-display font-extrabold text-foreground">${discountedPrice.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground text-sm font-bold">-{Math.round(product.discountPercentage)}%</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-secondary transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <Link
                to="/checkout"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 rounded-xl border border-primary text-primary font-display font-bold hover:bg-primary/10 transition-all"
              >
                Buy Now
              </Link>
            </div>

            {/* Details */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Category</span><span className="text-foreground capitalize">{product.category.replace("-", " ")}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Brand</span><span className="text-foreground">{product.brand}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Product ID</span><span className="text-foreground">#{product.id}</span></div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        <section className="mt-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
