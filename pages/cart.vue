<template>
  <div>
    <div class="container py-10 md:py-15">
      <ProductList
        :products="showProducts"
        :tool="false"
        :trash="true"
        :amount="true"
        @removeProduct="removeProduct"
      />
      <Pagination :pages="products.length" :page="$route.query.page" url="/cart" />
      <button
        v-if="products.length"
        class="mx-auto mt-10 block h-[38px] w-[160px] rounded bg-raisin-black text-white focus:outline-none md:mt-15"
        @click="postOrder"
      >
        送出訂單
      </button>
    </div>
    <div
      v-if="!products.length"
      class="absolute inset-0 m-auto flex items-center justify-center text-2xl text-raisin-black"
    >
      {{ orderSuccess ? '訂單已送出' : '購物車內無商品' }}
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const { showList } = useShowList()

const allProducts = computed(() => productStore.states.cart)
const products = showList(allProducts)
const showProducts = computed(() =>
  route.query.page ? products.value[route.query.page - 1] : products.value[0]
)
const removeProduct = product => {
  productStore.updateState({ name: 'cart', value: product })
  if (!showProducts && route.query.page > 1) {
    router.replace('/cart')
  }
}

const orderSuccess = ref(false)
const loginInfo = computed(() => memberStore.loginInfo)
// TODO: 送出訂單
const postOrder = () => {}
</script>
