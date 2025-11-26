import { NavBar } from "@/components/ui/tubelight-navbar";
import Dock from "@/components/ui/Dock";
import { Cpu, Code2, Layers, Terminal } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
    const [, setLocation] = useLocation();

    const menuItems = [
        { name: "Expertise", url: "#expertise", icon: Cpu },
        { name: "About Us", url: "#about", icon: Code2 },
        { name: "Projects", url: "#projects", icon: Layers },
        { name: "Connect", url: "#contact", icon: Terminal },
    ];

    const dockItems = [
        {
            icon: <Cpu size={18} />,
            label: 'Expertise',
            onClick: () => { window.location.href = '#expertise'; }
        },
        {
            icon: <Code2 size={18} />,
            label: 'About Us',
            onClick: () => { window.location.href = '#about'; }
        },
        {
            icon: <Layers size={18} />,
            label: 'Projects',
            onClick: () => { window.location.href = '#projects'; }
        },
        {
            icon: <Terminal size={18} />,
            label: 'Connect',
            onClick: () => { window.location.href = '#contact'; }
        },
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <NavBar
                    items={menuItems}
                    logo={
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/RT_LOGO.png" alt="Raghunandan Technologies" className="h-10 w-auto scale-125" />
                        </Link>
                    }
                />
            </div>

            {/* Mobile Dock */}
            <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <Dock
                        items={dockItems}
                        panelHeight={80}
                        baseItemSize={60}
                        magnification={80}
                        alwaysShowLabels={true}
                    />
                </div>
            </div>

            {/* Mobile Logo (Top Left) */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Link href="/" className="flex items-center gap-3 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                    <img src="/RT_LOGO.png" alt="Raghunandan Technologies" className="h-8 w-auto" />
                    <span className="text-white font-bold text-sm tracking-wide pr-2">Raghunandan Technologies</span>
                </Link>
            </div>
        </>
    );
}
