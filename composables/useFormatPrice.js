export default () => {
  const formatPrice = num => 'NT$' + num.toLocaleString()
  return { formatPrice }
}
