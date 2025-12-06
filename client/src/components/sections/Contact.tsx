import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Lock, Code2, Smartphone, Palette, Layers, Server, Cloud, Briefcase, Database, Zap, TrendingUp, FileText, Blocks, Brain, Cpu, ShieldCheck, Headphones, Wrench, MoreHorizontal, Wallet, DollarSign, CreditCard, Banknote } from "lucide-react";
import { ActivityDropdown } from "@/components/ui/activity-dropdown";

const countries = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+86", name: "China", flag: "🇨🇳" },
];

const services = [
  "Web Development",
  "Mobile App Development (iOS/Android)",
  "E-commerce Solutions",
  "UI/UX Design",
  "Frontend Development (React, Vue, Angular)",
  "Backend Development (Node.js, Python, Java)",
  "Full Stack Development",
  "Cloud Services (AWS, Azure, GCP)",
  "DevOps & CI/CD",
  "Database Design & Management",
  "API Development & Integration",
  "Digital Marketing & SEO",
  "Content Management Systems (WordPress, Drupal)",
  "Blockchain Development",
  "AI/ML Solutions",
  "IoT Development",
  "Cybersecurity Services",
  "IT Consulting",
  "Maintenance & Support",
  "Other"
];

// Service dropdown items
const serviceItems = [
  { id: "web-dev", label: "Web Development", icon: <Code2 className="h-4 w-4" />, color: "#4ECDC4" },
  { id: "mobile-app", label: "Mobile App Development (iOS/Android)", icon: <Smartphone className="h-4 w-4" />, color: "#45B7D1" },
  { id: "ecommerce", label: "E-commerce Solutions", icon: <Briefcase className="h-4 w-4" />, color: "#F9C74F" },
  { id: "ui-ux", label: "UI/UX Design", icon: <Palette className="h-4 w-4" />, color: "#FF6B6B" },
  { id: "frontend", label: "Frontend Development (React, Vue, Angular)", icon: <Layers className="h-4 w-4" />, color: "#A06CD5" },
  { id: "backend", label: "Backend Development (Node.js, Python, Java)", icon: <Server className="h-4 w-4" />, color: "#6BCF7F" },
  { id: "fullstack", label: "Full Stack Development", icon: <Code2 className="h-4 w-4" />, color: "#FFB84D" },
  { id: "cloud", label: "Cloud Services (AWS, Azure, GCP)", icon: <Cloud className="h-4 w-4" />, color: "#5DADE2" },
  { id: "devops", label: "DevOps & CI/CD", icon: <Zap className="h-4 w-4" />, color: "#F39C12" },
  { id: "database", label: "Database Design & Management", icon: <Database className="h-4 w-4" />, color: "#8E44AD" },
  { id: "api", label: "API Development & Integration", icon: <Layers className="h-4 w-4" />, color: "#16A085" },
  { id: "marketing", label: "Digital Marketing & SEO", icon: <TrendingUp className="h-4 w-4" />, color: "#E74C3C" },
  { id: "cms", label: "Content Management Systems (WordPress, Drupal)", icon: <FileText className="h-4 w-4" />, color: "#3498DB" },
  { id: "blockchain", label: "Blockchain Development", icon: <Blocks className="h-4 w-4" />, color: "#F1C40F" },
  { id: "ai-ml", label: "AI/ML Solutions", icon: <Brain className="h-4 w-4" />, color: "#9B59B6" },
  { id: "iot", label: "IoT Development", icon: <Cpu className="h-4 w-4" />, color: "#1ABC9C" },
  { id: "cybersecurity", label: "Cybersecurity Services", icon: <ShieldCheck className="h-4 w-4" />, color: "#E67E22" },
  { id: "consulting", label: "IT Consulting", icon: <Headphones className="h-4 w-4" />, color: "#34495E" },
  { id: "maintenance", label: "Maintenance & Support", icon: <Wrench className="h-4 w-4" />, color: "#95A5A6" },
  { id: "other", label: "Other", icon: <MoreHorizontal className="h-4 w-4" />, color: "#7F8C8D" },
];

