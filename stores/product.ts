import { cloneDeep } from 'lodash-es'
import API from '@/assets/api.json'
import { FetchError, RawProducts, Products, States } from '@/types'

export const useProductStore = defineStore(
  'product',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const memberStore = useMemberStore()

    const products = ref<Products[]>([])
    const states = ref<States>({
      favorite: [],
      cart: [],
    })

    const updateState = async ({ name, value }: { name: keyof States; value: any }) => {
      const cloneStates: States = cloneDeep(states.value)
      const index = cloneStates[name].findIndex(item => item.id === value.id)
      if (index === -1) {
        cloneStates[name].push(value)
      } else {
        cloneStates[name].splice(index, 1)
      }

      states.value = cloneStates

      if (memberStore.loginInfo) {
        try {
          await memberStore.updatePreferences()
        } catch (error) {
          throw error
        }
      }
    }
    const getProducts = async () => {
      const { data, error } = (await useFetch(API.products.url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.products.method as 'get',
      })) as { data: Ref<RawProducts>; error: Ref<FetchError> }

      if (error.value) {
        showError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
      }

      if (data.value) {
        const result = Object.keys(data.value).map((key: keyof typeof data.value) => ({
          id: key,
          ...data.value[key],
        }))
        products.value = result as Products[]
      }
    }
    const getProduct = async (id: string) => {
      const url = API.product.url.replace(':id', id)
      const { data, error } = await useFetch(url, {
        baseURL: runtimeConfig.public.dbApiUrl,
        method: API.product.method as 'get',
      })

      if (error.value) {
        showError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.data?.error?.message,
        })
        return
      }

      if (!data.value) {
        showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        return
      }

      return { id, ...data.value }
    }

    return {
      states,
      products,
      updateState,
      getProducts,
      getProduct,
    }
  },
  {
    persist: {
      paths: ['states'],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore as any, import.meta.hot))
}
