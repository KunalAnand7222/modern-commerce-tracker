import { MapPin, Phone, Mail as MailIcon, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2 text-center">Contact Us</h1>
        <p className="text-muted-foreground text-center mb-12">We'd love to hear from you</p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
              <div><h4 className="font-display font-bold text-foreground text-sm">Address</h4><p className="text-sm text-muted-foreground">Lawgate, Phagwara, Punjab, 144411, India</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MailIcon className="w-5 h-5 text-primary" /></div>
              <div><h4 className="font-display font-bold text-foreground text-sm">Email</h4><p className="text-sm text-muted-foreground">kunalbhardwaj7222805@gmail.com</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
              <div><h4 className="font-display font-bold text-foreground text-sm">Phone</h4><p className="text-sm text-muted-foreground">+91-9693604226</p></div>
            </div>
          </div>

          {/* Form */}
          <form
  name="contact"
  method="POST"
  data-netlify="true"
  className="space-y-4"
>
  <input type="hidden" name="form-name" value="contact" />

  <input
    name="name"
    placeholder="Your Name"
    required
    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
  />

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
  />

  <input
    name="phone"
    placeholder="Phone Number"
    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
  />

  <textarea
    rows={4}
    name="message"
    placeholder="Your Message"
    required
    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
  />

  <button
    type="submit"
    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold hover:brightness-110 transition-all"
  >
    <Send className="w-4 h-4" /> Send Message
  </button>
</form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
