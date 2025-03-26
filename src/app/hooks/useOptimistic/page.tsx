import { getNotes } from '@/actions/notes'
import React from 'react'
import NotesList from './NodeLIst'

type Props = {}

const PageUseOptimistic = async (props: Props) => {
  const initialNotes = await getNotes()

  return <NotesList initialNotes={initialNotes} />
}

export default PageUseOptimistic