import { Link } from "wouter";
import { Wheat, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
              <Wheat className="w-6 h-6" />
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground">
              TISZTA Organic
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Button asChild className="rounded-full px-6 font-semibold">
              <Link href="/products">Shop Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b shadow-lg py-4 px-4 flex flex-col gap-4">
          <Link
            href="/"
            className="text-lg font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-lg font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Button asChild className="w-full rounded-full mt-2">
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>Shop Now</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
