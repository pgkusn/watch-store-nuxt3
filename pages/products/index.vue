<template>
  <div></div>
</template>

<script setup>
const router = useRouter()
const productStore = useProductStore()

if (productStore.products.length === 0) {
  await productStore.getProducts()
}
if (productStore.products.length) {
  router.replace(`/products/${productStore.products[0].brand}`)
}
</script>
