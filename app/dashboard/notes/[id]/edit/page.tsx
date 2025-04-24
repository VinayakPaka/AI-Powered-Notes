import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import NoteForm from "@/components/notes/note-form"

export const dynamic = 'force-dynamic';

interface EditNotePageProps {
  params: {
    id: string
  }
}

export default async function EditNotePage({ params }: EditNotePageProps) {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect("/")
  }
  
  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .single()
    
  if (!note) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Note</h1>
      </div>
      
      <NoteForm userId={session.user.id} note={note} isEditing={true} />
    </div>
  )
}