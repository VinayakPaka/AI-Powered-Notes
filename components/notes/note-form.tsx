"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { useSupabase } from "@/providers/supabase-provider"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Database } from "@/types/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Note = Database["public"]["Tables"]["notes"]["Row"]

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})

type FormValues = z.infer<typeof formSchema>

interface NoteFormProps {
  userId: string
  note?: Note
  isEditing?: boolean
}

export default function NoteForm({ userId, note, isEditing = false }: NoteFormProps) {
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [currentSummary, setCurrentSummary] = useState<string | null>(note?.summary || null)
  const [apiError, setApiError] = useState<string | null>(null)
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
    },
  })
  
  const { mutate: saveNote, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      if (isEditing && note) {
        const { error } = await supabase
          .from("notes")
          .update({
            title: values.title,
            content: values.content,
            summary: currentSummary,
            updated_at: new Date().toISOString(),
          })
          .eq("id", note.id)
          
        if (error) throw error
        return note.id
      } else {
        const { data, error } = await supabase
          .from("notes")
          .insert({
            user_id: userId,
            title: values.title,
            content: values.content,
            summary: currentSummary,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          
        if (error) throw error
        return data[0].id
      }
    },
    onSuccess: (noteId) => {
      toast({
        title: isEditing ? "Note updated" : "Note created",
        description: isEditing
          ? "Your note has been updated successfully."
          : "Your note has been created successfully.",
      })
      router.push(`/dashboard/notes/${noteId}`)
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} note. Please try again.`,
        variant: "destructive",
      })
    }
  })
  
  const { mutate: generateSummary } = useMutation({
    mutationFn: async () => {
      const values = form.getValues()
      
      if (!values.content || values.content.trim().length < 50) {
        toast({
          title: "Content too short",
          description: "Please provide more content for a meaningful summary (at least 50 characters).",
          variant: "destructive",
        })
        return null
      }
      
      try {
        // Clear previous summary, errors, and show loading state
        setApiError(null)
        setCurrentSummary(null)
        setIsSummarizing(true)
        
        // Add timestamp to ensure we get a fresh summary every time
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/summarize?t=${timestamp}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            text: values.content,
            forceNew: true, // Signal backend to generate new summary
            timestamp: timestamp // Add timestamp in body too
          }),
          // Prevent caching
          cache: 'no-store'
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          let errorMsg = data.error || "Failed to generate summary"
          throw new Error(errorMsg)
        }
        
        return data.summary
      } finally {
        setIsSummarizing(false)
      }
    },
    onSuccess: (summary) => {
      if (summary) {
        setCurrentSummary(summary)
        
        toast({
          title: "Summary generated",
          description: "AI summary has been generated successfully.",
        })
      }
    },
    onError: (error) => {
      console.error("Error generating summary:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate summary. Please try again.";
      setApiError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  })
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => saveNote(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your note here..."
                      className="min-h-[200px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {apiError && (
              <Alert variant="destructive" className="animate-fadeIn">
                <Icons.close className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            
            {currentSummary && (
              <div className="rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-6 transition-all duration-300 hover:shadow-md animate-fadeIn">
                <h3 className="mb-3 font-medium flex items-center text-blue-800 dark:text-blue-300">
                  <Icons.ai className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  AI Summary
                </h3>
                <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-200 italic">{currentSummary}</p>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => generateSummary()}
                disabled={isSummarizing || form.getValues().content.length < 50}
              >
                {isSummarizing ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Icons.ai className="mr-2 h-4 w-4" />
                    Generate AI Summary
                  </>
                )}
              </Button>
              
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icons.save className="mr-2 h-4 w-4" />
                      Save Note
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}