import Vue2TouchEvents from 'vue2-touch-events'

// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  // https://www.npmjs.com/package/vue2-touch-events
  Vue.use(Vue2TouchEvents, {
    touchClass: '',
    tapTolerance: 10,
    swipeTolerance: 30,
    longTapTimeInterval: 400
  })
}
