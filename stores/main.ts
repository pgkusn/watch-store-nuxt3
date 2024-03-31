import API from '@/assets/api.json'
import { FetchError, CityList } from '@/types'

export const useMainStore = defineStore('main', () => {
  const alertMsg = ref('')
  const cities = ref<CityList[]>([])

  const setAlertMsgHandler = (msg: string): Promise<void> => {
    return new Promise(resolve => {
      alertMsg.value = msg
      setTimeout(() => {
        alertMsg.value = ''
        resolve()
      }, 1300)
    })
  }

  const getCities = async () => {
    const { data, error } = (await useFetch(API.getCityList.url, {
      method: API.products.method as 'get',
    })) as { data: Ref<CityList[]>; error: Ref<FetchError> }

    if (error.value) {
      showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.data?.error?.message,
      })
    }

    if (data.value) {
      cities.value = data.value
    }
  }

  return {
    alertMsg,
    cities,
    setAlertMsgHandler,
    getCities,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore as any, import.meta.hot))
}
