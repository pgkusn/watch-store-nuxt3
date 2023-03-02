export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie('member')
  if (!cookie.value.loginInfo) {
    return navigateTo('/login?redirect=member')
  }
})
