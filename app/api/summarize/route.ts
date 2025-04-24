import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Get request body
    const { text } = await request.json()
    
    if (!text || typeof text !== "string" || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Text is too short for summarization" },
        { status: 400 }
      )
    }
    
    // Get Gemini API key from environment variables
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Gemini API key is not configured" },
        { status: 500 }
      )
    }
    
    // Call Google Gemini API for summarization
    console.log("Calling Google Gemini API for summarization...");
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: `Summarize the following text in a concise paragraph using direct language. Do not refer to "the author" or use phrases like "the author is considering" - instead provide a straightforward summary of the key points. Make it no more than 3 sentences.\n\n${text}`
                }
              ]
            }]
          }),
          // Set a reasonable timeout
          signal: AbortSignal.timeout(15000),
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Google Gemini API error:", response.status, errorText);
        return NextResponse.json(
          { error: `Google Gemini API error: ${response.status}` },
          { status: 500 }
        )
      }
      
      const data = await response.json();
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error("Invalid response from Google Gemini API:", data);
        return NextResponse.json(
          { error: "Received invalid response from Google Gemini API" },
          { status: 500 }
        )
      }
      
      // Extract the summary text from the response
      const content = data.candidates[0].content;
      const summary = content.parts[0].text;
      
      console.log("Google Gemini summary successfully generated");
      
      return NextResponse.json({ summary })
    } catch (apiError) {
      console.error("Google Gemini API request error:", apiError);
      return NextResponse.json(
        { error: `Google Gemini API request failed: ${apiError instanceof Error ? apiError.message : 'Connection error'}` },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Summarization error:", error);
    
    return NextResponse.json(
      { error: `Failed to summarize text: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}