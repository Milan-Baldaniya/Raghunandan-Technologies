import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-4">LET'S BUILD THE FUTURE</h2>
          <p className="text-gray-400">Ready to start your project? Get in touch.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/30 border border-white/10 p-8 md:p-12 backdrop-blur-sm"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-display tracking-wide">NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 h-12 rounded-none focus-visible:ring-white/20" />
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
                      <FormLabel className="text-white font-display tracking-wide">EMAIL</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 h-12 rounded-none focus-visible:ring-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-display tracking-wide">MESSAGE</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your project..." {...field} className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 min-h-[150px] rounded-none focus-visible:ring-white/20 resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-auto px-12 py-6 text-black bg-white hover:bg-gray-200 rounded-none font-bold tracking-wider text-lg transition-colors">
                SEND MESSAGE
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
