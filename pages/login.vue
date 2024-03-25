<template>
  <div class="container flex flex-col items-center py-10 md:flex-row md:py-15">
    <div class="w-full md:w-0 md:flex-grow-[6.5]">
      <div
        class="bg-cover bg-center pt-[63%]"
        style="
          background-image: url(https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80);
        "
      />
    </div>
    <form
      class="mx-auto mt-7 flex w-[350px] flex-col md:mt-0 md:ml-[30px] md:w-0 md:flex-grow-[3.5]"
      @submit.prevent="submitHandler"
    >
      <h2 class="text-[32px]">Log in</h2>
      <label for="email" class="mt-3">帳號</label>
      <input
        id="email"
        v-model="loginData.email"
        v-focus
        type="email"
        placeholder="email@example.com"
        class="text-input mt-1"
        required
      />
      <label for="password" class="mt-5">密碼</label>
      <input
        id="password"
        v-model="loginData.password"
        type="password"
        placeholder="Password"
        class="text-input mt-1"
        required
      />
      <div class="mt-9 flex items-center">
        <a href="" class="mr-auto text-raisin-black" @click.prevent="forgotPassword"> 忘記密碼 </a>
        <NuxtLink
          to="/signup"
          class="w-[65px] rounded border border-raisin-black text-center leading-[36px] text-raisin-black focus:outline-none"
        >
          註冊
        </NuxtLink>
        <button
          type="submit"
          class="ml-2 h-[38px] w-[65px] rounded bg-raisin-black text-white focus:outline-none"
        >
          登入
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
useHead({ title: 'Log in - Watch Store' })
const router = useRouter()
const route = useRoute()
const mainStore = useMainStore()
const memberStore = useMemberStore()
const { $Swal } = useNuxtApp()

const loginData = reactive({
  email: 'email@example.com',
  password: 'Password',
})

const submitHandler = async () => {
  try {
    await memberStore.userLogin(loginData)

    // 如 store 無資料時將 DB 資料存入 store，否則將 store 狀態存入 DB
    await memberStore.readPreferences()
    await memberStore.updatePreferences()

    await mainStore.setAlertMsgHandler('登入成功')
    router.replace((route.query.redirect as string) || '/')
  } catch (error) {
    const { statusMessage } = error as { statusCode: number; statusMessage: string }
    mainStore.setAlertMsgHandler(statusMessage)
  }
}
const forgotPassword = async () => {
  const result = await $Swal.fire({
    title: '請輸入註冊的電子信箱',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCloseButton: true,
    confirmButtonText: '確定',
    showLoaderOnConfirm: true,
    preConfirm: async email => {
      try {
        return await memberStore.resetPassword(email)
      } catch (error) {
        const { statusMessage } = error as { statusCode: number; statusMessage: string }
        $Swal.showValidationMessage(statusMessage)
      }
    },
    allowOutsideClick: () => !$Swal.isLoading(),
  })
  if (result.isConfirmed) {
    $Swal.fire({
      icon: 'success',
      title: '已將重設密碼連結寄至您的信箱',
    })
  }
}
</script>
