<template>
  <div></div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'

const router = useRouter()
const productStore = useProductStore()

if (productStore.products.length === 0) {
  try {
    await productStore.getProducts()
  } catch ({ statusCode, statusMessage }) {
    showError({ statusCode, statusMessage })
  }
}

router.replace(`/products/${productStore.products[0].brand}`)
</script>
