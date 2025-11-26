import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";
import { Spotlight } from "@/components/ui/spotlight";

export default function Hero() {
    return (
        <section id="expertise" className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Spotlight Effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Background gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
            </div>

            {/* Split Layout Container */}
            <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col md:flex-row items-center">

                {/* Left Side - Hero Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 py-4 md:py-0"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                            Raghunandan Technologies
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-4 leading-[0.9] text-white">
                        WE WORK ON <br />
                        <span className="text-transparent text-stroke hover:text-white transition-colors duration-500 cursor-default">INNOVATION</span>
                    </h1>

                    <div className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed border-l-2 border-white/20 pl-6 overflow-hidden h-[180px] relative">
                        <motion.div
                            animate={{
                                y: [0, -100, -200, -300, -400, -500, -600, 0]
                            }}
                            transition={{
                                duration: 110,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <p className="mb-8">
                                Pioneering <span className="text-cyan-400 font-semibold">AI Data-Labeling</span> and <span className="text-cyan-400 font-semibold">AI Training-Data Services</span> to power the next generation of intelligent systems.
                            </p>
                            <p className="mb-8">
                                Crafting cutting-edge <span className="text-cyan-400 font-semibold">Web Development</span> solutions that deliver exceptional user experiences and drive business growth.
                            </p>
                            <p className="mb-8">
                                Building intelligent applications with <span className="text-cyan-400 font-semibold">AI & Machine Learning</span> technologies that transform data into actionable insights.
                            </p>
                            <p className="mb-8">
                                Deploying scalable <span className="text-cyan-400 font-semibold">Cloud Infrastructure</span> solutions on AWS, Azure, and GCP for seamless operations.
                            </p>
                            <p className="mb-8">
                                Creating innovative <span className="text-cyan-400 font-semibold">Mobile & App Development</span> solutions for iOS, Android, and cross-platform experiences.
                            </p>
                            <p className="mb-8">
                                Securing your digital assets with comprehensive <span className="text-cyan-400 font-semibold">Cyber Security</span> solutions and threat protection.
                            </p>
                            <p className="mb-8">
                                Delivering end-to-end technology solutions that empower businesses to thrive in the digital age.
                            </p>
                        </motion.div>
                    </div>


                </motion.div>

                {/* Right Side - 3D Scene */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 relative h-[700px] md:h-[600px] w-full"
                >
                    <div className="absolute inset-0 scale-[2] -translate-y-20 md:scale-100 md:translate-y-0">
                        <SplineScene
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="w-full h-full"
                            eager={true}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </section >
    );
}
