"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/providers/supabase-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { User } from "@supabase/supabase-js"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const email = user?.email || "";
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "UN";
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:px-8">
        {/* Logo and primary navigation */}
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center mr-6">
            <Icons.note className="h-6 w-6 mr-2" />
            <span className="font-bold">Smart Notes</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Notes
            </Link>
            <Link 
              href="/dashboard/new" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Create New
            </Link>
          </nav>
        </div>
        
        {/* Right-side actions - spacer pushes to far right */}
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/new">
            <Button variant="outline" size="sm" className="h-8">
              <Icons.add className="h-4 w-4 mr-1" />
              New Note
            </Button>
          </Link>
          
          <ModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt="User" />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.user_metadata?.full_name || "User"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Icons.note className="mr-2 h-4 w-4" />
                  <span>My Notes</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/new">
                  <Icons.add className="mr-2 h-4 w-4" />
                  <span>New Note</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="text-red-600 focus:text-red-600"
              >
                <Icons.logout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}