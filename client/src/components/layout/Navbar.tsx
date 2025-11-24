import { Link } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
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
    { name: "Services", href: "#services" },
    { name: "Expertise", href: "#expertise" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
        )}
      >
        <div className={cn(
            "max-w-7xl mx-auto rounded-full border border-white/10 backdrop-blur-xl bg-black/50 px-8 h-16 flex items-center justify-between transition-all duration-300",
            isScrolled ? "bg-black/80 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "bg-transparent border-transparent"
        )}>
          <Link href="/">
            <a className="text-xl font-bold font-display tracking-tighter flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              NEXTECH
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
           <div className="hidden md:flex">
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-full">
                Start Project <ArrowRight className="w-3 h-3" />
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
      </motion.nav>

      {/* Full Screen Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-bold font-display hover:text-gray-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
               <a
                  href="#contact"
                  className="text-4xl font-bold font-display text-transparent text-stroke hover:text-white transition-colors mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GET IN TOUCH
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
