'use client'

import { useActionState } from 'react'
import { updateNote } from '@/actions/notes'
import { usePathname } from 'next/navigation'

type FormState = {
  success: boolean
  message?: string
  errors?: {
    title?: string[]
    content?: string[]
  }
}

const UpdateNoteForm = ({
  noteId,
  currentTitle,
  currentContent,
}: {
  noteId: number
  currentTitle: string
  currentContent: string
}) => {
  const pathname = usePathname()

  const [state, action] = useActionState<FormState, FormData>(updateNote, {
    success: false,
    message: '',
    errors: undefined
  })

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="noteId" value={noteId} />
      <input type="hidden" name="revalidateRoute" value={pathname} />

      <div className='grid grid-cols-2 gap-4'>
        <input
          name="title"
          placeholder="New title"
          defaultValue={currentTitle}
          className="border p-2 w-full"
          required
        />
        {state.errors?.title &&
          state.errors.title.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">{error}</p>
          ))}
        <input
          name="content"
          placeholder="New content"
          defaultValue={currentContent}
          className="border p-2 w-full"
          required
        />
        {state.errors?.content &&
          state.errors.content.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">{error}</p>
          ))}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded text-sm"
      >
        Update Title
      </button>

      {state.message && (
        <p className={`text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}

export default UpdateNoteForm