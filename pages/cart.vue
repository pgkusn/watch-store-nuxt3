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
import { useMainStore } from '@/stores/main'
import { useProductStore } from '@/stores/product'
import { useMemberStore } from '@/stores/member'

useHead({
  title: '購物車',
})

const router = useRouter()
const route = useRoute()
const mainStore = useMainStore()
const productStore = useProductStore()
const memberStore = useMemberStore()
const { showList } = useShowList()

const allProducts = computed(() => productStore.states.cart)
const products = showList(allProducts)
const showProducts = computed(() =>
  route.query.page ? products.value[route.query.page - 1] : products.value[0]
)
const orderSuccess = ref(false)

const removeProduct = product => {
  productStore.updateState({ name: 'cart', value: product })
  if (!showProducts && route.query.page > 1) {
    router.replace('/cart')
  }
}
const postOrder = async () => {
  if (!memberStore.loginInfo) {
    router.push('/login?redirect=cart')
    return
  }
  const order = allProducts.value.reduce(
    (previousValue, currentValue) => {
      previousValue.content.push({ name: currentValue.fullBrand, amount: currentValue.amount })
      previousValue.total += currentValue.price
      previousValue.createTime = new Date().getTime()
      return previousValue
    },
    { content: [], total: 0 }
  )
  try {
    await memberStore.createOrder(order)
    await mainStore.setAlertMsgHandler('訂購成功')
    productStore.states.cart = []
    orderSuccess.value = true
  } catch ({ statusCode, statusMessage }) {
    if (statusCode === 401) {
      await mainStore.setAlertMsgHandler('登入逾時，請重新登入！')
      memberStore.userLogout()
      router.replace('/login?redirect=cart')
      return
    }
    showError({ statusCode, statusMessage })
  }
}
</script>
