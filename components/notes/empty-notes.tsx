"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function EmptyNotes() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Icons.note className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No notes created</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You don&apos;t have any notes yet. Start creating one.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/new">
            <Icons.add className="mr-2 h-4 w-4" />
            Create a note
          </Link>
        </Button>
      </div>
    </div>
  )
}