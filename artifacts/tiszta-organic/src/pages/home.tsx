import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Activity, Heart, CheckCircle2 } from "lucide-react";
import productBackImg from "@assets/WhatsApp_Image_2026-05-02_at_2.15.53_AM_1777668487989.jpeg";
import { Product3DSection, Product3DButton } from "@/components/product-3d-viewer";

export default function Home() {
  const highlights = [
    { icon: Leaf, title: "Rich in Protein & Fiber", desc: "A multi-grain blend perfect for daily nutrition." },
    { icon: Activity, title: "16–18g Protein", desc: "High protein content per 100g serving." },
    { icon: ShieldCheck, title: "Quality Assured", desc: "Carefully sourced and scientifically tested." },
    { icon: Heart, title: "High Performance", desc: "Supports a healthier and active lifestyle." },
  ];

  const ingredients = [
    { name: "Soybean", protein: "36g", color: "bg-[#e8f5e9]" },
    { name: "Roasted Chana", protein: "22g", color: "bg-[#fff8e1]" },
    { name: "Flaxseed", protein: "18g", color: "bg-[#f3e5f5]" },
    { name: "Chia Seeds", protein: "17g", color: "bg-[#e0f2f1]" },
    { name: "Oats", protein: "17g", color: "bg-[#fff3e0]" },
    { name: "Wheat", protein: "13g", color: "bg-[#fbe9e7]" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <Hero />

        {/* Highlights Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block text-secondary font-medium tracking-wider uppercase mb-4 text-sm"
              >
                Our Mission
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl font-bold mb-8"
              >
                Back to Nature
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-lg md:text-xl text-primary-foreground/90 leading-relaxed"
              >
                <p>
                  TISZTA Organic was born with a simple mission — to bring back the purity of real food. In today's world, where chemicals and adulteration have become common, we decided to take a step back to nature.
                </p>
                <p>
                  We work directly with trusted farmers who follow clean, natural and sustainable farming practices, ensuring every grain you consume is clean, nutritious, and full of life. From high-protein atta to fiber-rich crops, every product is carefully sourced to support a healthier lifestyle for Indian families.
                </p>
                <p className="font-serif text-2xl text-secondary mt-8 italic">
                  "At Tiszta Organic, we don't just sell food — we deliver trust, health, and authenticity."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ingredients & Protein Section */}
        <section className="py-24 bg-[#faf8f2]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 w-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img src={productBackImg} alt="Nutritional Information" className="w-full h-auto object-cover" />
                </motion.div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-serif text-4xl font-bold mb-4 text-foreground">The Power Blend</h2>
                  <p className="text-lg text-muted-foreground mb-10">
                    Our High Protein Organic Atta is a scientifically formulated multi-grain blend designed to maximize protein intake naturally.
                  </p>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-8">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                      <span className="font-bold text-xl">Total Protein</span>
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full font-bold">16–17g per 100g</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {ingredients.map((item, idx) => (
                        <div key={idx} className={`${item.color} p-4 rounded-xl flex items-center justify-between`}>
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <span className="font-bold text-gray-900">{item.protein}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">*Protein content per 100g of individual ingredient</p>
                  </div>
                  <div className="mt-2">
                    <Product3DButton />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Product Showcase */}
        <Product3DSection />

        {/* Trust Badges */}
        <section className="py-16 bg-white border-y border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-secondary" />
                <span className="font-serif text-lg font-bold">100% Chemical-Free Farming</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-secondary" />
                <span className="font-serif text-lg font-bold">Direct From Farmers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-secondary" />
                <span className="font-serif text-lg font-bold">No Preservatives, No Adulteration</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
