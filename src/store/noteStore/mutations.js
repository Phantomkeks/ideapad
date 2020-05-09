import NoteHelper from '../../helper/NoteHelper'
import { v4 as uuidv4 } from 'uuid'

export function initialiseStore (state) {
  if (localStorage.getItem('store')) {
    this.replaceState(
      JSON.parse(localStorage.getItem('store'))
    )
  }
}

function _removeNote (state, noteId) {
  const noteIndex = state.notes.findIndex(note => note.id === noteId)
  if (noteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    const currentDate = new Date(Date.now())
    const note = state.notes[noteIndex]
    note.highlighted = false
    note.lastModified = currentDate.toJSON()
    state.deletedNotes.push(note)
    state.notes.splice(noteIndex, 1)
  }
}

export const removeNote = (state, payload) => {
  _removeNote(state, payload.noteId)
}

export const removeNotes = (state, payload) => {
  const noteIds = payload.noteIds

  noteIds.forEach(function (noteId) {
    _removeNote(state, noteId)
  })
}

function _restoreNote (state, noteId) {
  const noteIndex = state.deletedNotes.findIndex(note => note.id === noteId)
  if (noteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    const currentDate = new Date(Date.now())
    const note = state.deletedNotes[noteIndex]
    note.highlighted = false
    note.lastModified = currentDate.toJSON()
    state.notes.push(note)
    state.deletedNotes.splice(noteIndex, 1)
  }
}

export const restoreNote = (state, payload) => {
  _restoreNote(state, payload.noteId)
}

export const restoreNotes = (state, payload) => {
  payload.noteIds.forEach(noteId => {
    _restoreNote(state, noteId)
  })
}

function _deleteNote (state, noteId) {
  const noteIndex = state.deletedNotes.findIndex(note => note.id === noteId)
  if (noteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    state.deletedNotes.splice(noteIndex, 1)
  }
}

export const deleteNote = (state, payload) => {
  _deleteNote(state, payload.noteId)
}

export const deleteNotes = (state, payload) => {
  payload.noteIds.forEach(function (noteId) {
    _deleteNote(state, noteId)
  })
}

function _copyNote (state, noteId) {
  const noteIndex = state.notes.findIndex(note => note.id === noteId)
  if (noteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    const oldNote = state.notes[noteIndex]
    oldNote.highlighted = false

    const newNote = NoteHelper.noteConstructor(
      uuidv4(),
      false,
      oldNote.type,
      null,
      null,
      oldNote.title,
      oldNote.details
    )
    state.notes.push(newNote)
  }
}

export const copyNote = (state, payload) => {
  _copyNote(state, payload.noteId)
}

export const copyNotes = (state, payload) => {
  payload.noteIds.forEach(function (noteId) {
    _copyNote(state, noteId)
  })
}

export const updateNote = (state, payload) => {
  const noteIndex = state.notes.findIndex(note => note.id === payload.note.id)
  if (noteIndex < 0) {
    state.notes.push(payload.note)
  } else {
    state.notes[noteIndex] = payload.note
  }
}

export const deleteNoteEntry = (state, payload) => {
  const noteIndex = state.notes.findIndex(note => note.id === payload.noteId)

  if (noteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    const currentDate = new Date(Date.now())
    const note = state.notes[noteIndex]
    note.lastModified = currentDate.toJSON()
    note.details.splice(payload.listEntryIndex, 1)
  }
}

export const changeNoteType = (state, payload) => {
  const noteIndex = state.notes.findIndex(note => note.id === payload.noteId)

  if (noteIndex < 0) {
    throw new Error('Note not found.')
  } else {
    const currentDate = new Date(Date.now())
    const note = state.notes[noteIndex]
    note.lastModified = currentDate.toJSON()
    note.type = payload.noteType
  }
}

export const overwriteNotes = (state, payload) => {
  state.notes = payload.notes
}

export const emptyTrash = (state) => {
  state.deletedNotes = []
}

export const clearNoteState = (state) => {
  state.notes = []
  state.deletedNotes = []
}
