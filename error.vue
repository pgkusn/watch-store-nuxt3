<template>
  <div class="absolute inset-0 m-auto flex items-center justify-center text-2xl text-raisin-black">
    {{ error.message }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  error: Error
}>()
</script>
