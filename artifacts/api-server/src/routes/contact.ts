import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }

  const gmailUser = "tisztaorganic@gmail.com";
  const gmailPass = process.env["GMAIL_APP_PASSWORD"];

  if (!gmailPass) {
    req.log.error("GMAIL_APP_PASSWORD secret is not set");
    res.status(503).json({ error: "Email service not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"TISZTA Organic Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New message from ${name} – TISZTA Organic`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a5c2a;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="color:#fff;margin:0;font-size:22px">New Customer Message</h2>
            <p style="color:#b8f0c8;margin:4px 0 0;font-size:14px">TISZTA Organic – Contact Form</p>
          </div>
          <div style="background:#faf8f2;padding:32px;border:1px solid #e5e0d5;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px;width:80px">Name</td>
                <td style="padding:8px 0;color:#111827;font-weight:600">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-size:14px">Email</td>
                <td style="padding:8px 0"><a href="mailto:${email}" style="color:#1a5c2a">${email}</a></td>
              </tr>
            </table>
            <div style="background:#fff;border:1px solid #e5e0d5;border-radius:8px;padding:20px">
              <p style="color:#6b7280;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:.05em">Message</p>
              <p style="color:#111827;margin:0;line-height:1.6;white-space:pre-wrap">${message}</p>
            </div>
            <p style="color:#9ca3af;font-size:12px;margin:20px 0 0">Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>`,
    });

    req.log.info({ name, email }, "Contact email sent");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
