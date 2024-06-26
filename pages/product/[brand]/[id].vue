<template>
  <div
    v-if="product"
    class="container grid grid-rows-[repeat(5,auto)] gap-[30px] pt-8 pb-10 md:grid-cols-3 md:grid-rows-[repeat(3,auto)] md:pt-12 md:pb-15"
  >
    <div class="md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-1">
      <div
        class="bg-cover bg-center pt-[63%]"
        :style="{ 'background-image': `url(${product.imageUrl[0]})` }"
      />
    </div>
    <div class="md:col-span-1 md:col-start-3 md:row-span-full md:row-start-1">
      <section class="mx-auto max-w-[350px]">
        <h1 class="text-[32px]">
          {{ product.name }}
        </h1>
        <p class="mt-1 whitespace-pre-line text-xl">
          {{ product.description }}
        </p>
        <p class="mt-8 text-xl">
          {{ useFormatPrice(product.price) }}
        </p>
        <form class="mt-3 flex h-[50px]" @submit.prevent="updateState('cart')">
          <div class="relative w-[45%]">
            <select
              v-model="amountComputed"
              class="h-full w-full appearance-none rounded-l rounded-r-none border border-raisin-black pl-4 focus:outline-none"
              :disabled="inCart ? true : false"
            >
              <option v-for="n in 10" :key="n" :value="n">
                {{ n }}
              </option>
            </select>
            <div class="triangle absolute top-1/2 right-3 -translate-y-1/2 transform" />
          </div>
          <input
            type="submit"
            :value="inCart ? '從購物車移除' : '加入購物車'"
            class="w-[55%] cursor-pointer rounded-r rounded-l-none bg-raisin-black text-white"
          />
        </form>
        <button class="mt-3 focus:outline-none" @click="updateState('favorite')">
          <span
            class="material-icons align-middle text-raisin-black"
            :class="{ 'opacity-50': !inFavorite }"
            >favorite</span
          >
          <span class="ml-0.5">{{ inFavorite ? '已收藏' : '加入我的收藏' }}</span>
        </button>
        <h2 class="mt-10 font-bold md:mt-20">商品購買須知</h2>
        <p class="mt-2">
          產品因拍攝關係顏色可能略有差異，實際以廠商出貨為主。
          商品情境照為示意用，僅商品主體不包含其他配件，請以規格內容物為主。 D’Perfume
          盡可能確保所列商品備貨充足，但偶爾仍會有產品售罄的情況。如您所訂購的商品庫存不足，我們將盡快以電子郵件通知您。任何訂單變動均會在訂單總額與出貨訊息內更新。
        </p>
        <h2 class="mt-5 font-bold">退換貨須知</h2>
        <p class="mt-2">
          依《消費者保護法》的規定，於全站購物皆享有商品到貨【七日猶豫期】（含例假日）之權益。若收到的商品有任何問題，可於猶豫期內申請退貨。
        </p>
      </section>
    </div>
    <div class="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-2">
      <div
        class="bg-cover bg-center pt-[185%]"
        :style="{ 'background-image': `url(${product.imageUrl[1]})` }"
      />
    </div>
    <div class="md:col-span-1 md:col-start-2 md:row-span-1 md:row-start-2">
      <div
        class="bg-cover bg-center pt-[185%]"
        :style="{ 'background-image': `url(${product.imageUrl[2]})` }"
      />
    </div>
    <div class="md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-3">
      <div
        class="bg-cover bg-center pt-[133%] md:pt-[63%]"
        :style="{ 'background-image': `url(${product.imageUrl[3]})` }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OrNull, Product, States } from '@/types'

const route = useRoute()
const productStore = useProductStore()

const { states } = storeToRefs(productStore)
const product = ref<OrNull<Product>>(null)
const productData = computed(() => productStore.products)

useHead({
  title: computed(() => product.value?.name as string),
  titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - Watch Store` : 'Watch Store'),
})

const amount = ref(1)
const amountComputed = computed({
  get() {
    return inCart.value?.amount || amount.value
  },
  set(value) {
    amount.value = value
  },
})

const inFavorite = computed(() => states.value.favorite.find(item => item.id === product.value?.id))
const inCart = computed(() => states.value.cart.find(item => item.id === product.value?.id))

const updateState = (name: keyof States) => {
  const currentProduct = productData.value.find(item => item.id === product.value?.id)
  productStore.updateState({ name, value: { ...currentProduct, amount: amount.value } })
}

if (productStore.products.length === 0) {
  await productStore.getProducts()
}

product.value = (await productStore.getProduct(route.params.id as string)) as Product
</script>

<style lang="scss" scoped>
.triangle {
  &::before,
  &::after {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
  }
  &::before {
    border-width: 0 3px 4px 3px;
    border-color: transparent transparent #373a3c transparent;
  }
  &::after {
    margin-top: 3px;
    border-width: 4px 3px 0 3px;
    border-color: #373a3c transparent transparent transparent;
  }
}
</style>
