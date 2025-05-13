import nodemailer from "nodemailer"

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const mailOptions = {
    from: `"EduTune" <${process.env.EMAIL_FROM || "noreply@edutune.com"}>`,
    to,
    subject: "Reset your password",
    text: `
      Hello,
      
      You requested to reset your password. Please click the link below to reset your password:
      
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you did not request a password reset, please ignore this email.
      
      Best regards,
      EduTune Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #8b5cf6;">EduTune</h1>
        </div>
        <p>Hello,</p>
        <p>You requested to reset your password. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>EduTune Team</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} EduTune. All rights reserved.</p>
          <p>Contact: <a href="mailto:contact@romdev.tech" style="color: #8b5cf6;">contact@romdev.tech</a></p>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}
