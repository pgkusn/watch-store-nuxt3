<template>
  <div>
    <div v-if="products.length" class="container py-10 md:py-15">
      <ProductList
        :products="showProducts"
        :tool="false"
        :trash="true"
        @removeProduct="removeProduct"
      />
      <Pagination :pages="products.length" :page="$route.query.page" url="/wishlist" />
    </div>
    <div
      v-else
      class="absolute inset-0 m-auto flex items-center justify-center text-2xl text-raisin-black"
    >
      無收藏的商品
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '我的收藏',
})

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const { showList } = useShowList()

const allProducts = computed(() => productStore.states.favorite)
const products = showList(allProducts)
const showProducts = computed(() =>
  route.query.page ? products.value[route.query.page - 1] : products.value[0]
)

const removeProduct = product => {
  productStore.updateState({ name: 'favorite', value: product })
  if (!showProducts.value && route.query.page > 1) {
    router.replace('/wishlist')
  }
}
</script>
