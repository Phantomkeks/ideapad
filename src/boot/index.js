import Vue2TouchEvents from 'vue2-touch-events'
import axios from 'axios'

export default async ({ app, router, Vue }) => {
  Vue.use(Vue2TouchEvents, {
    touchClass: '',
    tapTolerance: 10,
    swipeTolerance: 30,
    longTapTimeInterval: 400
  })

  Vue.prototype.$axios = axios
}
