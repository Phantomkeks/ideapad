export const getAllNotes = (state) => {
  return state.notes
}

export const getSingleNote = (state) => (sNoteId) => {
  const oNote = state.notes.find(oNote => oNote.id === sNoteId)
  if (!oNote) {
    throw new Error('Note not found.')
  } else {
    return oNote
  }
}
