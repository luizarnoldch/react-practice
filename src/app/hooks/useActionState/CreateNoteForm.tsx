'use client'

import { useActionState } from 'react'
import { createNote } from '@/actions/notes'
import { usePathname } from 'next/navigation'

type FormState = {
  success: boolean
  message?: string
  errors?: {
    title?: string[]
    content?: string[]
  }
}

// Componente para creación de notas
const CreateNoteForm = ({ authorEmail }: { authorEmail: string }) => {
  const pathname = usePathname()

  const [state, action] = useActionState<FormState, FormData>(createNote, {
    success: false,
    message: '',
    errors: undefined
  })

  return (
    <form action={action} className="space-y-4 mb-8">
      <input type="hidden" name="authorEmail" value={authorEmail} />
      <input type="hidden" name="revalidateRoute" value={pathname} />

      <div className='grid grid-cols-2 gap-4'>
        <input
          name="title"
          placeholder="Note title"
          className="border p-2 w-full"
          required
        />
        {state.errors?.title &&
          state.errors.title.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">{error}</p>
          ))}
        <input
          name="content"
          placeholder="Node Content"
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Note
      </button>

      {state.message && (
        <p className={`text-sm ${state.success ? 'text-blue-500' : 'text-red-500'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}

export default CreateNoteForm