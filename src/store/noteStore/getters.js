export const getAllNotes = (state) => {
  return state.notes
}

export const getAllDeletedNotes = (state) => {
  return state.deletedNotes
}

export const getSingleNote = (state) => (noteId) => {
  return state.notes.find(note => note.id === noteId)
}

export const getSingleDeletedNote = (state) => (noteId) => {
  return state.deletedNotes.find(note => note.id === noteId)
}
