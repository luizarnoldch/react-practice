'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { createNote } from '@/actions/notes'
import type { Note } from '@prisma/client'
import { usePathname } from 'next/navigation'

type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
};

type NotesListProps = {
  initialNotes: Note[]
}

const NotesList = ({ initialNotes }: NotesListProps) => {
  const pathname = usePathname()
  const [formError, setFormError] = useState<string | null>(null)

  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    initialNotes,
    (state, newNote: Note) => [
      { ...newNote, pending: true } as Note & { pending?: boolean },
      ...state,
    ]
  )

  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    const formData = new FormData(event.currentTarget)

    formData.set("authorEmail", "amingardoc@prnewswire.com")
    formData.set("revalidateRoute", pathname)

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!title || !content) {
      setFormError('Title and content are required')
      return
    }

    const optimisticNote: Note = {
      id: Date.now(),
      title,
      content,
      authorId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      startTransition(async () => {
        addOptimisticNote(optimisticNote)
        await createNote({} as FormState, formData)
      })
    } catch (error) {
      setFormError('An unexpected error occurred')
    }

    event.currentTarget.reset()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          name="title"
          placeholder="Note title"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="content"
          placeholder="Note content"
          required
          className="w-full mb-2 p-2 border rounded h-32"
        />

        {formError && (
          <div className="mb-2 p-2 text-red-600 bg-red-100 rounded text-sm">
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? 'Adding...' : 'Add Note'}
        </button>
      </form>

      <div className="space-y-4">
        {optimisticNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 border rounded-lg bg-white ${isPending ? 'opacity-50 animate-pulse' : 'opacity-100'
              } transition-opacity`}
          >
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-2">{note.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotesList