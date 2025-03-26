'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { createNote } from '@/actions/notes'
import type { Note } from '@prisma/client'
import { usePathname } from 'next/navigation'

// Agregar tipo extendido para pending
type OptimisticNote = Note & { pending?: boolean }

type NotesListProps = {
  initialNotes: Note[]
}

const NotesList = ({ initialNotes }: NotesListProps) => {
  const pathname = usePathname()
  const [formError, setFormError] = useState<string | null>(null)

  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    initialNotes,
    (state, newNote: OptimisticNote) => [newNote, ...state]
  )

  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    const formData = new FormData(event.currentTarget)
    
    formData.set("authorEmail", "user@example.com")
    formData.set("revalidateRoute", pathname)

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!title || !content) {
      setFormError('Title and content are required')
      return
    }

    const optimisticNote: OptimisticNote = {
      id: Date.now(), // ID temporal
      title,
      content,
      authorId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      pending: true // Agregar propiedad pending
    }

    try {
      startTransition(async () => {
        addOptimisticNote(optimisticNote)
        // Pasar FormState inicial vacío
        await createNote({} as FormState, formData)
      })
    } catch (error) {
      setFormError('An unexpected error occurred')
    }

    event.currentTarget.reset()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* ... (mismo JSX anterior) */}
    </div>
  )
}

export default NotesList