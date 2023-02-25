import { defineStore, acceptHMRUpdate } from 'pinia'
import API from '@/assets/data/api.json'

export const useMemberStore = defineStore('member', () => {
  const runtimeConfig = useRuntimeConfig()
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
