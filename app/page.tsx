import { redirect } from "next/navigation"
import AuthForm from "@/components/auth/auth-form"
import { createClient } from "@/lib/supabase/server"
import HashRedirect from "@/components/auth/hash-redirect"

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    redirect("/dashboard")
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      {/* Handle hash redirects for OAuth */}
      <HashRedirect />
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">AI Notes</h1>
          <p className="mt-2 text-muted-foreground">
            Your thoughts, summarized by AI
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}