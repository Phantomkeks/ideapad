import axios from 'axios'

export default async ({ app, router, Vue }) => {
  Vue.prototype.$axios = axios
}
