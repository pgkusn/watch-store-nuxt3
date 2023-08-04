<template>
  <div
    class="grid auto-rows-auto grid-cols-2 gap-y-7 gap-x-[15px] md:grid-cols-4 md:gap-y-14 md:gap-x-[30px]"
  >
    <div v-for="product in products" :key="product.id" class="group relative flex flex-col">
      <nuxt-link
        :to="`/product/${product.brand}/${product.id}`"
        class="product-link bg-50% relative block bg-white bg-center bg-no-repeat pt-[100%]"
      >
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ 'background-image': `url(${product.url})` }"
        />
        <div
          v-if="amount && product.amount > 1"
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-3xl text-white"
        >
          x {{ product.amount }}
        </div>
      </nuxt-link>
      <h2 class="mt-1 flex-grow text-xl lg:text-2xl">
        {{ product.name }}
      </h2>
      <p>{{ product.fullBrand }}</p>
      <ul class="flex">
        <li>
          {{
            product.discount
              ? useFormatPrice(Math.floor(product.price * product.discount))
              : useFormatPrice(product.price)
          }}
        </li>
        <li v-if="product.discount < 1" class="ml-[6px] text-dark-gray line-through">
          {{ useFormatPrice(product.price) }}
        </li>
      </ul>
      <div v-if="tool">
        <button
          class="material-icons align-middle text-raisin-black focus:outline-none"
          :class="{ 'opacity-50': !inFavorite(product.id) }"
          @click="updateState('favorite', product)"
        >
          favorite
        </button>
        <button
          class="material-icons ml-[10px] align-middle text-raisin-black focus:outline-none"
          :class="{ 'opacity-50': !inCart(product.id) }"
          @click="updateState('cart', product)"
        >
          shopping_cart
        </button>
      </div>
      <button
        v-if="trash"
        class="material-icons absolute top-2 right-2 rounded-full bg-white text-black opacity-50 focus:outline-none md:hidden md:group-hover:block"
        @click="$emit('removeProduct', product)"
      >
        close
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Products } from '@/types'

const props = defineProps({
  products: {
    type: Array as PropType<Products[]>,
    default: () => [],
  },
  tool: {
    type: Boolean,
    default: true,
  },
  trash: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['removeProduct'])

const productStore = useProductStore()

const { states } = storeToRefs(productStore)

const inFavorite = (id: string) => states.value.favorite.find(item => item.id === id)
const inCart = (id: string) => states.value.cart.find(item => item.id === id)
const updateState = (name: 'favorite' | 'cart', value: Products) => {
  if (name === 'cart') {
    value.amount = 1
  }
  productStore.updateState({ name, value })
}
</script>

<style scoped>
.product-link {
  background-image: url('@/assets/images/logo-light.svg');
}
</style>
