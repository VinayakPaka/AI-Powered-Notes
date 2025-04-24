"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/providers/supabase-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { User } from "@supabase/supabase-js"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardNavProps {
  user: User
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out of your account.",
    })
    router.push("/")
    router.refresh()
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold">AI Notes</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/dashboard/new">
              <Icons.add className="h-5 w-5" />
              <span className="sr-only">New Note</span>
            </Link>
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            onClick={handleSignOut} 
          >
            <Icons.logout className="h-5 w-5" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}