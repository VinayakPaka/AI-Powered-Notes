import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { Database } from "@/types/supabase"

// For debugging
const debugSupabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'not-set';
// Only show first 10 chars of anon key for security
const debugSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
  ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...` 
  : 'not-set';

console.log('Supabase server config:', { 
  url: debugSupabaseURL, 
  keyPrefix: debugSupabaseKey 
});

export const createClient = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Missing Supabase environment variables");
      throw new Error("Missing required environment variables for Supabase");
    }
    
    const cookieStore = cookies()
    
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
          set(name, value, options) {
            cookieStore.set(name, value, options)
          },
          remove(name, options) {
            cookieStore.delete(name, options)
          },
        },
      }
    )
  } catch (error) {
    console.error("Error creating Supabase server client:", error);
    throw error;
  }
}