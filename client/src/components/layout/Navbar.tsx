import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Terminal, Cpu, Code2, Layers } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Works", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/">
                <a className="text-2xl font-bold font-display tracking-tighter flex items-center gap-2">
                    NXT
                </a>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        {item.name}
                    </a>
                ))}
                <button className="px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                    Start Project
                </button>
            </div>

            <button 
                className="md:hidden text-white"
                onClick={() => setIsOpen(true)}
            >
                <Menu />
            </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
                className="fixed inset-0 bg-black z-[60] flex flex-col p-8"
            >
                <div className="flex justify-end mb-12">
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <X size={32} />
                    </button>
                </div>
                <div className="flex flex-col gap-8">
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-bold font-display uppercase tracking-tight hover:text-gray-400 transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
