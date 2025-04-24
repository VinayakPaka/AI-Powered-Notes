import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DashboardNav from "@/components/dashboard/dashboard-nav"

export const dynamic = 'force-dynamic'; // Ensure this is always server-rendered

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()
    
    console.log("Dashboard layout: Checking auth session")
    
    // Get session and handle if not authenticated
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error("Dashboard layout: Error fetching session:", error.message)
      redirect(`/?session_error=${encodeURIComponent(error.message)}`)
    }
    
    if (!data.session) {
      console.log("Dashboard layout: No session found, redirecting to login")
      redirect("/")
    }
    
    console.log("Dashboard layout: Session found for user", data.session.user.id)
    
    // If we have a session, render the dashboard
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardNav user={data.session.user} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  } catch (error) {
    console.error("Dashboard layout: Unexpected error:", error)
    redirect("/?error=dashboard_layout")
  }
}