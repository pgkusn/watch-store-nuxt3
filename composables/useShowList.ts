import { Products, Order } from '@/types'

export default () => {
  const showList = (list: unknown[]) => {
    const perPage = 8
    return computed(() => {
      const newList: unknown[][] = []
      list.forEach((item, i) => {
        if (i % perPage === 0) {
          newList.push([])
        }
        const page = Math.floor(i / perPage)

        newList[page].push(item)
      })
      return newList
    })
  }
  return { showList }
}
