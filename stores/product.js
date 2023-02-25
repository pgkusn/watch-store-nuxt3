import { defineStore, acceptHMRUpdate } from 'pinia'
import API from '@/assets/data/api.json'

export const useProductStore = defineStore(
  'product',
  () => {
    const runtimeConfig = useRuntimeConfig()

    const products = ref([])
    const states = ref({
      favorite: [],
      cart: [],
    })

    const updateState = ({ name, value }) => {
      const state = states.value[name]
      const index = state.findIndex(item => item.id === value.id)
      if (index === -1) {
        state.push(value)
      } else {
        state.splice(index, 1)
      }
      // TODO: 將 state 存入資料庫
    }
    const getProducts = async () => {
      const { data, error } = await useFetch(API.products.url, {
        baseURL: runtimeConfig.public.mockApiUrl,
        method: API.products.method,
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: 'Oops! Something went wrong.',
        })
      }

      products.value = Object.keys(data.value).map(key => ({
        id: key,
        ...data.value[key],
      }))
    }
    const getProduct = async id => {
      const url = API.product.url.replace(':id', id)
      const { data, error } = await useFetch(url, {
        baseURL: runtimeConfig.public.mockApiUrl,
        method: API.product.method,
      })

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: 'Oops! Something went wrong.',
        })
      }
      if (!data.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
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
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
