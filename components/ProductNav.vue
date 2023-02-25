<template>
  <div class="overflow-auto bg-raisin-black">
    <div class="container flex h-[52px] items-center whitespace-nowrap">
      <nuxt-link
        v-for="item in brands"
        :key="item.brand"
        :to="`/products/${item.brand}`"
        :class="[
          'px-[14px] text-xl leading-[52px] text-white md:hover:bg-coral-black',
          { 'bg-coral-black': brand === item.brand },
        ]"
      >
        {{ item.fullBrand }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  brand: {
    type: String,
    default: 'agnes',
  },
})

const brands = computed(() => {
  const all = props.products.reduce((previousValue, currentValue) => {
    previousValue.push({
      brand: currentValue.brand,
      fullBrand: currentValue.fullBrand,
    })
    return previousValue
  }, [])

  // 去除重複物件
  const strAry = all.map(item => JSON.stringify(item))
  const single = Array.from(new Set(strAry))
  const final = single.map(item => JSON.parse(item))

  return final
})
</script>
