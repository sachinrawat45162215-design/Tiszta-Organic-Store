import { Link } from "wouter";
import { Wheat } from "lucide-react";
import { SiInstagram, SiGmail } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 inline-flex">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                <Wheat className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold">
                TISZTA Organic
              </span>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm mb-6">
              From Soil to Soul – 100% Pure Organic Living. Providing clean, nutritious, and chemical-free food for healthier families.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/tiszta_organic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:tisztaorganic@gmail.com" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <SiGmail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Our Promise</h3>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                100% Chemical-Free Farming
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                Direct From Farmers
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                No Preservatives, No Adulteration
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} TISZTA Organic. All rights reserved.</p>
          <p>Pure Organic Living</p>
        </div>
      </div>
    </footer>
  );
}
