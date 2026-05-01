import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "./ui/button";
import productFrontImg from "@assets/WhatsApp_Image_2026-05-02_at_2.15.52_AM_1777668487991.jpeg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#faf8f2]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 rounded-l-[100px] -z-10 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full -z-10 blur-3xl opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary/20 text-primary font-medium text-sm border border-secondary/30"
            >
              100% Pure Organic Living
            </motion.div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground">
              From Soil to <span className="text-primary italic">Soul.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Experience the purity of real food with our High Protein Organic Atta. Direct from trusted farmers, free from chemicals, full of life.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-base h-14 bg-primary hover:bg-primary/90">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base h-14 border-primary/20 hover:bg-primary/5">
                <a href="#about">Learn More</a>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=User${i}&backgroundColor=1a5c2a`} alt="User avatar fallback" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-foreground">Trusted by 1000+ families</p>
                <p className="text-muted-foreground">For healthier lifestyles</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={productFrontImg} 
                alt="TISZTA Organic High Protein Atta" 
                className="w-full h-full object-cover"
              />
              {/* Badge overlay */}
              <div className="absolute top-6 -right-6 bg-secondary text-secondary-foreground font-bold py-2 px-10 shadow-lg transform rotate-45">
                16-18g Protein
              </div>
            </div>
            
            {/* Floating indicator */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-border/50"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Certified</p>
                <p className="text-xs text-muted-foreground">100% Organic</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
