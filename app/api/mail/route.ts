import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message }: ContactForm = await req.json();
    console.log(name, email, subject, message);

    // Validate required environment variables
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.MY_EMAIL
    ) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // Create transporter with more detailed configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password here
      },
      tls: {
        rejectUnauthorized: false, // Only use this in development if needed
      },
    });

    // Create HTML version of the email
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    // Email options with both text and HTML versions
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, // This format is more reliable
      to: process.env.MY_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`, // Plain text version
      html: htmlContent, // HTML version
      replyTo: email,
    };

    // Verify transporter configuration
    await transporter.verify();

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email. Please try again later.",
        message: error,
      },
      { status: 500 }
    );
  }
}
