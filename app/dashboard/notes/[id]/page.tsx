import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const dynamic = 'force-dynamic';

interface NotePageProps {
  params: {
    id: string
  }
}

export default async function NotePage({ params }: NotePageProps) {
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{note.title}</h1>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <Icons.chevronDown className="mr-2 h-4 w-4 rotate-90" />
              Back to notes
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/notes/${note.id}/edit`}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit note
            </Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{note.title}</CardTitle>
          <CardDescription>
            Last updated on {format(new Date(note.updated_at), "MMMM d, yyyy 'at' h:mm a")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{note.content}</div>
          </div>
        </CardContent>
        {note.summary && (
          <CardFooter className="border-t bg-muted/50 px-6 py-4">
            <div>
              <h3 className="mb-2 font-medium">AI Summary</h3>
              <p className="text-sm text-muted-foreground">{note.summary}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}