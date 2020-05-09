import { NoteTypes } from './constants'
import { v4 as uuidv4 } from 'uuid'

export default {
  noteConstructor: (id, highlighted, type, createdAt, lastModified, title, details) => {
    let currentDate = new Date(Date.now())
    return {
      id: id || uuidv4(),
      highlighted: highlighted || false,
      type: type || NoteTypes.Default,
      createdAt: createdAt || currentDate.toJSON(),
      lastModified: lastModified || currentDate.toJSON(),
      title: title || '',
      details: details || []
    }
  }
}
