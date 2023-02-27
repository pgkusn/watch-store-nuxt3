export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie('loginInfo')
  if (!cookie.value) {
    return navigateTo('/login?redirect=member')
  }
})
