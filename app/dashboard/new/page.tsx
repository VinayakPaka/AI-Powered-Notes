import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import NoteForm from "@/components/notes/note-form"

export const dynamic = 'force-dynamic';

export default async function NewNotePage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect("/")
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Note</h1>
      </div>
      
      <NoteForm userId={session.user.id} />
    </div>
  )
}