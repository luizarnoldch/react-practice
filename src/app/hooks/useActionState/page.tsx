// app/page.tsx
import React from 'react'
import { getNotes } from '@/actions/notes'
import type { Note } from '@prisma/client'
import CreateNoteForm from './CreateNoteForm'
import UpdateNoteForm from './UpdateNoteForm'

const PageUseActionState = async () => {
  const notes = await getNotes()
  // Suponiendo que obtenemos el email del autor de la sesión/auth
  const currentAuthorEmail = 'amingardoc@prnewswire.com' // Reemplazar con tu lógica real de autenticación

  if (notes == null) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-8">Notes Manager</h1>

      {/* Bloque de creación en la parte superior */}
      <section className="mb-12">
        <h2 className="text-xl mb-4">Create New Note</h2>
        <CreateNoteForm authorEmail={currentAuthorEmail} />
      </section>

      {/* Listado de notas existentes */}
      <section className="mb-12">
        <h2 className="text-xl mb-4">Existing Notes</h2>
        <div className="grid gap-4">
          {notes.map(note => (
            <div key={note.id} className="border p-4 rounded grid grid-cols-2">
              <div>
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.content}</p>
                <p className="text-sm text-gray-500">
                  Author: {note.author?.name} ({note.author?.email})
                </p>
              </div>

              {/* Formulario de actualización para cada nota */}
              <UpdateNoteForm
                noteId={note.id}
                currentTitle={note.title}
                currentContent={note.content ?? ''}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PageUseActionState