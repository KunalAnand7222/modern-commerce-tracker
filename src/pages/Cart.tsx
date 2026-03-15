import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";

export default function Cart() {
  const { items, total, count, updateQuantity, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 transition-all">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const dp = item.product.price * (1 - item.product.discountPercentage / 100);
                return (
                  <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                    <Link to={`/product/${item.product.id}`} className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.product.thumbnail} alt={item.product.title} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1">{item.product.title}</Link>
                      <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-display font-bold text-foreground">${dp.toFixed(2)}</span>
                        {item.product.discountPercentage > 0 && <span className="text-xs text-muted-foreground line-through">${item.product.price.toFixed(2)}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-6 sticky top-24 space-y-4">
                <h3 className="font-display font-bold text-foreground">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Items ({count})</span><span className="text-foreground">${total.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between"><span className="font-display font-bold text-foreground">Total</span><span className="font-display font-bold text-foreground text-xl">${total.toFixed(2)}</span></div>
                </div>
                <Link to="/checkout" className="block w-full text-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 transition-all">
                  Proceed to Checkout
                </Link>
                <Link to="/products" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
