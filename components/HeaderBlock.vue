<template>
  <div class="container flex items-center py-[9px]">
    <NuxtLink to="/" class="w-12">
      <img src="@/assets/images/logo.svg" alt="Watch Store" />
    </NuxtLink>
    <NuxtLink to="/cart" class="relative ml-auto mr-4 md:hidden">
      <span class="material-icons text-dark-gray">shopping_cart</span>
      <span
        v-show="cart.length"
        class="absolute -top-1 -right-1 rounded-lg bg-raisin-black px-1 text-xs text-white"
        >{{ cart.length }}</span
      >
    </NuxtLink>
    <label for="nav" class="cursor-pointer md:hidden" @click="stopPropagation">
      <span class="material-icons text-4xl text-dark-gray">menu</span>
    </label>
    <input id="nav" v-model="showNav" class="hidden" type="checkbox" />
    <nav
      class="pointer-events-none absolute inset-x-0 top-[62px] z-10 flex flex-col bg-dark-gray text-center text-white opacity-0 transition-opacity duration-300 md:pointer-events-auto md:static md:ml-auto md:flex-row md:bg-transparent md:text-dark-gray md:opacity-100"
    >
      <button
        class="nav__link text-xl leading-[56px] md:hover:text-raisin-black"
        :class="{
          'router-link-active':
            $route.name === 'products-brand' || $route.name === 'product-brand-id',
        }"
        @click="handleProductClick"
      >
        <span class="material-icons hidden align-middle md:inline-block">store</span>
        Product
      </button>
      <NuxtLink
        :to="loginInfo ? '/member' : '/login'"
        class="nav__link order-1 text-xl leading-[56px] md:order-none md:hover:text-raisin-black"
      >
        <span class="material-icons hidden align-middle md:inline-block">person</span>
        {{ loginInfo ? 'Mypage' : 'Log in' }}
      </NuxtLink>
      <NuxtLink to="/wishlist" class="nav__link text-xl leading-[56px] md:hover:text-raisin-black">
        <span class="material-icons hidden align-middle md:inline-block">favorite</span>
        Wishlist
      </NuxtLink>
      <NuxtLink
        to="/cart"
        class="nav__link hidden text-xl leading-[56px] md:block md:hover:text-raisin-black"
      >
        <span class="material-icons hidden align-middle md:inline-block">shopping_cart</span>
        Cart<span v-show="cart.length">({{ cart.length }})</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const productStore = useProductStore()
const memberStore = useMemberStore()

const { products } = storeToRefs(productStore)

const cart = computed(() => productStore.states.cart)
const loginInfo = computed(() => memberStore.loginInfo)

// toggle nav
const showNav = ref(false)
const clickHandler = () => {
  showNav.value = false
}
const stopPropagation = (e: Event) => {
  e.stopPropagation()
}

const handleProductClick = async () => {
  if (!products.value.length) {
    await productStore.getProducts()
    if (!products.value.length) return
  }
  router.push(`/products/${products.value[0].brand}`)
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', clickHandler)
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable';

#nav:checked + nav {
  opacity: 1;
  pointer-events: auto;
}
.nav__link + .nav__link {
  border-top: 1px solid #fff;
  @media (min-width: #{$screen-md}px) {
    margin-left: 32px;
    border-top: none;
  }
}
nav > .router-link-active {
  background-color: #666;
  @media (min-width: #{$screen-md}px) {
    background-color: transparent;
    color: #1d1e2c;
  }
}
</style>
