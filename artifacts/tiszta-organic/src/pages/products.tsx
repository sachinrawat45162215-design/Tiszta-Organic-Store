import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Clock } from "lucide-react";
import productFrontImg from "@assets/WhatsApp_Image_2026-05-02_at_2.15.52_AM_1777668487991.jpeg";

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-muted-foreground">
              Pure, unadulterated organic food straight from trusted farms to your kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Flagship Product */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50 flex flex-col md:flex-row"
            >
              <div className="w-full md:w-2/5 p-8 bg-[#faf8f2] flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img 
                    src={productFrontImg} 
                    alt="High Protein Organic Atta" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Bestseller
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-2 text-secondary font-bold tracking-wider text-sm uppercase">Premium Blend</div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">High Protein Organic Atta</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  A carefully crafted multi-grain blend containing wheat, soybean, roasted chana, oats, flaxseed, and chia seeds. Delivers an impressive 16–18g of protein per 100g to support your healthy lifestyle.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">16-18g Protein / 100g</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">100% Chemical-Free</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Rich in Fiber & Omega-3</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">No Preservatives</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button asChild size="lg" className="rounded-full h-14 px-8 text-base">
                    <Link href="/contact">Contact to Order</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Coming Soon Products */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-3xl p-8 border border-border/50 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-bold rounded-full mb-4">Coming Soon</div>
              <h3 className="font-serif text-2xl font-bold mb-3">Organic Raw Honey</h3>
              <p className="text-muted-foreground">Pure, unfiltered honey sourced directly from wild forest bees.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-3xl p-8 border border-border/50 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-bold rounded-full mb-4">Coming Soon</div>
              <h3 className="font-serif text-2xl font-bold mb-3">A2 Gir Cow Ghee</h3>
              <p className="text-muted-foreground">Traditional bilona method ghee from grass-fed desi cows.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-3xl p-8 border border-border/50 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-bold rounded-full mb-4">Coming Soon</div>
              <h3 className="font-serif text-2xl font-bold mb-3">Cold Pressed Oils</h3>
              <p className="text-muted-foreground">Unrefined, nutrient-rich oils extracted without heat or chemicals.</p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
