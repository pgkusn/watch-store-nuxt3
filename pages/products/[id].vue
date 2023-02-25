<template>
  <div>
    <ProductNav :products="productData" :brand="$route.params.id" />

    <div class="container py-10 md:py-15">
      <ProductList :products="showProducts" />
      <Pagination
        :pages="products.length"
        :page="$route.query.page"
        :url="`/products/${$route.params.id}`"
      />
    </div>

    <Subscribe />
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'

const route = useRoute()
const productStore = useProductStore()
const { showList } = useShowList()

const productData = computed(() => productStore.products)
const singleBrandProduct = computed(() =>
  productData.value.filter(item => item.brand === (route.params.id || 'agnes'))
)
const products = showList(singleBrandProduct)
const showProducts = computed(() =>
  route.query.page ? products.value[route.query.page - 1] : products.value[0]
)

if (productStore.products.length === 0) {
  productStore.getProducts()
}
</script>
