<template>
  <div>
    <ProductNav :products="productData" :brand="brand" />
    <div class="container py-10 md:py-15">
      <ProductList :products="showProducts" />
      <Pagination :pages="products.length" :page="page" :url="`/products/${$route.params.brand}`" />
    </div>
    <Subscribe />
  </div>
</template>

<script lang="ts" setup>
import { Products } from '@/types'

useHead({ title: 'Product - Watch Store' })
const { $gsap } = useNuxtApp()
const route = useRoute()
const productStore = useProductStore()

const brand = computed(() => route.params.brand as string)
const page = computed(() => route.params.page as string)

if (productStore.products.length === 0) {
  await productStore.getProducts()
}

const productData = computed(() => productStore.products)
const singleBrandProduct = computed(() =>
  productData.value.filter(item => item.brand === (route.params.brand || 'agnes'))
)
const products = useShowList(singleBrandProduct) as Ref<Products[][]>
const showProducts = computed(() => {
  const page = Number(route.query.page)
  const values = products.value[page ? page - 1 : 0]
  if (!values) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
  return values
})

// Scroll to top when page changes
watch(
  () => route.query.page,
  () => {
    $gsap.to(window, {
      duration: 0.5,
      scrollTo: '#header',
      ease: 'Power1.easeOut',
    })
  }
)
</script>
