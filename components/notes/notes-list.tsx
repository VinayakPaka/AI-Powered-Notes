"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSupabase } from "@/providers/supabase-provider"
import { NoteCard } from "@/components/notes/note-card"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Database } from "@/types/supabase"

type Note = Database["public"]["Tables"]["notes"]["Row"]

interface NotesListProps {
  initialNotes: Note[]
}

export function NotesList({ initialNotes }: NotesListProps) {
  const { supabase } = useSupabase()
  const [searchQuery, setSearchQuery] = useState("")
  
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("updated_at", { ascending: false })
        
      if (error) throw error
      return data as Note[]
    },
    initialData: initialNotes,
  })
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="h-[200px] rounded-lg border border-border bg-card p-4 shadow-sm animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}