import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const alertMsg = ref('')

  const setAlertMsgHandler = msg => {
    return new Promise(resolve => {
      alertMsg.value = msg
      setTimeout(() => {
        alertMsg.value = ''
        resolve()
      }, 1300)
    })
  }

  return {
    alertMsg,
    setAlertMsgHandler,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
