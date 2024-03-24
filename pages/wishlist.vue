<template>
  <div>
    <div v-if="products.length" class="container py-10 md:py-15">
      <ProductList
        :products="showProducts"
        :tool="false"
        :trash="true"
        @removeProduct="removeProduct"
      />
      <Pagination :pages="products.length" :page="$route.query.page as string" url="/wishlist" />
    </div>
    <div
      v-else
      class="absolute inset-0 m-auto flex items-center justify-center text-2xl text-raisin-black"
    >
      無收藏的商品
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Products } from '@/types'

useHead({ title: 'Wishlist - Watch Store' })
const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const allProducts = computed<Products[]>(() => productStore.states.favorite)
const products = useShowList(allProducts) as Ref<Products[][]>
const showProducts = computed(() => {
  const page = Number(route.query.page)
  return products.value[page ? page - 1 : 0]
})

const removeProduct = (product: Products) => {
  productStore.updateState({ name: 'favorite', value: product })
  const page = Number(route.query.page)
  if (!showProducts.value && page > 1) {
    router.replace('/wishlist')
  }
}
</script>
