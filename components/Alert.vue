<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center bg-[#00000080]">
    <div
      class="flex w-[165px] items-center justify-center rounded bg-white p-4 text-xl text-raisin-black md:w-[540px]"
    >
      {{ msg }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  msg: {
    type: String,
    default: '',
  },
})
</script>
