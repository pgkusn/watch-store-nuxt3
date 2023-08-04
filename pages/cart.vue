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
      <Pagination :pages="products.length" :page="$route.query.page as string" url="/cart" />
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

<script lang="ts" setup>
import { Products, Product, NewOrder, NewOrderContent } from '@/types'

useHead({ title: 'Cart' })
const router = useRouter()
const route = useRoute()
const mainStore = useMainStore()
const productStore = useProductStore()
const memberStore = useMemberStore()

const allProducts = computed<Products[]>(() => productStore.states.cart)
const products = useShowList(allProducts) as Ref<Products[][]>
const showProducts = computed(() => {
  const page = Number(route.query.page)
  return page ? products.value[page - 1] : products.value[0]
})
const orderSuccess = ref(false)

const removeProduct = (product: Product) => {
  const page = Number(route.query.page)
  productStore.updateState({ name: 'cart', value: product })
  if (!showProducts && page > 1) {
    router.replace('/cart')
  }
}
const postOrder = async () => {
  if (!memberStore.loginInfo) {
    router.push('/login?redirect=cart')
    return
  }
  const order = allProducts.value.reduce(
    (previousValue: NewOrder, currentValue) => {
      previousValue.content.push({
        name: currentValue.fullBrand,
        amount: currentValue.amount,
      } as NewOrderContent)
      previousValue.total += currentValue.price as number
      previousValue.createTime = new Date().getTime()
      return previousValue
    },
    { content: [], total: 0, createTime: 0 }
  )
  try {
    await memberStore.createOrder(order)
    await memberStore.readOrders()
    await mainStore.setAlertMsgHandler('訂購成功')
    productStore.states.cart = []
    orderSuccess.value = true
  } catch (error) {
    const { statusCode, statusMessage } = error as { statusCode: number; statusMessage: string }
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