// Budget dropdown items
const budgetItems = [
  { id: "below-15000", label: "Below ₹15,000", icon: <Wallet className="h-4 w-4" />, color: "#4ECDC4" },
  { id: "15000-30000", label: "₹15,000 - ₹30,000", icon: <DollarSign className="h-4 w-4" />, color: "#45B7D1" },
  { id: "30000-50000", label: "₹30,000 - ₹50,000", icon: <CreditCard className="h-4 w-4" />, color: "#F9C74F" },
  { id: "above-50000", label: "Above ₹50,000", icon: <Banknote className="h-4 w-4" />, color: "#FF6B6B" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    companyUrl: "",
    countryCode: "+91",
    contactNumber: "",
    service: "",
    projectIdea: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.companyName || formData.companyName.length < 2) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.contactNumber || formData.contactNumber.length < 10) {
      newErrors.contactNumber = "Contact number must be at least 10 digits";
    }
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }
    if (!formData.projectIdea || formData.projectIdea.length < 10) {
      newErrors.projectIdea = "Please describe your project idea (min 10 characters)";
    }
    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
    }
    // if (!formData.message || formData.message.length < 10) {
    //   newErrors.message = "Message must be at least 10 characters";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          alert("Message Sent Successfully! ✓\n\nWe'll get back to you as soon as possible.");

          // Reset form
          setFormData({
            name: "",
            email: "",
            companyName: "",
            companyUrl: "",
            countryCode: "+91",
            contactNumber: "",
            service: "",
            projectIdea: "",
            budget: "",
            message: "",
          });
          setErrors({});
        } else {
          alert("Failed to send message. Please try again later.");
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-4 text-white">LET'S TALK</h2>
          <p className="text-gray-400 text-lg">Questions? Comments? We'd love to hear from you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 border border-white/10 p-8 md:p-12 backdrop-blur-sm rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-white font-semibold text-sm">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-12 px-4 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors rounded"
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-white font-semibold text-sm">
                  Your Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-12 px-4 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors rounded"
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>
            </div>

            {/* Row 2: Company Name and URL */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="companyName" className="block text-white font-semibold text-sm">
                  Company Name *
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full h-12 px-4 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors rounded"
                />
                {errors.companyName && <p className="text-red-400 text-xs">{errors.companyName}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="companyUrl" className="block text-white font-semibold text-sm">
                  Company URL <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="companyUrl"
                  type="text"
                  name="companyUrl"
                  value={formData.companyUrl}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="w-full h-12 px-4 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors rounded"
                />
              </div>
            </div>

            {/* Row 3: Contact Number */}
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="block text-white font-semibold text-sm">
                Contact/WhatsApp No. *
              </label>
              <div className="flex gap-1.5 md:gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-20 md:w-28 h-12 px-1.5 md:px-3 bg-black/50 border-2 border-white/20 text-white focus:border-cyan-400 focus:outline-none transition-colors rounded text-xs md:text-base flex-shrink-0"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code} className="bg-zinc-900">
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  id="contactNumber"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="flex-1 min-w-0 h-12 px-3 md:px-4 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors rounded"
                />
              </div>
              {errors.contactNumber && <p className="text-red-400 text-xs">{errors.contactNumber}</p>}
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <label htmlFor="service" className="block text-white font-semibold text-sm">
                Interested In (Services/Technologies) *
              </label>
              <ActivityDropdown
                items={serviceItems}
                placeholder="Select a service"
                value={formData.service}
                onChange={(item) => {
                  setFormData(prev => ({ ...prev, service: item.label }));
                  if (errors.service) {
                    setErrors(prev => ({ ...prev, service: "" }));
                  }
                }}
              />
              {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
            </div>

            {/* Project Idea */}
            <div className="space-y-2">
              <label htmlFor="projectIdea" className="block text-white font-semibold text-sm">
                Project Idea *
              </label>
              <textarea
                id="projectIdea"
                name="projectIdea"
                value={formData.projectIdea}
                onChange={handleChange}
                placeholder="Describe your project idea in detail..."
                rows={5}
                className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded"
              />
              {errors.projectIdea && <p className="text-red-400 text-xs">{errors.projectIdea}</p>}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label htmlFor="budget" className="block text-white font-semibold text-sm">
                Project Budget (₹) *
              </label>
              <ActivityDropdown
                items={budgetItems}
                placeholder="Select budget range"
                value={formData.budget}
                onChange={(item) => {
                  setFormData(prev => ({ ...prev, budget: item.id }));
                  if (errors.budget) {
                    setErrors(prev => ({ ...prev, budget: "" }));
                  }
                }}
              />
              {errors.budget && <p className="text-red-400 text-xs">{errors.budget}</p>}
            </div>

            {/* Additional Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-white font-semibold text-sm">
                Additional Message <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any additional information you'd like to share..."
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded"
              />
              {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
            </div>

            {/* NDA Notice */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                We keep all information confidential and automatically agree to the following NDA
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-zinc-800/50 border border-white/10 p-4 rounded-lg flex items-start gap-3">
              <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-400">
                <p className="font-semibold text-white mb-1">We guarantee 100% Security of your information</p>
                <p>We will not share the details you provide above with anyone. Your email won't be used for spamming.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 text-black bg-cyan-500 hover:bg-cyan-400 font-bold tracking-wider text-lg transition-all transform hover:scale-105 rounded"
            >
              SEND MESSAGE
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
