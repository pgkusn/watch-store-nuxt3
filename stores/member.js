import { defineStore, acceptHMRUpdate } from 'pinia'
import API from '@/assets/data/api.json'

export const useMemberStore = defineStore('member', () => {
  const runtimeConfig = useRuntimeConfig()
  const cookie = useCookie('loginInfo')

  const loginInfo = ref(null)

  const userLogin = async ({ email, password }) => {
    const { data, error } = await useFetch(API.userLogin.url, {
      baseURL: runtimeConfig.public.authApiUrl,
      method: API.userLogin.method,
      body: {
        email,
        password,
        returnSecureToken: true,
      },
      params: {
        key: runtimeConfig.public.firebaseApiKey,
      },
    })

    if (data.value) {
      loginInfo.value = data.value
      cookie.value = data.value
    }

    if (error.value) {
      let statusMessage = error.value.data?.error?.message
      switch (statusMessage) {
        case 'EMAIL_NOT_FOUND':
          statusMessage = 'Email 不存在'
          break
        case 'INVALID_PASSWORD':
          statusMessage = '密碼錯誤'
          break
      }
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage,
      })
    }
  }
  const userLogout = () => {
    loginInfo.value = null
    cookie.value = null
    // TODO: reset other states
  }
  const readPreferences = async () => {
    const { localId, idToken: auth } = loginInfo.value || {}
    const { data, error } = await useFetch(API.readPreferences.url.replace(':uid', localId), {
      baseURL: runtimeConfig.public.dbApiUrl,
      method: API.readPreferences.method,
      params: { auth },
    })

    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.data?.error?.message,
      })
    }

    return data.value
  }
  const updatePreferences = async body => {
    const { localId, idToken: auth } = loginInfo.value || {}
    const { error } = await useFetch(API.updatePreferences.url.replace(':uid', localId), {
      baseURL: runtimeConfig.public.dbApiUrl,
      method: API.updatePreferences.method,
      params: { auth },
      body,
    })

    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.data?.error?.message,
      })
    }
  }
  const resetPassword = async email => {
    const { error } = await useFetch(API.resetPassword.url, {
      baseURL: runtimeConfig.public.authApiUrl,
      method: API.resetPassword.method,
      body: {
        requestType: 'PASSWORD_RESET',
        email,
      },
      params: {
        key: runtimeConfig.public.firebaseApiKey,
      },
    })

    if (error.value) {
      let statusMessage = error.value.data?.error?.message
      switch (statusMessage) {
        case 'EMAIL_NOT_FOUND':
          statusMessage = '查無此信箱'
          break
        case 'INVALID_EMAIL':
          statusMessage = 'Email 格式錯誤'
          break
      }
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage,
      })
    }
  }

  return {
    loginInfo,
    userLogin,
    userLogout,
    readPreferences,
    updatePreferences,
    resetPassword,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot))
}
