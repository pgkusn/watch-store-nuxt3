import API from '@/assets/data/api.json'
import { OrNull, States, LoginInfo, SignUpData, Profile, RawOrder, Order, NewOrder } from '@/types'

export const useMemberStore = defineStore(
  'member',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const productStore = useProductStore()

    const loginInfo = ref<OrNull<LoginInfo>>(null)
    const orders = ref<Order[]>([])
    const profile = ref<OrNull<Profile>>(null)

    const userLogin = async ({ email, password }: { email: string; password: string }) => {
      try {
        const result = await $fetch(API.userLogin.url, {
          baseURL: runtimeConfig.public.authApiUrl,
          method: API.userLogin.method as 'post',
          query: {
            key: runtimeConfig.public.firebaseApiKey,
          },
          body: {
            email,
            password,
            returnSecureToken: true,
          },
        })
        loginInfo.value = result as LoginInfo
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        let statusMessage = data?.error?.message
        switch (statusMessage) {
          case 'EMAIL_NOT_FOUND':
            statusMessage = 'Email 不存在'
            break
          case 'INVALID_PASSWORD':
            statusMessage = '密碼錯誤'
            break
        }
        throw createError({
          statusCode,
          statusMessage,
        })
      }
    }
    const userLogout = () => {
      loginInfo.value = null
      orders.value = []
      profile.value = null
    }
    const userSignUp = async ({ email, password }: { email: string; password: string }) => {
      try {
        return await $fetch(API.userSignUp.url, {
          baseURL: runtimeConfig.public.authApiUrl,
          method: API.userSignUp.method as 'post',
          query: {
            key: runtimeConfig.public.firebaseApiKey,
          },
          body: {
            email,
            password,
            returnSecureToken: true,
          },
        })
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        let statusMessage = data?.error?.message
        switch (statusMessage) {
          case 'EMAIL_EXISTS':
            statusMessage = 'Email 重複'
            break
          case 'INVALID_EMAIL':
            statusMessage = 'Email 格式錯誤'
            break
        }
        throw createError({
          statusCode,
          statusMessage,
        })
      }
    }
    const readPreferences = async () => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      try {
        const { cart = [], favorite = [] } = await $fetch(
          API.readPreferences.url.replace(':uid', localId),
          {
            baseURL: runtimeConfig.public.dbApiUrl,
            method: API.readPreferences.method as 'get',
            query: { auth },
          }
        ).then(res => (res as States) ?? {})
        if (!productStore.states.cart.length) productStore.states.cart = cart
        if (!productStore.states.favorite.length) productStore.states.favorite = favorite
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const updatePreferences = async () => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      try {
        await $fetch(API.updatePreferences.url.replace(':uid', localId), {
          baseURL: runtimeConfig.public.dbApiUrl,
          method: API.updatePreferences.method as 'put',
          query: { auth },
          body: {
            favorite: productStore.states.favorite,
            cart: productStore.states.cart,
          },
        })
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const updatePassword = async (password: string) => {
      const { idToken } = loginInfo.value || {}
      try {
        await $fetch(API.changePassword.url, {
          baseURL: runtimeConfig.public.authApiUrl,
          method: API.changePassword.method as 'post',
          query: {
            key: runtimeConfig.public.firebaseApiKey,
          },
          body: {
            idToken,
            password,
            returnSecureToken: true,
          },
        })
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const resetPassword = async (email: string) => {
      try {
        await $fetch(API.resetPassword.url, {
          baseURL: runtimeConfig.public.authApiUrl,
          method: API.resetPassword.method as 'post',
          query: {
            key: runtimeConfig.public.firebaseApiKey,
          },
          body: {
            requestType: 'PASSWORD_RESET',
            email,
          },
        })
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        let statusMessage = data?.error?.message
        switch (statusMessage) {
          case 'EMAIL_NOT_FOUND':
            statusMessage = '查無此信箱'
            break
          case 'INVALID_EMAIL':
            statusMessage = 'Email 格式錯誤'
            break
        }
        throw createError({
          statusCode,
          statusMessage,
        })
      }
    }
    const createProfile = async (signUpData: SignUpData, body: Profile) => {
      const url = API.updateProfile.url.replace(':uid', signUpData.localId)
      try {
        await $fetch(url, {
          baseURL: runtimeConfig.public.dbApiUrl,
          method: API.updateProfile.method as 'put',
          query: {
            auth: signUpData.idToken,
          },
          body,
        })
        loginInfo.value = signUpData
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const updateProfile = async (body: Profile) => {
      const { localId, idToken: auth, email } = (loginInfo.value as LoginInfo) || {}
      try {
        const url = API.updateProfile.url.replace(':uid', localId)
        const result = (await $fetch(url, {
          baseURL: runtimeConfig.public.dbApiUrl,
          method: API.updateProfile.method as 'put',
          query: { auth },
          body,
        })) as Profile
        profile.value = { email, ...result }
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const readProfile = async () => {
      const { localId, idToken: auth, email } = (loginInfo.value as LoginInfo) || {}
      const url = API.readProfile.url.replace(':uid', localId)
      try {
        const result = (await $fetch(url, {
          baseURL: runtimeConfig.public.dbApiUrl,
          method: API.readProfile.method as 'post',
          query: { auth },
        })) as Profile
        profile.value = { email, ...result }
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const createOrder = async (order: NewOrder) => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      const url = API.createOrder.url.replace(':uid', localId)
      try {
        await $fetch(url, {
          baseURL: runtimeConfig.public.dbApiUrl,
          method: API.createOrder.method as 'post',
          query: { auth },
          body: order,
        })
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
    }
    const readOrders = async () => {
      const { localId, idToken: auth } = (loginInfo.value as LoginInfo) || {}
      const url = API.readOrders.url.replace(':uid', localId)
      try {
        const result = (await $fetch(url, {
          baseURL: runtimeConfig.public.dbApiUrl,
          method: API.readOrders.method as 'get',
          query: { auth },
        })) as RawOrder
        if (!result) return
        orders.value = Object.keys(result).reduce((previousValue: Order[], currentValue) => {
          previousValue.push({
            orderID: currentValue,
            ...result[currentValue],
          } as unknown as Order)
          return previousValue
        }, [])
      } catch (error) {
        const { statusCode, data } = error as {
          statusCode: number
          data: { error: { message: string } }
        }
        throw createError({
          statusCode,
          statusMessage: data?.error?.message,
        })
      }
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
