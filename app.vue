<template>
  <div class="flex min-h-screen flex-col">
    <HeaderBlock />

    <main class="relative flex-grow overflow-hidden">
      <!-- transition issue solution (https://github.com/nuxt/nuxt/issues/13350#issuecomment-1397297975) -->
      <Transition name="page" mode="out-in">
        <div :key="($route.name as string).split('-')[0]">
          <NuxtPage />
        </div>
      </Transition>
    </main>

    <FooterBlock />

    <transition name="fade">
      <Alert v-if="mainStore.alertMsg" :msg="mainStore.alertMsg" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
  ],
})
useSeoMeta({
  ogUrl: 'https://watch-store-nuxt3.vercel.app/',
  ogType: 'website',
  ogTitle: 'Watch Store',
  ogImage: 'https://watch-store-nuxt3.vercel.app/hero.jpg',
})

const mainStore = useMainStore()
</script>

<style lang="postcss">
@media screen(xl) {
  .container {
    @apply px-0;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
