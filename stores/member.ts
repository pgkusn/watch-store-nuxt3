import API from '@/assets/data/api.json'
import {
  OrNull,
  FetchError,
  LoginInfo,
  SignUpData,
  Profile,
  RawOrder,
  Order,
  NewOrder,
} from '@/types'

export const useMemberStore = defineStore(
  'member',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const productStore = useProductStore()

    const loginInfo = ref<OrNull<LoginInfo>>(null)
    const orders = ref<Order[]>([])
    const profile = ref<OrNull<Profile>>(null)

    const userLogin = async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await useFetch(API.userLogin.url, {
        baseURL: runtimeConfig.public.authApiUrl,
        method: API.userLogin.method as 'post',
        params: {
          key: runtimeConfig.public.firebaseApiKey,
        },
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      })

      if (data.value) {
        loginInfo.value = data.value as LoginInfo
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
      orders.value = []
      profile.value = null
      productStore.states = {
        favorite: [],
        cart: [],
      }
    }
    const userSignUp = async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await useFetch(API.userSignUp.url, {
        baseURL: runtimeConfig.public.authApiUrl,
        method: API.userSignUp.method as 'post',
        params: {
          key: runtimeConfig.public.firebaseApiKey,
        },
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      })

      if (error.value) {
        let statusMessage = error.value.data?.error?.message
        switch (statusMessage) {
          case 'EMAIL_EXISTS':
            statusMessage = 'Email 重複'
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

      return data.value
    }
    const readPreferences = async () => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      const { data, error } = await useFetch(API.readPreferences.url.replace(':uid', localId), {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.readPreferences.method as 'get',
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
    const updatePreferences = async () => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      const { error } = await useFetch(API.updatePreferences.url.replace(':uid', localId), {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.updatePreferences.method as 'put',
        params: { auth },
        body: {
          favorite: productStore.states.favorite,
          cart: productStore.states.cart,
        },
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }
    }
    const updatePassword = async (password: string) => {
      const { idToken } = loginInfo.value || {}
      const { error } = await useFetch(API.changePassword.url, {
        baseURL: runtimeConfig.public.authApiUrl,
        method: API.changePassword.method as 'post',
        params: {
          key: runtimeConfig.public.firebaseApiKey,
        },
        body: {
          idToken,
          password,
          returnSecureToken: true,
        },
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }
    }
    const resetPassword = async (email: string) => {
      const { error } = await useFetch(API.resetPassword.url, {
        baseURL: runtimeConfig.public.authApiUrl,
        method: API.resetPassword.method as 'post',
        params: {
          key: runtimeConfig.public.firebaseApiKey,
        },
        body: {
          requestType: 'PASSWORD_RESET',
          email,
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
    const createProfile = async (signUpData: SignUpData, body: Profile) => {
      const url = API.updateProfile.url.replace(':uid', signUpData.localId)
      const { error } = await useFetch(url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.updateProfile.method as 'put',
        params: {
          auth: signUpData.idToken,
        },
        body,
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }

      loginInfo.value = signUpData
    }
    const updateProfile = async (body: Profile) => {
      const { localId, idToken: auth, email } = (loginInfo.value as LoginInfo) || {}
      const url = API.updateProfile.url.replace(':uid', localId)
      const { data, error } = (await useFetch(url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.updateProfile.method as 'put',
        params: { auth },
        body,
      })) as { data: Ref<Profile>; error: Ref<FetchError> }

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }

      profile.value = { email, ...data.value }
    }
    const readProfile = async () => {
      const { localId, idToken: auth, email } = (loginInfo.value as LoginInfo) || {}
      const url = API.readProfile.url.replace(':uid', localId)
      const { data, error } = (await useFetch(url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.readProfile.method as 'post',
        params: { auth },
      })) as { data: Ref<Profile>; error: Ref<FetchError> }

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }

      profile.value = { email, ...data.value }
    }
    const createOrder = async (order: NewOrder) => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      const url = API.createOrder.url.replace(':uid', localId)
      const { error } = await useFetch(url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.createOrder.method as 'post',
        params: { auth },
        body: order,
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }
    }
    const readOrders = async () => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      const url = API.readOrders.url.replace(':uid', localId)
      const { data, error } = (await useFetch(url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.readOrders.method as 'get',
        params: { auth },
      })) as { data: Ref<RawOrder>; error: Ref<FetchError> }

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }

      orders.value = Object.keys(data.value).reduce((previousValue: Order[], currentValue) => {
        previousValue.push({
          orderID: currentValue,
          ...data.value[currentValue],
        } as unknown as Order)
        return previousValue
      }, [])
    }

    return {
      loginInfo,
      orders,
      profile,
      userLogin,
      userLogout,
      userSignUp,
      readPreferences,
      updatePreferences,
      updatePassword,
      resetPassword,
      createProfile,
      updateProfile,
      readProfile,
      createOrder,
      readOrders,
    }
  },
  {
    persist: {
      paths: ['loginInfo'],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore as any, import.meta.hot))
}
