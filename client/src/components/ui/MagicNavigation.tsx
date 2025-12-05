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

    // Update active index based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            // On mobile, we want to check which section is currently "in focus"
            // A good heuristic is checking the center of the viewport or a bit higher
            const checkPosition = window.scrollY + (window.innerHeight / 3);

            // Find the current section
            let currentindex = -1;

            // We iterate through all items to find the one that contains the checkPosition
            items.forEach((item, index) => {
                const element = document.querySelector(item.url);
                if (element) {
                    const { offsetTop, offsetHeight } = element as HTMLElement;
                    // Check if the checkPosition is within this section
                    if (checkPosition >= offsetTop && checkPosition < offsetTop + offsetHeight) {
                        currentindex = index;
                    }
                }
            });

            // If we found a matching section, update the index
            if (currentindex !== -1) {
                setActiveIndex(currentindex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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
