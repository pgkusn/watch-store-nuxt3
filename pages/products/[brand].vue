<template>
  <div>
    <ProductNav :products="productData" :brand="($route.params.brand as string)" />
    <div class="container py-10 md:py-15">
      <ProductList :products="showProducts" />
      <Pagination
        :pages="products.length"
        :page="($route.query.page as string)"
        :url="`/products/${$route.params.brand}`"
      />
    </div>
    <Subscribe />
  </div>
</template>

<script lang="ts" setup>
import { Products } from '@/types'

useHead({
  title: 'Product',
})

const route = useRoute()
const productStore = useProductStore()
const { showList } = useShowList()

if (productStore.products.length === 0) {
  await productStore.getProducts()
}

const productData = computed(() => productStore.products)
const singleBrandProduct = computed(() =>
  productData.value.filter(item => item.brand === (route.params.brand || 'agnes'))
)
const products = showList(singleBrandProduct.value) as Ref<Products[][]>
const showProducts = computed(() => {
  const page = Number(route.query.page)
  const values = products.value[page ? page - 1 : 0]
  if (!values) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
  return values
})

// Scroll to top when page changes
watch(showProducts, () => {
  window.scrollTo({ top: 0 })
})
</script>
