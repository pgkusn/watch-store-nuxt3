export default () => {
  const showList = list => {
    const perPage = 8
    return computed(() => {
      const newList = []
      list.value.forEach((item, i) => {
        if (i % perPage === 0) {
          newList.push([])
        }
        const page = parseInt(i / perPage)
        newList[page].push(item)
      })
      return newList
    })
  }
  return { showList }
}
