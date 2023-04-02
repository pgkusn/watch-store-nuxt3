<template>
  <div class="container !max-w-[635px] py-10 md:py-15">
    <form @submit.prevent="submitHandler">
      <table class="w-full">
        <caption class="border-b border-blue-gray pb-2 text-left font-medium">
          {{
            caption
          }}
        </caption>
        <tbody class="text-blue-gray">
          <!-- step1 -->
          <template v-if="currentStep === 1">
            <tr>
              <td class="w-[90px] pt-5">
                <div>電子信箱</div>
              </td>
              <td class="pt-5">
                <input
                  v-model="accountData.email"
                  v-focus
                  type="email"
                  class="text-input"
                  required
                />
              </td>
            </tr>
            <tr>
              <td class="pt-5">
                <div>密碼</div>
              </td>
              <td class="pt-5">
                <input v-model="accountData.password" type="password" class="text-input" required />
              </td>
            </tr>
            <tr>
              <td class="pt-5 align-top">
                <div class="pt-2">確認密碼</div>
              </td>
              <td class="pt-5">
                <input
                  v-model="accountData.confirmPassword"
                  type="password"
                  class="text-input"
                  required
                />
                <input type="submit" value="下一步" class="form-btn block" />
              </td>
            </tr>
          </template>

          <!-- step2 -->
          <template v-else>
            <tr>
              <td class="w-[90px] pt-5">
                <div>會員姓名</div>
              </td>
              <td class="pt-5">
                <input v-model="profileData.name" v-focus type="text" class="text-input" />
              </td>
            </tr>
            <tr>
              <td class="pt-5">
                <div>會員性別</div>
              </td>
              <td class="pt-5">
                <div class="select">
                  <select v-model="profileData.gender">
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td class="pt-5">
                <div>手機號碼</div>
              </td>
              <td class="pt-5">
                <input v-model="profileData.cellPhone" type="text" class="text-input" />
              </td>
            </tr>
            <tr>
              <td class="pt-5 align-top">
                <div class="pt-2">聯絡地址</div>
              </td>
              <td class="pt-5">
                <div class="select w-[174px]">
                  <select v-model="profileData.address.contact.country">
                    <option value="台灣及離島">台灣及離島</option>
                  </select>
                </div>
                <br />
                <CitySelect @changeCity="value => changeCity('contact', value)" />
                <input
                  v-model="profileData.address.contact.other"
                  type="text"
                  class="text-input mt-2"
                  placeholder="請輸入地址"
                />
                <label class="mt-3 flex items-center">
                  <input
                    v-model="profileData.edm"
                    type="checkbox"
                    class="checkbox mr-1 h-[15px] w-[15px] appearance-none rounded-[3px] border border-border-color checked:border-none checked:bg-raisin-black"
                  />
                  我願意收到最新優惠情報
                </label>
              </td>
            </tr>
            <tr>
              <td class="pt-5 align-top">
                <div class="pt-2">配送地址</div>
              </td>
              <td class="pt-5">
                <div class="select w-[174px]">
                  <select v-model="profileData.address.delivery.country">
                    <option value="台灣及離島">台灣及離島</option>
                  </select>
                </div>
                <br />
                <CitySelect @changeCity="value => changeCity('delivery', value)" />
                <input
                  v-model="profileData.address.delivery.other"
                  type="text"
                  class="text-input mt-2"
                  placeholder="請輸入地址"
                />
                <div class="flex">
                  <button class="form-btn mr-4 block bg-coral-black" @click="currentStep = 1">
                    上一步
                  </button>
                  <input type="submit" value="送出" class="form-btn block" />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup>
useHead({
  title: '註冊',
})

const router = useRouter()
const mainStore = useMainStore()
const memberStore = useMemberStore()

const currentStep = ref(1)
const submitHandler = computed(() => (currentStep.value === 1 ? nextStep : submitForm))
const caption = computed(() => (currentStep.value === 1 ? '建立帳號' : '建立個人資料'))

// step1
const accountData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})
const nextStep = async () => {
  if (accountData.password !== accountData.confirmPassword) {
    await mainStore.setAlertMsgHandler('密碼不一致')
    return
  }
  currentStep.value = 2
}

// step2
const profileData = reactive({
  name: '',
  gender: 'male',
  cellPhone: '',
  edm: false,
  address: {
    contact: {
      country: '台灣及離島',
      city: '',
      area: '',
      other: '',
    },
    delivery: {
      country: '台灣及離島',
      city: '',
      area: '',
      other: '',
    },
  },
})

const changeCity = (type, { city, area }) => {
  profileData.address[type].city = city
  profileData.address[type].area = area
}
const submitForm = async () => {
  // sign up
  let signUpData = {}
  try {
    signUpData = await memberStore.userSignUp(accountData)
  } catch ({ statusCode, statusMessage }) {
    await mainStore.setAlertMsgHandler(statusMessage)
    currentStep.value = 1
    return
  }

  // create profile & preferences
  try {
    await memberStore.createProfile(signUpData, profileData)
    await memberStore.updatePreferences()
    await mainStore.setAlertMsgHandler('註冊成功')
    router.push('/')
  } catch ({ statusCode, statusMessage }) {
    showError({ statusCode, statusMessage })
  }
}
</script>
