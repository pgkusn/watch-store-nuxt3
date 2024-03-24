export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('page:finish', () => {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })
  })
})
