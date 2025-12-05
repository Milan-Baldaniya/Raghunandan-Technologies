import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, companyName, companyUrl, countryCode, contactNumber, service, projectIdea, budget, message } = req.body;

      // Log the contact form submission
      console.log('\n=== NEW CONTACT FORM SUBMISSION ===');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Company Name:', companyName);
      console.log('Company URL:', companyUrl || 'Not provided');
      console.log('Contact Number:', `${countryCode} ${contactNumber}`);
      console.log('Service:', service);
      console.log('Project Idea:', projectIdea);
      console.log('Budget:', budget);
      console.log('Message:', message);
      console.log('Timestamp:', new Date().toLocaleString());
      console.log('===================================\n');

      // TODO: Set up email service
      // For now, form submissions are logged to the console
      // To enable email sending, you can:
      // 1. Use a service like SendGrid, Mailgun, or AWS SES
      // 2. Set up Gmail with App Password (requires 2-Step Verification)
      // 3. Use a contact form service like Formspree or EmailJS

      // Send the form data to raghunandantechnologies@gmail.com
      // You can manually check the server console for submissions
      // or set up one of the email services mentioned above

      res.json({
        success: true,
        message: 'Contact form submitted successfully. We will get back to you soon!'
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit form. Please try again later.'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
