import NoteTypes from '../constants/NoteTypes'

export default async ({ app, router, Vue }) => {
  Vue.prototype.$noteTypes = NoteTypes
}
