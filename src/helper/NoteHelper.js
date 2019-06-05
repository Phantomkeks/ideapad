import NoteTypes from '../constants/NoteTypes'

export default {
  noteConstructor: (sId, bHighlighted, sType, createdAt, lastModified, sTitle, aDetails) => {
    const uuidv1 = require('uuid/v1')
    let currentDate = new Date(Date.now())
    return {
      id: sId || uuidv1(),
      highlighted: bHighlighted || false,
      type: sType || NoteTypes.Default,
      createdAt: createdAt || currentDate.toJSON(),
      lastModified: lastModified || currentDate.toJSON(),
      title: sTitle || '',
      details: aDetails || []
    }
  }
}
