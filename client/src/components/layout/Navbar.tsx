import { NavBar } from "@/components/ui/tubelight-navbar";
import { Cpu, Code2, Layers, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Navbar() {
    const menuItems = [
        { name: "Expertise", url: "#expertise", icon: Cpu },
        { name: "Projects", url: "#projects", icon: Code2 },
        { name: "Company", url: "#about", icon: Layers },
        { name: "Connect", url: "#contact", icon: Terminal },
    ];

    return (
        <NavBar
            items={menuItems}
            logo={
                <Link href="/">
                    <a className="flex items-center gap-2">
                        <img src="/RT_LOGO.png" alt="Raghunandan Technologies" className="h-10 w-auto scale-125" />
                    </a>
                </Link>
            }
        />
    );
}
