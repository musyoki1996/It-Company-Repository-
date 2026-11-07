import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(express.json());

// Helper to read database
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = {
        settings: {
          companyName: "INFRANOVIX TECHNOLOGIES",
          slogan: "INNOVATE. INTEGRATE. ELEVATE.",
          email: "info@infranovix.co.ke",
          supportEmail: "support@infranovix.co.ke",
          phone: "+254 (0) 714 664 379",
          whatsappNumber: "254714664379",
          officeLocation: "Westlands Commercial Hub, Nairobi, Kenya",
          operatingHours: "Monday – Friday: 8:00 AM – 5:30 PM (EAT)",
          postalAddress: "P.O. Box 45820-00100, Nairobi, Kenya",
          adminPin: "infranovix2026",
          social: {
            linkedin: "https://linkedin.com/company/infranovix",
            twitter: "https://x.com/infranovix",
            github: "https://github.com/infranovix",
            facebook: "https://facebook.com/infranovix"
          }
        },
        inquiries: [],
        quotes: [],
        newsletter: []
      };
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { settings: {}, inquiries: [], quotes: [], newsletter: [] };
  }
}

// Helper to write database
function writeDB(data: any) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
}

// --- API ROUTES ---

// Public Settings
app.get('/api/settings', (req: Request, res: Response) => {
  const db = readDB();
  const safeSettings = { ...db.settings };
  delete safeSettings.adminPin;
  res.json(safeSettings);
});

// Admin Auth
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { pin } = req.body;
  const db = readDB();
  const configuredPin = process.env.ADMIN_PIN || db.settings?.adminPin || 'infranovix2026';
  if (pin === configuredPin) {
    res.json({ success: true, token: 'inx_admin_session_' + Date.now() });
  } else {
    res.status(401).json({ success: false, error: 'Invalid administrative credential' });
  }
});

// Submit Inquiry
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, email, phone, company, service, budget, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const db = readDB();
  const newInquiry = {
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    company: company ? company.trim() : 'Independent Client',
    service: service || 'General Inquiry',
    budget: budget || 'Undisclosed',
    message: message.trim(),
    status: 'Pending Review',
    createdAt: new Date().toISOString()
  };

  db.inquiries = [newInquiry, ...(db.inquiries || [])];
  writeDB(db);

  res.status(201).json({ success: true, inquiry: newInquiry });
});

// Get Inquiries (Admin)
app.get('/api/inquiries', (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.inquiries || []);
});

// Update Inquiry Status (Admin)
app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDB();
  const index = (db.inquiries || []).findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  db.inquiries[index].status = status;
  writeDB(db);
  res.json({ success: true, inquiry: db.inquiries[index] });
});

// Submit Quotation Request
app.post('/api/quotes', (req: Request, res: Response) => {
  const { fullName, email, phone, organization, category, service, timeline, budgetRange, currency, requirements, hasDocuments } = req.body;

  if (!fullName || !email || !requirements || !category) {
    return res.status(400).json({ error: 'Full name, email, service category, and project requirements are mandatory.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid business email address.' });
  }

  const db = readDB();
  const refCode = `QT-${Math.floor(1000 + Math.random() * 9000)}`;
  const newQuote = {
    id: refCode,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    organization: organization ? organization.trim() : 'Direct Inquiry',
    category,
    service: service || category,
    timeline: timeline || 'Flexible',
    budgetRange: budgetRange || 'Standard Consultation',
    currency: currency || 'KES',
    requirements: requirements.trim(),
    hasDocuments: Boolean(hasDocuments),
    status: 'Received',
    createdAt: new Date().toISOString()
  };

  db.quotes = [newQuote, ...(db.quotes || [])];
  writeDB(db);

  res.status(201).json({ success: true, quote: newQuote });
});

// Get Quotes (Admin)
app.get('/api/quotes', (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.quotes || []);
});

// Update Quote Status (Admin)
app.patch('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDB();
  const index = (db.quotes || []).findIndex((item: any) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Quotation request not found' });
  }
  db.quotes[index].status = status;
  writeDB(db);
  res.json({ success: true, quote: db.quotes[index] });
});

// Newsletter subscription
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const db = readDB();
  if (!db.newsletter) db.newsletter = [];
  const exists = db.newsletter.some((sub: any) => sub.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.json({ success: true, message: 'You are already subscribed to Infranovix Insights.' });
  }

  db.newsletter.push({ email: email.trim(), subscribedAt: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true, message: 'Thank you for subscribing to Infranovix Insights.' });
});

// Update Settings (Admin)
app.put('/api/settings', (req: Request, res: Response) => {
  const newSettings = req.body;
  const db = readDB();
  db.settings = { ...db.settings, ...newSettings };
  writeDB(db);
  res.json({ success: true, settings: db.settings });
});

// Overview stats
app.get('/api/stats', (req: Request, res: Response) => {
  const db = readDB();
  res.json({
    inquiriesCount: (db.inquiries || []).length,
    quotesCount: (db.quotes || []).length,
    newsletterCount: (db.newsletter || []).length,
    lastActivity: (db.quotes || [])[0]?.createdAt || (db.inquiries || [])[0]?.createdAt || new Date().toISOString()
  });
});

// Download cPanel deployment zip bundle
app.get(['/download/bundle', '/api/download-bundle'], (req: Request, res: Response) => {
  const candidates = [
    path.join(__dirname, 'public', 'infranovix-cpanel-deploy.zip'),
    path.join(__dirname, 'dist', 'infranovix-cpanel-deploy.zip'),
    path.join(__dirname, 'infranovix-cpanel-deploy.zip')
  ];
  const found = candidates.find(p => fs.existsSync(p));
  if (found) {
    res.download(found, 'infranovix-cpanel-deploy.zip');
  } else {
    res.status(404).send('Deployment bundle not found.');
  }
});


// --- SERVER SETUP & VITE INTEGRATION ---
async function startServer() {
  const distPath = path.join(__dirname, 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));

  // In production (or on cPanel Passenger / Docker), serve compiled dist
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.PASSENGER_APP_ENV) ||
    Boolean(process.env.PORT && process.env.PORT !== '3000') ||
    (hasDist && !process.env.npm_lifecycle_event?.includes('dev'));

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch {
      // Fallback if Vite is not present in runtime: serve compiled dist
      if (hasDist) {
        app.use(express.static(distPath));
        app.get('*', (req: Request, res: Response) => {
          res.sendFile(path.join(distPath, 'index.html'));
        });
      }
    }
  } else {
    // Production static serving
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Infranovix] Server operational on http://localhost:${PORT}`);
  });
}

startServer();
