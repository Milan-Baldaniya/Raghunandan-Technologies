import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendAutoReplyEmail } from "./email";

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

      // Send email
      await sendContactEmail(req.body);
      await sendAutoReplyEmail(req.body);
      console.log('Email sent successfully');

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
