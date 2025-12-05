import nodemailer from "nodemailer";

interface ContactFormData {
    name: string;
    email: string;
    companyName: string;
    companyUrl?: string;
    countryCode: string;
    contactNumber: string;
    service: string;
    projectIdea: string;
    budget: string;
    message: string;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "raghunandantechnologies@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendContactEmail(data: ContactFormData) {
    const {
        name,
        email,
        companyName,
        companyUrl,
        countryCode,
        contactNumber,
        service,
        projectIdea,
        budget,
        message,
    } = data;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #000000;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #111111;
          border: 1px solid #333333;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #000000;
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #333333;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          color: #888888;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .value {
          color: #ffffff;
          font-size: 16px;
          line-height: 1.5;
          background-color: #000000;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #222222;
        }
        .footer {
          background-color: #000000;
          padding: 20px;
          text-align: center;
          color: #666666;
          font-size: 12px;
          border-top: 1px solid #333333;
        }
        .highlight {
          color: #06b6d4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Project <span class="highlight">Inquiry</span></h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></div>
          </div>

          <div class="field">
            <div class="label">Company</div>
            <div class="value">${companyName}</div>
          </div>

          ${companyUrl ? `
          <div class="field">
            <div class="label">Company URL</div>
            <div class="value"><a href="${companyUrl}" style="color: #06b6d4; text-decoration: none;">${companyUrl}</a></div>
          </div>
          ` : ''}

          <div class="field">
            <div class="label">Contact Number</div>
            <div class="value">${countryCode} ${contactNumber}</div>
          </div>

          <div class="field">
            <div class="label">Service Interest</div>
            <div class="value" style="color: #06b6d4;">${service}</div>
          </div>

          <div class="field">
            <div class="label">Budget Range</div>
            <div class="value">${budget}</div>
          </div>

          <div class="field">
            <div class="label">Project Idea</div>
            <div class="value">${projectIdea}</div>
          </div>

          <div class="field">
            <div class="label">Additional Message</div>
            <div class="value">${message}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Raghunandan Technologies contact form.</p>
          <p>&copy; ${new Date().getFullYear()} Raghunandan Technologies. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
        from: `"Raghunandan Technologies Form" <raghunandantechnologies@gmail.com>`,
        to: "raghunandantechnologies@gmail.com",
        subject: `New Inquiry: ${service} - ${name}`,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
}

export async function sendAutoReplyEmail(data: ContactFormData) {
    const { name, email } = data;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #000000;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #111111;
          border: 1px solid #333333;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #000000;
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #333333;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .content {
          padding: 30px;
          text-align: center;
        }
        .footer {
          background-color: #000000;
          padding: 20px;
          text-align: center;
          color: #666666;
          font-size: 12px;
          border-top: 1px solid #333333;
        }
        .highlight {
          color: #06b6d4;
        }
        p {
          line-height: 1.6;
          color: #cccccc;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank <span class="highlight">You</span></h1>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to Raghunandan Technologies.</p>
          <p>We have received your project inquiry and our team will review it shortly. We aim to respond to all inquiries within 24 hours.</p>
          <p>In the meantime, feel free to browse our portfolio or check out our latest updates.</p>
          <br>
          <p>Best Regards,<br>The Raghunandan Technologies Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Raghunandan Technologies. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const mailOptions = {
        from: `"Raghunandan Technologies" <raghunandantechnologies@gmail.com>`,
        to: email,
        subject: `We've received your inquiry - Raghunandan Technologies`,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
}
