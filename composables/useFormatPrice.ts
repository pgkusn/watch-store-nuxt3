export default () => {
  const formatPrice = (num: number) => 'NT$' + num.toLocaleString()
  return { formatPrice }
}
