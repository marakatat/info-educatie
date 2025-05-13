import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ valid: false, message: "Token is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Check if token exists and is not expired
    const { data: tokenData } = await supabase
      .from("password_reset_tokens")
      .select("expires_at, user_id")
      .eq("token", token)
      .single()

    if (!tokenData) {
      return NextResponse.json({ valid: false, message: "Invalid token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: "Token has expired" }, { status: 400 })
    }

    return NextResponse.json({ valid: true, userId: tokenData.user_id })
  } catch (error) {
    console.error("Error verifying reset token:", error)
    return NextResponse.json({ valid: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
