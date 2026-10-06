import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Ephemeral /tmp for Vercel; root folder locally
const MESSAGES_FILE = process.env.VERCEL
  ? path.join('/tmp', 'messages.json')
  : path.join(__dirname, '..', 'messages.json');

// POST endpoint for contact submissions
app.post(['/api/contact', '/contact', '/api', '/'], async (req, res) => {
  try {
    const { user_name, user_email, subject, message } = req.body || {};

    if (!user_name || !user_email || !subject || !message) {
      return res.status(400).json({ error: 'All fields (Name, Email, Subject, Message) are required.' });
    }

    const newMessage = {
      id: Date.now().toString(),
      name: user_name,
      email: user_email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    // 1. Read & Append to messages file
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf8');
        messages = JSON.parse(fileContent || '[]');
      } catch (err) {
        console.error('Error reading messages file:', err);
      }
    }

    try {
      messages.push(newMessage);
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
      console.log(`Saved message from ${user_name} (${user_email}): "${subject}"`);
    } catch (fsErr) {
      console.warn('Could not persist to messages.json:', fsErr.message);
    }

    // 2. Nodemailer forwarding via Gmail SMTP (port 465 SSL)
    const smtpUser = (process.env.SMTP_USER || 'jpratham9716@gmail.com').trim();
    const smtpPass = (process.env.SMTP_PASS || 'nhytsrpxnrvivurl').replace(/\s+/g, '');
    const recipient = (process.env.FORWARD_TO || smtpUser || 'jpratham9716@gmail.com').trim();

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"Portfolio Contact Form" <${smtpUser}>`,
        to: recipient,
        replyTo: user_email,
        subject: `[Portfolio Inquiry] ${subject} - from ${user_name}`,
        text: `You received a new inquiry from your portfolio!\n\nName: ${user_name}\nEmail: ${user_email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
            <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #1e3a8a; margin: 0; font-size: 20px;">📬 New Portfolio Contact Inquiry</h2>
            </div>
            <p style="margin: 8px 0; font-size: 15px;"><strong>From:</strong> ${user_name} (&lt;<a href="mailto:${user_email}" style="color: #1e3a8a; text-decoration: none;">${user_email}</a>&gt;)</p>
            <p style="margin: 8px 0; font-size: 15px;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 8px 0; font-size: 13px; color: #64748b;"><strong>Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #1e3a8a;">
              <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 14px;">Message:</h4>
              <p style="white-space: pre-wrap; margin: 0; color: #1e293b; font-size: 15px; line-height: 1.6;">${message}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              Sent via Pratham's Portfolio Contact Form &bull; Reply to this email to reply directly to ${user_email}
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Successfully forwarded message via SMTP to ${recipient}`);
    } catch (mailError) {
      console.error('SMTP email forwarding error:', mailError.message);
    }

    return res.status(200).json({ success: true, message: 'Message sent and logged successfully.' });
  } catch (error) {
    console.error('Error in contact handler:', error);
    return res.status(500).json({ error: error.message || 'Server error occurred.' });
  }
});

// GET endpoint to view messages
app.get(['/api/messages', '/messages'], (req, res) => {
  if (fs.existsSync(MESSAGES_FILE)) {
    const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return res.json(JSON.parse(fileContent || '[]'));
  }
  return res.json([]);
});

// Serve frontend if dist exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
