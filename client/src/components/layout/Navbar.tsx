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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Expertise", href: "#expertise", icon: Cpu },
    { name: "Projects", href: "#projects", icon: Code2 },
    { name: "Company", href: "#about", icon: Layers },
    { name: "Connect", href: "#contact", icon: Terminal },
  ];

  return (
    <>
      {/* 3D Floating Navbar (Desktop) */}
      <motion.nav
        initial={{ y: -100, opacity: 0, rotateX: 20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        className="fixed top-8 inset-x-0 z-50 hidden md:flex justify-center pointer-events-none perspective-1000"
      >
        <div 
            className={cn(
                "pointer-events-auto flex items-center gap-2 p-2 rounded-full border transition-all duration-500 backdrop-blur-xl transform-gpu hover:scale-105",
                scrolled 
                    ? "bg-black/60 border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] translate-y-0" 
                    : "bg-black/40 border-white/5 translate-y-2"
            )}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Logo Pill */}
            <Link href="/">
                <a className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-white to-gray-200 text-black rounded-full font-bold tracking-tighter hover:to-cyan-300 transition-all shadow-lg">
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    NXT
                </a>
            </Link>

            {/* Links Pill */}
            <div className="flex items-center bg-black/40 rounded-full px-2 border border-white/5 shadow-inner">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="relative px-5 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                    >
                        <span className="relative z-10 mix-blend-difference">{item.name}</span>
                        {location === item.href && (
                            <motion.div 
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white rounded-full -z-0 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2 shadow-[0_0_10px_#22d3ee]" />
                    </a>
                ))}
            </div>

            {/* CTA Pill */}
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-sm hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all flex items-center gap-2 group shadow-[0_0_20px_-5px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                Start <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full bg-black/80 border border-white/10 backdrop-blur-md flex items-center justify-center text-white"
        >
            {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.5, ease: "circInOut" }}
                className="fixed inset-0 bg-zinc-950 z-40 flex flex-col justify-center px-8"
            >
                <div className="flex flex-col gap-6">
                    {menuItems.map((item, i) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-6 text-4xl font-bold font-display text-white/50 hover:text-white transition-colors group"
                        >
                            <item.icon className="w-8 h-8 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="group-hover:translate-x-4 transition-transform duration-300">{item.name}</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
