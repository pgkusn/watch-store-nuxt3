<template>
  <div></div>
</template>

<script lang="ts" setup>
const router = useRouter()
const productStore = useProductStore()

const { products } = storeToRefs(productStore)

if (products.value.length === 0) {
  await productStore.getProducts()
}
if (products.value.length) {
  router.replace(`/products/${products.value[0].brand}`)
}
</script>
