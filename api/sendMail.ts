const nodemailer = require("nodemailer");

export const config = {
  runtime: "nodejs", // nodemailer requires Node.js, not edge
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = await req.json();
  const { to, subject, text, html } = body;
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Use environment variables for Gmail credentials
  const user = process.env.GMAIL_USERNAME;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return res
      .status(500)
      .json({ error: "Missing Gmail credentials in environment" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    const info = await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
      html,
    });
    return res.status(200).json({ message: "Email sent", info });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
