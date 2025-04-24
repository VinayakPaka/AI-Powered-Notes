import { createClient } from "@/lib/supabase/server"
import { NotesList } from "@/components/notes/notes-list"
import { EmptyNotes } from "@/components/notes/empty-notes"

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", session?.user?.id)
    .order("updated_at", { ascending: false })
    
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Notes</h1>
      </div>
      
      {notes && notes.length > 0 ? (
        <NotesList initialNotes={notes} />
      ) : (
        <EmptyNotes />
      )}
    </div>
  )
}