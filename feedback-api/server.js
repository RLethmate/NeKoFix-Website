const express = require('express');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TO_EMAIL = process.env.TO_EMAIL || GMAIL_USER;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://nekofix.de,https://www.nekofix.de')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error('GMAIL_USER und GMAIL_APP_PASSWORD müssen als Umgebungsvariablen gesetzt sein.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  // Explizit Port 587 (STARTTLS) statt der "service: 'gmail'"-Kurzform, die auf den
  // bei vielen Cloud-Hostern (auch hier) blockierten Port 465 (SMTPS) zurückfällt.
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
});

// Sehr einfaches In-Memory-Rate-Limit: max. 5 Einsendungen pro IP und Stunde.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = submissionsByIp.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    submissionsByIp.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Räumt abgelaufene Einträge aktiv aus dem Speicher, statt sie unbegrenzt liegen zu lassen
// (Datenschutzerklärung Ziffer 4/5 verspricht "danach automatisch verworfen").
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of submissionsByIp) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      submissionsByIp.delete(ip);
    }
  }
}, 10 * 60 * 1000);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
app.set('trust proxy', true);
app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/feedback', async (req, res) => {
  const { name, email, type, message, website } = req.body || {};

  // Honeypot: verstecktes Feld, das nur Bots ausfüllen. Stillschweigend "erfolgreich"
  // antworten, ohne tatsächlich eine Mail zu verschicken, um Bots nicht zu verraten,
  // dass sie erkannt wurden.
  if (website) {
    return res.json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, E-Mail und Nachricht sind Pflichtfelder.' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ ok: false, error: 'Ungültige E-Mail-Adresse.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ ok: false, error: 'Nachricht ist zu lang.' });
  }

  if (isRateLimited(req.ip)) {
    return res.status(429).json({ ok: false, error: 'Zu viele Anfragen. Bitte später erneut versuchen.' });
  }

  try {
    await transporter.sendMail({
      from: GMAIL_USER,
      to: TO_EMAIL,
      replyTo: email,
      subject: `NeKoFix Feedback (${type || 'Sonstiges'}) von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nKategorie: ${type || 'Sonstiges'}\n\nNachricht:\n${message}`,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Feedback-Mail konnte nicht gesendet werden:', err);
    res.status(500).json({ ok: false, error: 'E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen.' });
  }
});

app.listen(PORT, () => {
  console.log(`Feedback-API läuft auf Port ${PORT}`);
});
