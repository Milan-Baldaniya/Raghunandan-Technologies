import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "#services" },
    { name: "Technologies", href: "#expertise" },
    { name: "Case Studies", href: "#work" },
    { name: "Methodology", href: "#process" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/5 backdrop-blur-md",
          isScrolled ? "bg-black/90 py-4" : "bg-black/0 py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold font-display tracking-tighter text-white">
              NEXTECH
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
           <div className="hidden md:flex">
            <button className="px-6 py-2.5 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
                Start a Project
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-bold font-display text-white hover:text-gray-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
               <a
                  href="#contact"
                  className="text-3xl font-bold font-display text-gray-500 hover:text-white transition-colors mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get In Touch
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
