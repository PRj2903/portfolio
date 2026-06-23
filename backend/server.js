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
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// POST endpoint for contact submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { user_name, user_email, subject, message } = req.body;

    if (!user_name || !user_email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = {
      id: Date.now().toString(),
      name: user_name,
      email: user_email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    // 1. Read existing messages
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf8');
        messages = JSON.parse(fileContent || '[]');
      } catch (err) {
        console.error('Error reading messages file, resetting layout:', err);
      }
    }

    // 2. Append new message and write back
    messages.push(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
    console.log(`Saved message from ${user_name} (${user_email}): "${subject}"`);

    // 3. Optional Nodemailer forwarding
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"${user_name}" <${process.env.SMTP_USER}>`,
          to: process.env.FORWARD_TO || process.env.SMTP_USER,
          replyTo: user_email,
          subject: `Portfolio Contact: ${subject}`,
          text: `You received a message from: ${user_name} (${user_email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Successfully forwarded message via SMTP');
      } catch (mailError) {
        console.error('SMTP forwarding failed (message was saved locally anyway):', mailError.message);
      }
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// GET endpoint to view messages (just for testing / validation)
app.get('/api/messages', (req, res) => {
  if (fs.existsSync(MESSAGES_FILE)) {
    const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return res.json(JSON.parse(fileContent || '[]'));
  }
  return res.json([]);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
