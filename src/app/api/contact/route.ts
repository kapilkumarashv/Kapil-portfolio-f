import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // --- Nodemailer transporter ---
    // For Gmail: enable "App Passwords" in your Google Account settings
    // Set GMAIL_USER and GMAIL_PASS in your .env.local file
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // your Gmail address
        pass: process.env.GMAIL_PASS,   // your Gmail App Password
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "kapilkumarashv@gmail.com",
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d12; color: #f0f0f5; padding: 40px; border-radius: 12px; border: 1px solid #1e1e2e;">
          <div style="border-left: 4px solid #c9a84c; padding-left: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 24px; margin: 0; color: #c9a84c;">New Portfolio Message</h1>
            <p style="color: #60607a; margin: 5px 0 0;">Sent from your portfolio contact form</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #a0a0b5; width: 100px;">From</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #a0a0b5;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e;"><a href="mailto:${email}" style="color: #00d4ff;">${email}</a></td>
            </tr>
            ${subject ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #a0a0b5;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e;">${subject}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; color: #a0a0b5; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; line-height: 1.7; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 16px; background: #111118; border-radius: 8px; font-size: 12px; color: #60607a;">
            Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
