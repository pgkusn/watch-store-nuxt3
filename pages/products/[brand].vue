<template>
  <div>
    <ProductNav :products="productData" :brand="$route.params.brand" />
    <div class="container py-10 md:py-15">
      <ProductList :products="showProducts" />
      <Pagination
        :pages="products.length"
        :page="$route.query.page"
        :url="`/products/${$route.params.brand}`"
      />
    </div>
    <Subscribe />
  </div>
</template>

<script setup>
useHead({
  title: '產品',
})

const route = useRoute()
const productStore = useProductStore()
const { showList } = useShowList()

const productData = computed(() => productStore.products)
const singleBrandProduct = computed(() =>
  productData.value.filter(item => item.brand === (route.params.brand || 'agnes'))
)
const products = showList(singleBrandProduct)
const showProducts = computed(() => {
  const values = route.query.page ? products.value[route.query.page - 1] : products.value[0]
  if (!values) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
  return values
})

// Scroll to top when page changes
watch(showProducts, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

if (productStore.products.length === 0) {
  productStore.getProducts()
}
</script>
