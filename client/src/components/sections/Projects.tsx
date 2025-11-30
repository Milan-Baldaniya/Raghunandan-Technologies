import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "STYLENX",
    category: "E-COMMERCE",
    year: "2024",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop",
    description: "Modern e-commerce platform delivering seamless shopping experiences with cutting-edge technology.",
    url: "https://stylenx.com"
  },
  {
    title: "KRUSHIWORLD",
    category: "IMPORT / EXPORT",
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop",
    description: "Global trade platform connecting agricultural producers and buyers worldwide.",
    url: "https://krushiworld.com"
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Calculate the visible cards (current + next 2)
  const visibleProjects = [
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length],
    projects[(currentIndex + 2) % projects.length],
  ];

  return (
    <section id="projects" className="py-8 lg:py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 mb-4 lg:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
          <div>
            <span className="text-cyan-400 font-mono text-sm tracking-widest block mb-2">SELECTED WORKS</span>
            <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tight">
              FEATURED <br /> PROJECTS
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Custom Card Stack */}
          <div className="relative flex justify-center h-[300px] lg:h-[500px] items-center">
            <div className="relative w-full max-w-[500px] aspect-[5/4]">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => {
                  // Index 0 is the front card, 1 is middle, 2 is back
                  const isFront = index === 0;
                  return (
                    <motion.div
                      key={`${project.title}-${index}`}
                      initial={{
                        scale: 0.9 - index * 0.05,
                        y: index * 20,
                        zIndex: 3 - index,
                        opacity: 1 - index * 0.2,
                        skewY: 6 // Initial skew
                      }}
                      animate={{
                        scale: 1 - index * 0.05,
                        y: index * -20, // Stack upwards slightly
                        zIndex: 3 - index,
                        opacity: index === 0 ? 1 : 0.6 - index * 0.1,
                        skewY: 6 // Maintain skew
                      }}
                      exit={{
                        y: -100,
                        opacity: 0,
                        scale: 1.1,
                        zIndex: 4,
                        skewY: 6
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
                      style={{
                        transformOrigin: "center center"
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      {isFront && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-0 left-0 w-full p-6"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-mono text-cyan-400">{project.category}</span>
                            <span className="text-xs font-mono text-gray-500">{project.year}</span>
                          </div>
                          <h3 className="text-2xl font-bold font-display text-white">
                            {project.title}
                          </h3>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Project Details */}
          <div className="space-y-8">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-mono uppercase tracking-wider">
                  {projects[currentIndex].category}
                </span>
                <span className="text-gray-500 font-mono text-sm">{projects[currentIndex].year}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
                {projects[currentIndex].title}
              </h3>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {projects[currentIndex].description}
              </p>

              {/* Visit Site Button */}
              <a
                href={projects[currentIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Visit Site
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
              </button>

              <div className="flex gap-2 flex-1 justify-center">
                {projects.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                      ? "bg-cyan-400 w-12"
                      : "bg-white/20 w-2 hover:bg-white/50"
                      }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>

            {/* Project Counter */}
            <div className="flex items-center justify-between text-sm font-mono text-gray-500">
              <span>PROJECT {String(currentIndex + 1).padStart(2, '0')}</span>
              <span>OF {String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
