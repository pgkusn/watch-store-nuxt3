<template>
  <footer class="bg-raisin-black text-white">
    <div class="container flex h-[80px] items-center justify-between">
      <nuxt-link to="/" class="w-12">
        <img src="@/assets/images/logo-white.svg" alt="Watch Store" />
      </nuxt-link>
      <ClientOnly>
        <a
          href="https://www.freepik.com/vectors/logo"
          target="_blank"
          class="text-sm"
          v-html="content"
        ></a>
      </ClientOnly>
    </div>
  </footer>
</template>

<script setup>
import { useMediaQuery } from '@vueuse/core'

const isSmallScreen = useMediaQuery('(min-width: 640px)')

const content = computed(() =>
  isSmallScreen.value
    ? 'Logo vector created by eightonesix - www.freepik.com'
    : 'Logo vector created by eightonesix<br />www.freepik.com'
)
</script>
