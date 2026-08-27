// Minimal Node/Express backend for server-side jobs Firestore's client SDK
// can't (or shouldn't) do directly: sending confirmation emails, and a
// server-verified CSV export endpoint for the admin inbox.
//
// This is optional — the web app works standalone against Firestore. Run this
// only if you want real emails sent on event registration instead of the
// toast-only confirmation the client already shows.

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Called by the web app after a successful event registration
app.post('/api/send-confirmation', async (req, res) => {
  const { email, name, eventTitle, date, location } = req.body || {};
  if (!email || !eventTitle) {
    return res.status(400).json({ error: 'email and eventTitle are required' });
  }

  if (!transporter) {
    console.log(`[demo] Would email ${email}: confirmed for "${eventTitle}"`);
    return res.json({ sent: false, demo: true });
  }

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: `You're registered: ${eventTitle}`,
      text: `Hi ${name || 'there'},\n\nYou're confirmed for "${eventTitle}" on ${date} at ${location}.\n\n— Astack Foundation`,
    });
    res.json({ sent: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Astack API listening on port ${port}`));
