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
      // TODO: update state to server
    }
    const getProducts = async () => {
      try {
        const { data } = await useFetch(API.products.url, {
          baseURL: runtimeConfig.public.mockApiUrl,
          method: API.products.method,
        })
        products.value = Object.keys(data.value).map(key => ({
          id: key,
          ...data.value[key],
        }))
      } catch (error) {
        console.error(error.message)
      }
    }
    const getProduct = async id => {
      try {
        const url = API.product.url.replace(':id', id)
        const { data } = await useFetch(url, {
          baseURL: runtimeConfig.public.mockApiUrl,
          method: API.product.method,
        })
        return { id, ...data }
      } catch (error) {
        console.error(error.message)
      }
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
