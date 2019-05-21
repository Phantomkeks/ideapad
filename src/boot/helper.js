import NoteHelper from '../helper/NoteHelper'

export default async ({ app, router, Vue }) => {
  Vue.prototype.$noteHelper = NoteHelper
}
