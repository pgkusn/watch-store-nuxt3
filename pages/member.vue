<template>
  <button @click="memberStore.userLogout">logout</button>
</template>

<script setup>
import { useMemberStore } from '@/stores/member'

definePageMeta({
  middleware: 'auth',
})

const memberStore = useMemberStore()
</script>
