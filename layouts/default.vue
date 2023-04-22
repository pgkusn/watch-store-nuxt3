<template>
  <div class="flex min-h-screen flex-col">
    <HeaderBlock />

    <main class="relative flex-grow overflow-hidden">
      <slot />
    </main>

    <FooterBlock />

    <transition name="fade">
      <Alert v-if="mainStore.alertMsg" :msg="mainStore.alertMsg" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
const mainStore = useMainStore()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
