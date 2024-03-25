<template>
  <div class="overflow-auto bg-raisin-black">
    <div class="container flex h-[52px] items-center whitespace-nowrap">
      <NuxtLink
        v-for="item in brands"
        :key="item.brand"
        :to="`/products/${item.brand}`"
        :class="[
          'px-[14px] text-xl leading-[52px] text-white md:hover:bg-coral-black',
          { 'bg-coral-black': brand === item.brand },
        ]"
      >
        {{ item.fullBrand }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Products, Brands } from '@/types'

const props = withDefaults(
  defineProps<{
    products: Products[]
    brand: string
  }>(),
  {
    brand: 'agnes',
  }
)

const brands = computed(() => {
  const all = props.products.reduce((previousValue: Brands[], currentValue) => {
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
