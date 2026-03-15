import { useState } from "react";
import { MapPin, Phone, Mail as MailIcon, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2 text-center">
          Contact Us
        </h1>

        <p className="text-muted-foreground text-center mb-12">
          We'd love to hear from you
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h4 className="font-bold text-sm">Address</h4>
                <p className="text-sm text-muted-foreground">
                  Lawgate, Phagwara, Punjab, 144411, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MailIcon className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h4 className="font-bold text-sm">Email</h4>
                <p className="text-sm text-muted-foreground">
                  kunalbhardwaj7222805@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h4 className="font-bold text-sm">Phone</h4>
                <p className="text-sm text-muted-foreground">
                  +91-9693604226
                </p>
              </div>
            </div>

          </div>

          {/* Form */}
          <div>

            {submitted ? (

              <div className="bg-green-500/10 border border-green-500 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  Thanks for contacting us. We will get back to you soon.
                </p>
              </div>

            ) : (

              <form className="space-y-4" onSubmit={handleSubmit}>

                <input
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border"
                />

                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border"
                />

                <input
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border"
                />

                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white font-bold hover:brightness-110"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>

              </form>

            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
