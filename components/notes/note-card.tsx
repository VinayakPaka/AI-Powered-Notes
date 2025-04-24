"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSupabase } from "@/providers/supabase-provider"
import { useToast } from "@/hooks/use-toast"
import { Database } from "@/types/supabase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Note = Database["public"]["Tables"]["notes"]["Row"]

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const { mutate: deleteNote, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", note.id)
        
      if (error) throw error
      return note.id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      })
      setIsOpen(false)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      })
    }
  })
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/dashboard/notes/${note.id}`}>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="line-clamp-1 text-xl">{note.title}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-3 text-sm text-muted-foreground mb-2">{note.content}</p>
          
          {note.summary && (
            <div className="mt-3 p-2 border-l-2 border-blue-500 pl-3 bg-blue-50/30 dark:bg-blue-950/10 rounded-sm">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1 flex items-center">
                <Icons.ai className="h-3 w-3 mr-1" />
                AI Summary
              </p>
              <p className="text-xs line-clamp-2 text-blue-600 dark:text-blue-300 italic">{note.summary}</p>
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          asChild
        >
          <Link href={`/dashboard/notes/${note.id}/edit`}>
            <Icons.edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  deleteNote()
                }}
                className="bg-destructive text-destructive-foreground"
                disabled={isPending}
              >
                {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}