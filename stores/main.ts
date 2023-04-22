export const useMainStore = defineStore('main', () => {
  const alertMsg = ref('')

  const setAlertMsgHandler = (msg: string): Promise<void> => {
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
  import.meta.hot.accept(acceptHMRUpdate(useMainStore as any, import.meta.hot))
}
