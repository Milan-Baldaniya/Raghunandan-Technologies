import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import './MagicNavigation.css';

interface NavItem {
    name: string;
    url: string;
    icon: LucideIcon;
}

interface MagicNavigationProps {
    items: NavItem[];
}

export function MagicNavigation({ items }: MagicNavigationProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Update active index based on current URL hash
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#expertise'; // Default to first item if no hash
            const index = items.findIndex(item => item.url === hash);
            if (index !== -1) {
                setActiveIndex(index);
            }
        };

        // Initial check
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [items]);

    const handleItemClick = (index: number, url: string) => {
        setActiveIndex(index);
        window.location.href = url;
    };

    return (
        <div className="magic-navigation">
            <ul>
                {items.map((item, index) => (
                    <li 
                        key={index} 
                        className={`list ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleItemClick(index, item.url)}
                    >
                        <a href={item.url} onClick={(e) => e.preventDefault()}>
                            <span className="icon">
                                <item.icon size={24} />
                            </span>
                            <span className="text">{item.name}</span>
                        </a>
                    </li>
                ))}
                <div 
                    className="indicator-container" 
                    style={{ transform: `translateX(${activeIndex * 100}%)` }}
                >
                    <div className="indicator-circle"></div>
                </div>
            </ul>
        </div>
    );
}
