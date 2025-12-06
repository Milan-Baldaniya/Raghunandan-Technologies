"use client";

import React, { useState, useEffect, useRef } from "react";

interface CursorProps {
    size?: number;
}

export const Cursor: React.FC<CursorProps> = ({ size = 80 }) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const previousPos = useRef({ x: -size, y: -size });

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: -size, y: -size });
    const [isInExpertise, setIsInExpertise] = useState(false);

    // Animation loop
    const animate = () => {
        if (!cursorRef.current) return;

        const currentX = previousPos.current.x;
        const currentY = previousPos.current.y;
        const targetX = position.x - size / 2;
        const targetY = position.y - size / 2;

        const deltaX = (targetX - currentX) * 0.2;
        const deltaY = (targetY - currentY) * 0.2;

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        previousPos.current = { x: newX, y: newY };
        cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleMouseMove = (e: MouseEvent) => {
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setVisible(true);
        const handleMouseLeave = () => setVisible(false);

        const checkIfInExpertise = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const expertiseSection = document.getElementById('expertise');
                if (expertiseSection) {
                    const rect = expertiseSection.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // Check if we're currently viewing the expertise section
                    const inSection = rect.top < windowHeight && rect.bottom > 0;

                    setIsInExpertise(inSection);

                    // Toggle cursor style based on section
                    if (inSection) {
                        document.body.style.cursor = "none"; // Hide native, show custom
                    } else {
                        document.body.style.cursor = "auto"; // Show native
                    }
                }
            }, 50);
        };

        // Initial check
        checkIfInExpertise();

        // Add listeners
        document.addEventListener("mousemove", handleMouseMove);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", checkIfInExpertise, { passive: true });

        // Start animation
        requestRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            clearTimeout(scrollTimeout);
            document.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", checkIfInExpertise);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            document.body.style.cursor = "auto"; // Always restore to normal
        };
    }, [position]);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-50 transition-opacity duration-300"
            style={{
                width: size,
                height: size,
                opacity: visible && isInExpertise ? 1 : 0,
            }}
            aria-hidden="true"
        />
    );
};

export default Cursor;
