import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SiInstagram, SiGmail } from "react-icons/si";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you shortly.",
        duration: 5000,
      });
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at tisztaorganic@gmail.com",
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
              {/* Contact Info Sidebar */}
              <div className="md:col-span-2 bg-primary text-primary-foreground p-10 flex flex-col">
                <h2 className="font-serif text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-primary-foreground/80 mb-12">
                  We'd love to hear from you! Whether you have a question about our products, want to place an order, or just want to say hello.
                </p>
                
                <div className="space-y-8 flex-1">
                  <a href="mailto:tisztaorganic@gmail.com" className="flex items-start gap-4 hover:text-secondary transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-primary transition-colors">
                      <SiGmail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-foreground/60 mb-1">Email Us</p>
                      <p className="font-medium text-lg">tisztaorganic@gmail.com</p>
                    </div>
                  </a>
                  
                  <a href="https://www.instagram.com/tiszta_organic" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-secondary transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-primary transition-colors">
                      <SiInstagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-foreground/60 mb-1">Instagram</p>
                      <p className="font-medium text-lg">@tiszta_organic</p>
                    </div>
                  </a>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-foreground/60 mb-1">Location</p>
                      <p className="font-medium">Sourced directly from <br/>trusted Indian farms</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-12">
                  <p className="text-sm text-primary-foreground/60">From Soil to Soul – 100% Pure Organic Living.</p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-3 p-10 md:p-14 bg-[#faf8f2]">
                <h3 className="font-serif text-2xl font-bold mb-8 text-foreground">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
                    <Input 
                      id="name"
                      name="name"
                      required 
                      placeholder="John Doe" 
                      className="bg-white h-12 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email" 
                      required 
                      placeholder="john@example.com" 
                      className="bg-white h-12 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      required 
                      placeholder="How can we help you?" 
                      className="bg-white min-h-[150px] resize-none border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full h-14 rounded-xl text-base font-semibold"
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
