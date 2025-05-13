import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import crypto from "crypto"
import { sendPasswordResetEmail } from "@/lib/email/nodemailer"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Check if user exists
    const { data: user } = await supabase.from("users").select("id").eq("email", email).single()

    if (!user) {
      // Don't reveal if user exists or not for security reasons
      return NextResponse.json({ success: true })
    }

    // Generate a reset token
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) // Token expires in 1 hour

    // Store the token in the database
    await supabase.from("password_reset_tokens").insert([
      {
        user_id: user.id,
        token,
        expires_at: expiresAt.toISOString(),
      },
    ])

    // Send the reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password/${token}`
    await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in forgot password:", error)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
