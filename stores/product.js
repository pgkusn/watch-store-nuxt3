import { defineStore, acceptHMRUpdate } from 'pinia'
import { cloneDeep } from 'lodash-es'
import API from '@/assets/data/api.json'
import { useMemberStore } from '@/stores/member'

export const useProductStore = defineStore(
  'product',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const memberStore = useMemberStore()

    const products = ref([])
    const states = ref({
      favorite: [],
      cart: [],
    })

    const updateState = ({ name, value }) => {
      const cloneStates = cloneDeep(states.value)
      const index = cloneStates[name].findIndex(item => item.id === value.id)
      if (index === -1) {
        cloneStates[name].push(value)
      } else {
        cloneStates[name].splice(index, 1)
      }
      states.value = cloneStates
      memberStore.updatePreferences(cloneStates)
    }
    const getProducts = async () => {
      const { data, error } = await useFetch(API.products.url, {
        baseURL: runtimeConfig.public.dbApiUrl,
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
        baseURL: runtimeConfig.public.dbApiUrl,
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
