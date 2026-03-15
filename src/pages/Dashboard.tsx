import { Link } from "react-router-dom";
import { Package, User, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const orders = [
  { id: "NX001234", date: "2026-03-10", status: "Delivered", total: 249.99 },
  { id: "NX001198", date: "2026-03-05", status: "In Transit", total: 89.50 },
  { id: "NX001150", date: "2026-02-28", status: "Processing", total: 599.00 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">My Account</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Package, label: "Orders", active: false },
              { icon: Settings, label: "Settings", active: false },
            ].map((item) => (
              <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Profile Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground">Name</label><p className="text-sm text-foreground">Kunal Bhardwaj</p></div>
                <div><label className="text-xs text-muted-foreground">Email</label><p className="text-sm text-foreground">kunalbhardwaj7222805@gmail.com</p></div>
                <div><label className="text-xs text-muted-foreground">Phone</label><p className="text-sm text-foreground">+91-9693604226</p></div>
                <div><label className="text-xs text-muted-foreground">Location</label><p className="text-sm text-foreground">Phagwara, Punjab</p></div>
              </div>
            </div>

            {/* Orders */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.status === "Delivered" ? "bg-primary/10 text-primary" :
                      order.status === "In Transit" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-display font-bold text-foreground">${order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
