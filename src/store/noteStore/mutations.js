export function initialiseStore (state) {
  if (localStorage.getItem('store')) {
    this.replaceState(
      Object.assign(state, JSON.parse(localStorage.getItem('store')))
    )
  }
}

export const addNote = (state) => (oNote) => {
  state.notes.push(oNote)
}

export const removeNote = (state) => (sNoteId) => {
  const iNoteIndex = state.notes.findIndex(oNote => oNote.id === sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    state.notes.splice(iNoteIndex, 1)
  }
}

export const updateNoteDetails = (state, oPayLoad) => {
  console.log(oPayLoad)
  const iNoteIndex = state.notes.findIndex(oNote => oNote.id === oPayLoad.sNoteId)
  if (iNoteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    console.log(state.notes[iNoteIndex].details)
    state.notes[iNoteIndex].details = oPayLoad.aNoteDetails
  }
}
