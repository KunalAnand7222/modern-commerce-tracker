import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">Thank you for your purchase. Your order #NX{Date.now().toString().slice(-6)} has been placed.</p>
          <Link to="/" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 transition-all">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="First Name" className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input placeholder="Last Name" className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input placeholder="Email" className="md:col-span-2 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input placeholder="Address" className="md:col-span-2 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input placeholder="City" className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input placeholder="ZIP Code" className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Payment Method</h3>
              <div className="space-y-3">
                {["Credit Card", "Debit Card", "UPI", "Cash on Delivery"].map((m) => (
                  <label key={m} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="accent-primary" defaultChecked={m === "Credit Card"} />
                    <span className="text-sm text-foreground">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="rounded-xl border border-border bg-card p-6 sticky top-24 space-y-4">
              <h3 className="font-display font-bold text-foreground">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground line-clamp-1">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      ${(item.product.price * (1 - item.product.discountPercentage / 100) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between"><span className="font-display font-bold text-foreground">Total</span><span className="font-display font-bold text-foreground text-xl">${total.toFixed(2)}</span></div>
              </div>
              <button
                onClick={() => { setSubmitted(true); clear(); }}
                className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
