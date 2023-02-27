<template>
  <NuxtLayout>
    <!-- transition issue solution (https://github.com/nuxt/nuxt/issues/13350#issuecomment-1397297975) -->
    <Transition name="page" mode="out-in">
      <div :key="$route.fullPath">
        <NuxtPage />
      </div>
    </Transition>
  </NuxtLayout>
</template>

<script setup>
import { useMemberStore } from '@/stores/member'

useHead({
  title: 'Watch Store',

  // TODO: og meta

  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
  ],
})

// check login status
const memberStore = useMemberStore()
const cookie = useCookie('loginInfo')
if (cookie.value) {
  memberStore.loginInfo = cookie.value
}
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
</style>
