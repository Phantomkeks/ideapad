export function initialiseStore (state) {
  if (localStorage.getItem('store')) {
    this.replaceState(
      JSON.parse(localStorage.getItem('store'))
    )
  }
}

function _removeNote (state, sNoteId) {
  const iNoteIndex = state.notes.findIndex(oNote => oNote.id === sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    let oNote = state.notes[iNoteIndex]
    oNote.highlighted = false
    state.deletedNotes.push(oNote)
    state.notes.splice(iNoteIndex, 1)
  }
}

export const removeNote = (state, oPayload) => {
  _removeNote(state, oPayload.sNoteId)
}

export const removeNotes = (state, oPayload) => {
  const aNoteIds = oPayload.aNoteIds

  aNoteIds.forEach(function (sNoteId) {
    _removeNote(state, sNoteId)
  })
}

function _restoreNote (state, sNoteId) {
  const iNoteIndex = state.deletedNotes.findIndex(oNote => oNote.id === sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    let oNote = state.deletedNotes[iNoteIndex]
    oNote.highlighted = false
    state.notes.push(oNote)
    state.deletedNotes.splice(iNoteIndex, 1)
  }
}

export const restoreNote = (state, oPayload) => {
  _restoreNote(state, oPayload.sNoteId)
}

export const restoreNotes = (state, oPayload) => {
  const aNoteIds = oPayload.aNoteIds

  aNoteIds.forEach(function (sNoteId) {
    _restoreNote(state, sNoteId)
  })
}

function _deleteNote (state, sNoteId) {
  const iNoteIndex = state.deletedNotes.findIndex(oNote => oNote.id === sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    state.deletedNotes.splice(iNoteIndex, 1)
  }
}

export const deleteNote = (state, oPayload) => {
  _deleteNote(state, oPayload.sNoteId)
}

export const deleteNotes = (state, oPayload) => {
  const aNoteIds = oPayload.aNoteIds

  aNoteIds.forEach(function (sNoteId) {
    _deleteNote(state, sNoteId)
  })
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
