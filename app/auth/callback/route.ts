import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
  const requestUrl = new URL(request.url)
    console.log("Auth callback called with URL:", requestUrl.toString())
    
    const supabase = await createClient()
    
    // For code exchange flow (normal OAuth)
  const code = requestUrl.searchParams.get("code")
    console.log("Code present:", !!code)
    
    // For hash fragment flow (when we convert the hash to query params)
    const accessToken = requestUrl.searchParams.get("access_token")
    console.log("Access token present:", !!accessToken)
    
    const refreshToken = requestUrl.searchParams.get("refresh_token")
    
    let authResult = null
    
    // Handle code exchange first (normal OAuth flow)
  if (code) {
      console.log("Processing OAuth code exchange")
      try {
        authResult = await supabase.auth.exchangeCodeForSession(code)
        console.log("Code exchange result:", JSON.stringify({
          success: !authResult.error,
          error: authResult.error ? authResult.error.message : null
        }))
      } catch (codeError) {
        console.error("Error during code exchange:", codeError)
        const errorMessage = codeError instanceof Error ? codeError.message : "Unknown error";
        return NextResponse.redirect(new URL(`/?error=code_exchange_error&details=${encodeURIComponent(errorMessage)}`, request.url))
      }
    } 
    // Handle access token directly if present
    else if (accessToken) {
      console.log("Processing direct access token")
      try {
        authResult = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        })
        console.log("Set session result:", JSON.stringify({
          success: !authResult.error,
          error: authResult.error ? authResult.error.message : null
        }))
      } catch (tokenError) {
        console.error("Error during token processing:", tokenError)
        const errorMessage = tokenError instanceof Error ? tokenError.message : "Unknown error";
        return NextResponse.redirect(new URL(`/?error=token_error&details=${encodeURIComponent(errorMessage)}`, request.url))
      }
    } else {
      // No auth information
      console.error("No code or access_token found in callback")
      return NextResponse.redirect(new URL("/?error=no_auth_code", request.url))
    }
    
    // Check for errors
    if (authResult?.error) {
      console.error("Error in auth processing:", authResult.error.message)
      return NextResponse.redirect(new URL(`/?error=auth_error&details=${encodeURIComponent(authResult.error.message)}`, request.url))
    }
    
    // Verify we actually have a session
    try {
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) {
        console.error("Session not established after auth")
        return NextResponse.redirect(new URL("/?error=no_session_established", request.url))
      }
      console.log("Session established successfully, user ID:", session.session.user.id)
    } catch (sessionError) {
      console.error("Error checking session:", sessionError)
      const errorMessage = sessionError instanceof Error ? sessionError.message : "Unknown error";
      return NextResponse.redirect(new URL(`/?error=session_verification_error&details=${encodeURIComponent(errorMessage)}`, request.url))
    }
    
    // Successful authentication
    console.log("Auth successful, redirecting to dashboard")
  return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    // Log detailed error information
    console.error("Unexpected error in auth callback:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("Error details:", { message: errorMessage, stack: errorStack })
    
    // Redirect with more specific error info
    return NextResponse.redirect(new URL(`/?error=unexpected&details=${encodeURIComponent(errorMessage)}`, request.url))
  }
}