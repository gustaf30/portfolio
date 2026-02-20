import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting (per IP, 60s window)
const rateLimit = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimit.get(ip);

  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimit.set(ip, now);

  // Prune old entries periodically
  if (rateLimit.size > 1000) {
    for (const [key, timestamp] of rateLimit) {
      if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimit.delete(key);
      }
    }
  }

  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "gustavoferraz405@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 503 }
    );
  }

  // Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; message?: string; _gotcha?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, _gotcha } = body;

  // Honeypot — bots fill hidden fields
  if (_gotcha) {
    return NextResponse.json({ success: true });
  }

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length > 100) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (typeof message !== "string" || message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error: sendError } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (sendError) {
      console.error("[contact] Resend error:", sendError);
      return NextResponse.json(
        { error: sendError.message ?? "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
