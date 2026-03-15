import { Users, Shield, Truck, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Users, label: "Happy Customers", value: "50K+" },
  { icon: Shield, label: "Products", value: "10,000+" },
  { icon: Truck, label: "Deliveries", value: "100K+" },
  { icon: Award, label: "Categories", value: "10" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">About NexStore</h1>
          <p className="text-muted-foreground leading-relaxed">
            NexStore is a premium e-commerce platform built for the modern shopper. With over 10,000 products across 10 categories, 
            we deliver a seamless shopping experience powered by cutting-edge web technology. This platform also serves as a 
            demonstration project for web analytics tracking and academic research.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-6 text-center">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To provide a world-class shopping experience with the widest selection of products at competitive prices. 
            We leverage advanced analytics and modern web technologies to continuously improve our platform and deliver 
            personalized experiences to every customer.
          </p>
          <h2 className="text-2xl font-display font-bold text-foreground">Built by Kunal Bhardwaj</h2>
          <p className="text-muted-foreground leading-relaxed">
            This project was created as part of a web analytics research initiative, demonstrating how modern e-commerce 
            platforms can integrate analytics tracking for insights on user behavior, product performance, and conversion optimization.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
