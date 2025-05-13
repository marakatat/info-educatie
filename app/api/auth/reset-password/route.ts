import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { generateSalt, hashPassword } from "@/lib/auth/password"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ success: false, message: "Token and password are required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Check if token exists and is not expired
    const { data: tokenData } = await supabase
      .from("password_reset_tokens")
      .select("expires_at, user_id")
      .eq("token", token)
      .single()

    if (!tokenData) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ success: false, message: "Token has expired" }, { status: 400 })
    }

    // Hash the new password
    const salt = generateSalt()
    const passwordHash = hashPassword(password, salt)

    // Update the user's password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: passwordHash })
      .eq("id", tokenData.user_id)

    if (updateError) {
      console.error("Error updating password:", updateError)
      return NextResponse.json({ success: false, message: "Failed to update password" }, { status: 500 })
    }

    // Delete the used token
    await supabase.from("password_reset_tokens").delete().eq("token", token)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error resetting password:", error)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
