export function initialiseStore (state) {
  if (localStorage.getItem('store')) {
    this.replaceState(
      Object.assign(state, JSON.parse(localStorage.getItem('store')))
    )
  }
}

export const removeNote = (state, oPayload) => {
  const iNoteIndex = state.notes.findIndex(oNote => oNote.id === oPayload.sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    state.deletedNotes.push(state.notes[iNoteIndex])
    state.notes.splice(iNoteIndex, 1)
  }
}

export const restoreNote = (state, oPayload) => {
  const iNoteIndex = state.deletedNotes.findIndex(oNote => oNote.id === oPayload.sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    state.notes.push(state.deletedNotes[iNoteIndex])
    state.deletedNotes.splice(iNoteIndex, 1)
  }
}

export const deleteNote = (state, oPayload) => {
  const iNoteIndex = state.deletedNotes.findIndex(oNote => oNote.id === oPayload.sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    state.deletedNotes.splice(iNoteIndex, 1)
  }
}

export const updateNote = (state, oPayload) => {
  const iNoteIndex = state.notes.findIndex(oNote => oNote.id === oPayload.oNote.id)
  if (iNoteIndex < 0) {
    state.notes.push(oPayload.oNote)
  } else {
    state.notes[iNoteIndex] = oPayload.oNote
  }
}

export const overwriteNotes = (state, oPayload) => {
  state.notes = oPayload.notes
}

export const emptyTrash = (state) => {
  state.deletedNotes = []
}
