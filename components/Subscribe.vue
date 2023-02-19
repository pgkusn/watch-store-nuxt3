<template>
  <div class="bg-cover -bg-top-140px lg:bg-top-60%" style="background-image: url(/subscribe.jpg)">
    <div class="container h-[600px] pt-[312px]">
      <form class="mx-auto max-w-[350px] lg:ml-0" @submit.prevent="subscribe">
        <p class="text-[32px] text-dark-gray">記得<br />訂閱以獲取更多資訊！</p>
        <div class="mt-5 flex">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="h-15 w-0 flex-grow appearance-none rounded-l rounded-r-none border-2 border-raisin-black pl-[14.5px] placeholder-dark-gray outline-none"
            required
          />
          <input
            type="submit"
            value="Subscribe"
            class="h-15 w-[129px] cursor-pointer rounded-r rounded-l-none bg-raisin-black text-white"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

const email = ref('')
const subscribe = async () => {
  await mainStore.setAlertMsgHandler('訂閱成功')
  email.value = ''
}
</script>
