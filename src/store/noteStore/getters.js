export const getAllNotes = (state) => {
  return state.notes
}

export const getAllDeletedNotes = (state) => {
  return state.deletedNotes
}

export const getSingleNote = (state) => (sNoteId) => {
  return state.notes.find(oNote => oNote.id === sNoteId)
}

export const getSingleDeletedNote = (state) => (sNoteId) => {
  return state.deletedNotes.find(oNote => oNote.id === sNoteId)
}
