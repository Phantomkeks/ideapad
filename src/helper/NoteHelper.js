import NoteTypes from '../constants/NoteTypes'

export default {
  noteConstructor: (sId, bHighlighted, sType, sTitle, aDetails) => {
    const uuidv1 = require('uuid/v1')
    return {
      id: sId || uuidv1(),
      highlighted: bHighlighted || false,
      type: sType || NoteTypes.Default,
      title: sTitle || '',
      details: aDetails || []
    }
  }
}
