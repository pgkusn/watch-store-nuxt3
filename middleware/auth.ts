import { LoginInfo } from '@/types'

export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie('member') as { value: { loginInfo: LoginInfo } }
  if (!cookie.value.loginInfo) {
    return navigateTo('/login?redirect=member')
  }
})
