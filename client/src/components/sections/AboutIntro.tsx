import { motion } from "framer-motion";
import { Shield, Users, Target, Lightbulb, Clock, TrendingUp } from "lucide-react";

const coreValues = [
    {
        icon: Target,
        title: "Client-Centric Approach",
        description: "Your success is our mission. We develop deep partnerships to understand your vision and deliver solutions that exceed expectations."
    },
    {
        icon: Shield,
        title: "Trust & Quality",
        description: "We deliver production-ready code that meets the highest quality standards, on time and within budget. Your trust drives our excellence."
    },
    {
        icon: Users,
        title: "Collaborative Partnership",
        description: "From daily standups to strategic planning, you're part of our team. We believe in transparent communication and shared success."
    },
    {
        icon: TrendingUp,
        title: "Budget Transparency",
        description: "Real-time reporting keeps you in control. Track development costs, milestones, and ROI with complete visibility."
    },
    {
        icon: Clock,
        title: "Agile Delivery",
        description: "Fast iterations, continuous feedback, and adaptive planning ensure we deliver value at every stage of your journey."
    },
    {
        icon: Lightbulb,
        title: "Innovation First",
        description: "Complex challenges require creative solutions. We leverage cutting-edge technology and collective expertise to build products that fit your vision perfectly."
    }
];

export default function AboutIntro() {
    return (
        <section id="about" className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-8"
                    >
                        <span className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-base md:text-lg font-mono uppercase tracking-wider">
                            About Us
                        </span>
                    </motion.div>

                    <p className="text-xl text-gray-300 leading-relaxed mb-6">
                        We believe in our clients and our strength lies in developing close working relationships to help them succeed. This enables us to create, and deliver, value at every stage of our clients' journey.
                    </p>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        We foster a work environment where people can communicate openly and encourage feedback to help us learn and grow. At <span className="text-cyan-400 font-semibold">Raghunandan Technologies</span>, we don't just talk about integrity—we demonstrate it through our work ethics, our behavior towards our employees, and our dealings with clients.
                    </p>
                </motion.div>

                {/* Core Values Grid */}
                <div className="max-w-7xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold font-display text-center mb-16"
                    >
                        Our Core Values
                    </motion.h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative p-8 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 h-full">
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-500" />

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="w-14 h-14 mb-6 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:scale-110">
                                            <value.icon className="w-7 h-7 text-cyan-400" />
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-xl font-bold font-display mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                                            {value.title}
                                        </h4>

                                        {/* Description */}
                                        <p className="text-gray-400 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Honoring commitments, whether towards our employees or our clients, is something we hold in very high regard. Let's build something extraordinary together.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
