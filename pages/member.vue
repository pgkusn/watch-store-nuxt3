<template>
  <div class="container flex flex-col py-10 md:flex-row md:py-15">
    <div class="flex-shrink-0 text-dark-gray">
      <p class="mb-7 hidden text-black md:block">會員中心</p>
      <ul class="flex items-start md:flex-col">
        <NuxtLink to="/member" custom v-slot="{ isExactActive, navigate }">
          <li
            :class="['cursor-pointer', { 'border-b-2 border-raisin-black': isExactActive }]"
            @click="navigate"
          >
            會員資料修改
          </li>
        </NuxtLink>
        <NuxtLink to="/member/order" custom v-slot="{ isExactActive, navigate }">
          <li
            :class="[
              'ml-10 cursor-pointer md:ml-0 md:mt-6',
              { 'border-b-2 border-raisin-black': isExactActive },
            ]"
            @click="navigate"
          >
            訂單查詢
          </li>
        </NuxtLink>
        <li class="ml-10 cursor-pointer md:ml-0 md:mt-6" @click="logout">登出</li>
      </ul>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { useMemberStore } from '@/stores/member'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const memberStore = useMemberStore()
const mainStore = useMainStore()

const logout = async () => {
  if (confirm('確定登出？')) {
    await memberStore.userLogout()
    router.push('/')
  }
}

onMounted(async () => {
  if (!memberStore.orders.length) {
    try {
      await nextTick()
      await memberStore.readOrders()
    } catch ({ statusCode, statusMessage }) {
      if (statusCode === 401) {
        await mainStore.setAlertMsgHandler('登入逾時，請重新登入！')
        memberStore.userLogout()
        router.replace('/login?redirect=member')
        return
      }
      showError({ statusCode, statusMessage })
    }
  }
})
</script>
