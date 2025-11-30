import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Upload, Shield, Lock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
  companyUrl: z.string().url("Invalid URL").or(z.literal("")),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  skype: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      companyUrl: "",
      contactNumber: "",
      skype: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, selectedFile);
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
    setSelectedFile(null);
  }

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
          className="bg-zinc-900/30 border border-white/10 p-8 md:p-12 backdrop-blur-sm rounded-lg"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 h-12 focus-visible:ring-cyan-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 h-12 focus-visible:ring-cyan-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Company Name and URL */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company" {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 h-12 focus-visible:ring-cyan-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Company URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourcompany.com" {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 h-12 focus-visible:ring-cyan-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Contact Number and Skype */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Contact No./WhatsApp No.</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 h-12 focus-visible:ring-cyan-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Skype</FormLabel>
                      <FormControl>
                        <Input placeholder="your.skype.id" {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 h-12 focus-visible:ring-cyan-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 4: Services and Budget */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Interested In (Services)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50 border-white/20 text-white h-12 focus:ring-cyan-400">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-white/20 text-white">
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                          <SelectItem value="ecommerce">E-commerce Solutions</SelectItem>
                          <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                          <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                          <SelectItem value="consulting">IT Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Budget</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50 border-white/20 text-white h-12 focus:ring-cyan-400">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-white/20 text-white">
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your project..." {...field} className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 min-h-[150px] focus-visible:ring-cyan-400 resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NDA Notice */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  We keep all information confidential and automatically agree to the following NDA
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-white font-semibold block mb-2">Upload Your Attachment</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.zip"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 w-full h-12 bg-black/50 border-2 border-dashed border-white/20 text-gray-400 cursor-pointer hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    <span>{selectedFile ? selectedFile.name : "No file chosen"}</span>
                  </label>
                </div>
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
              <Button type="submit" className="w-full md:w-auto px-12 py-6 text-black bg-cyan-500 hover:bg-cyan-400 font-bold tracking-wider text-lg transition-all transform hover:scale-105">
                SEND MESSAGE
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
