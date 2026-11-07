import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3e3;
const DB_PATH = path.join(__dirname, "data", "db.json");
app.use(express.json());
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
          operatingHours: "Monday \u2013 Friday: 8:00 AM \u2013 5:30 PM (EAT)",
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
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return { settings: {}, inquiries: [], quotes: [], newsletter: [] };
  }
}
function writeDB(data) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing to db.json:", err);
    return false;
  }
}
app.get("/api/settings", (req, res) => {
  const db = readDB();
  const safeSettings = { ...db.settings };
  delete safeSettings.adminPin;
  res.json(safeSettings);
});
app.post("/api/auth/login", (req, res) => {
  const { pin } = req.body;
  const db = readDB();
  const configuredPin = process.env.ADMIN_PIN || db.settings?.adminPin || "infranovix2026";
  if (pin === configuredPin) {
    res.json({ success: true, token: "inx_admin_session_" + Date.now() });
  } else {
    res.status(401).json({ success: false, error: "Invalid administrative credential" });
  }
});
app.post("/api/inquiries", (req, res) => {
  const { name, email, phone, company, service, budget, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  const db = readDB();
  const newInquiry = {
    id: `INQ-${Math.floor(1e3 + Math.random() * 9e3)}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : "",
    company: company ? company.trim() : "Independent Client",
    service: service || "General Inquiry",
    budget: budget || "Undisclosed",
    message: message.trim(),
    status: "Pending Review",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.inquiries = [newInquiry, ...db.inquiries || []];
  writeDB(db);
  res.status(201).json({ success: true, inquiry: newInquiry });
});
app.get("/api/inquiries", (req, res) => {
  const db = readDB();
  res.json(db.inquiries || []);
});
app.patch("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDB();
  const index = (db.inquiries || []).findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Inquiry not found" });
  }
  db.inquiries[index].status = status;
  writeDB(db);
  res.json({ success: true, inquiry: db.inquiries[index] });
});
app.post("/api/quotes", (req, res) => {
  const { fullName, email, phone, organization, category, service, timeline, budgetRange, currency, requirements, hasDocuments } = req.body;
  if (!fullName || !email || !requirements || !category) {
    return res.status(400).json({ error: "Full name, email, service category, and project requirements are mandatory." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid business email address." });
  }
  const db = readDB();
  const refCode = `QT-${Math.floor(1e3 + Math.random() * 9e3)}`;
  const newQuote = {
    id: refCode,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : "",
    organization: organization ? organization.trim() : "Direct Inquiry",
    category,
    service: service || category,
    timeline: timeline || "Flexible",
    budgetRange: budgetRange || "Standard Consultation",
    currency: currency || "KES",
    requirements: requirements.trim(),
    hasDocuments: Boolean(hasDocuments),
    status: "Received",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.quotes = [newQuote, ...db.quotes || []];
  writeDB(db);
  res.status(201).json({ success: true, quote: newQuote });
});
app.get("/api/quotes", (req, res) => {
  const db = readDB();
  res.json(db.quotes || []);
});
app.patch("/api/quotes/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDB();
  const index = (db.quotes || []).findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Quotation request not found" });
  }
  db.quotes[index].status = status;
  writeDB(db);
  res.json({ success: true, quote: db.quotes[index] });
});
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  const db = readDB();
  if (!db.newsletter) db.newsletter = [];
  const exists = db.newsletter.some((sub) => sub.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.json({ success: true, message: "You are already subscribed to Infranovix Insights." });
  }
  db.newsletter.push({ email: email.trim(), subscribedAt: (/* @__PURE__ */ new Date()).toISOString() });
  writeDB(db);
  res.json({ success: true, message: "Thank you for subscribing to Infranovix Insights." });
});
app.put("/api/settings", (req, res) => {
  const newSettings = req.body;
  const db = readDB();
  db.settings = { ...db.settings, ...newSettings };
  writeDB(db);
  res.json({ success: true, settings: db.settings });
});
app.get("/api/stats", (req, res) => {
  const db = readDB();
  res.json({
    inquiriesCount: (db.inquiries || []).length,
    quotesCount: (db.quotes || []).length,
    newsletterCount: (db.newsletter || []).length,
    lastActivity: (db.quotes || [])[0]?.createdAt || (db.inquiries || [])[0]?.createdAt || (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.get(["/download/bundle", "/api/download-bundle"], (req, res) => {
  const candidates = [
    path.join(__dirname, "public", "infranovix-cpanel-deploy.zip"),
    path.join(__dirname, "dist", "infranovix-cpanel-deploy.zip"),
    path.join(__dirname, "infranovix-cpanel-deploy.zip")
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  if (found) {
    res.download(found, "infranovix-cpanel-deploy.zip");
  } else {
    res.status(404).send("Deployment bundle not found.");
  }
});
async function startServer() {
  const distPath = path.join(__dirname, "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));
  const isProduction = process.env.NODE_ENV === "production" || Boolean(process.env.PASSENGER_APP_ENV) || Boolean(process.env.PORT && process.env.PORT !== "3000") || hasDist && !process.env.npm_lifecycle_event?.includes("dev");
  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch {
      if (hasDist) {
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
          res.sendFile(path.join(distPath, "index.html"));
        });
      }
    }
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, () => {
    console.log(`[Infranovix] Server operational on http://localhost:${PORT}`);
  });
}
startServer();
