"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for a single project
type Project = {
    id: string | number;
    title: string;
    category: string;
    description: string;
    imageSrc: string;
    thumbnailSrc: string;
    url: string;
    tags: string[];
};

// Define the props for the slider component
interface ProjectSliderProps {
    projects: Project[];
    /** Optional class name for the container */
    className?: string;
}

/**
 * A reusable, animated project slider component.
 * It uses framer-motion for animations and is styled with
 * shadcn/ui theme variables.
 */
export const ProjectSlider = ({
    projects,
    className,
}: ProjectSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // 'direction' helps framer-motion understand slide direction (next vs. prev)
    const [direction, setDirection] = useState<"left" | "right">("right");

    const activeProject = projects[currentIndex];

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setDirection("left");
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const handleThumbnailClick = (index: number) => {
        // Determine direction for animation
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    // Get the next 3 projects for the thumbnails, excluding the current one
    const thumbnailProjects = projects
        .filter((_, i) => i !== currentIndex)
        .slice(0, 3);

    // Animation variants for the main image
    const imageVariants = {
        enter: (direction: "left" | "right") => ({
            y: direction === "right" ? "100%" : "-100%",
            opacity: 0,
        }),
        center: { y: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            y: direction === "right" ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    // Animation variants for the text content
    const textVariants = {
        enter: (direction: "left" | "right") => ({
            x: direction === "right" ? 50 : -50,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            x: direction === "right" ? -50 : 50,
            opacity: 0,
        }),
    };

    return (
        <div
            className={cn(
                "relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-black text-white p-8 md:p-12 pointer-events-none",
                className
            )}
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                {/* === Left Column: Meta and Thumbnails === */}
                <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1 relative" style={{ zIndex: 20 }}>
                    <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
                        {/* Pagination */}
                        <span className="text-sm text-gray-400 font-mono">
                            {String(currentIndex + 1).padStart(2, "0")} /{" "}
                            {String(projects.length).padStart(2, "0")}
                        </span>
                        {/* Vertical "Projects" Text */}
                        <h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block text-gray-400">
                            Projects
                        </h2>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex space-x-2 mt-8 md:mt-0 relative">
                        {thumbnailProjects.map((project) => {
                            // Find the original index to navigate to
                            const originalIndex = projects.findIndex(
                                (r) => r.id === project.id
                            );
                            return (
                                <button
                                    type="button"
                                    key={project.id}
                                    onClick={() => handleThumbnailClick(originalIndex)}
                                    className="overflow-hidden rounded-md w-16 h-20 md:w-20 md:h-24 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black cursor-pointer relative pointer-events-auto"
                                    aria-label={`View project ${project.title}`}
                                >
                                    <img
                                        src={project.thumbnailSrc}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* === Center Column: Main Image === */}
                <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-1 md:order-2" style={{ zIndex: 10 }}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={activeProject.imageSrc}
                            alt={activeProject.title}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                    </AnimatePresence>
                </div>

                {/* === Right Column: Text and Navigation === */}
                <div className="md:col-span-5 flex flex-col justify-between md:pl-8 order-3 md:order-3 relative" style={{ zIndex: 40 }}>
                    {/* Text Content */}
                    <div className="relative overflow-hidden pt-4 md:pt-24 min-h-[200px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
                                    {activeProject.category}
                                </p>
                                <h3 className="text-3xl font-bold mt-2 mb-4">
                                    {activeProject.title}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {activeProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                                    {activeProject.description}
                                </p>

                                {/* Visit Site Button */}
                                <a
                                    href={activeProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer relative pointer-events-auto"
                                    style={{ zIndex: 100 }}
                                >
                                    Visit Site
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center space-x-2 mt-8 md:mt-0 relative" style={{ zIndex: 100 }}>
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="inline-flex items-center justify-center rounded-full w-12 h-12 border-2 border-white/20 hover:bg-white/10 hover:border-cyan-400/50 text-white cursor-pointer relative transition-all duration-300 pointer-events-auto"
                            aria-label="Previous project"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex items-center justify-center rounded-full w-12 h-12 bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer relative transition-all duration-300 pointer-events-auto"
                            aria-label="Next project"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
