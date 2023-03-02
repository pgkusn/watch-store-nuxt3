<template>
  <div v-if="profile" class="flex flex-col md:flex-grow md:flex-row">
    <div class="order-1 mt-10 md:order-none md:mt-0 md:flex-grow md:pl-[8.6%] md:pr-[30px]">
      <form @submit.prevent="updateProfile">
        <table class="w-full">
          <caption class="border-b border-blue-gray pb-2 text-left font-medium">
            修改個人資料
          </caption>
          <tbody class="text-blue-gray">
            <tr>
              <td class="w-[90px] pt-5">
                <div>電子信箱</div>
              </td>
              <td class="pt-5">
                {{ profileData.email }}
              </td>
            </tr>
            <tr>
              <td class="pt-5">
                <div>會員姓名</div>
              </td>
              <td class="pt-5">
                <input v-model="profileData.name" type="text" class="text-input" required />
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
                <input v-model="profileData.cellPhone" type="text" class="text-input" required />
              </td>
            </tr>
            <tr>
              <td class="pt-5 align-top">
                <div class="pt-2">聯絡地址</div>
              </td>
              <td class="pt-5">
                <div class="select w-[174px]">
                  <select v-model="profileData.address.contact.country" required>
                    <option value="台灣及離島">台灣及離島</option>
                  </select>
                </div>
                <br />
                <CitySelect
                  :address="profileData.address.contact"
                  @changeCity="value => changeCity('contact', value)"
                />
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
                  <select v-model="profileData.address.delivery.country" required>
                    <option value="台灣及離島">台灣及離島</option>
                  </select>
                </div>
                <br />
                <CitySelect
                  :address="profileData.address.delivery"
                  :required="true"
                  @changeCity="value => changeCity('delivery', value)"
                />
                <input
                  v-model="profileData.address.delivery.other"
                  type="text"
                  class="text-input mt-2"
                  placeholder="請輸入地址"
                  required
                />
                <input type="submit" value="確定修改" class="form-btn block" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <form class="mt-12" @submit.prevent="updatePassword">
        <table class="w-full">
          <caption class="border-b border-blue-gray pb-2 text-left font-medium">
            修改密碼
          </caption>
          <tbody class="text-blue-gray">
            <tr>
              <td class="w-[90px] pt-5">
                <div>舊密碼</div>
              </td>
              <td class="pt-5">
                <input
                  ref="passwordInput"
                  v-model="password.oldPassword"
                  type="password"
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
                <input v-model="password.newPassword" type="password" class="text-input" required />
              </td>
            </tr>
            <tr>
              <td class="pt-5 align-top">
                <div class="pt-2">確認密碼</div>
              </td>
              <td class="pt-5">
                <input
                  v-model="password.confirmPassword"
                  type="password"
                  class="text-input"
                  required
                />
                <input type="submit" value="變更密碼" class="form-btn block" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <div class="mt-10 text-blue-gray md:mt-0">
      <ul class="flex items-center">
        <li class="material-icons text-black">person</li>
        <li class="ml-[5px]">會員編號</li>
        <li class="ml-[5px] text-xl">
          {{ memberID }}
        </li>
      </ul>
      <ClientOnly>
        <table>
          <tr>
            <td class="w-[95px] pt-4">購物車</td>
            <td class="pt-4">
              {{ cart.length }}
            </td>
          </tr>
          <tr>
            <td class="pt-4">我的收藏</td>
            <td class="pt-4">
              {{ favorite.length }}
            </td>
          </tr>
          <tr>
            <td class="pt-4">完成訂單</td>
            <td class="pt-4">
              {{ orders.length }}
            </td>
          </tr>
        </table>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { useMemberStore } from '@/stores/member'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const mainStore = useMainStore()
const memberStore = useMemberStore()
const productStore = useProductStore()

const cart = computed(() => productStore.states.cart)
const favorite = computed(() => productStore.states.favorite)
const memberID = computed(() => memberStore.loginInfo?.localId.slice(0, 13))
const orders = computed(() => memberStore.orders)
const profile = computed(() => memberStore.profile)

// 修改個人資料
const profileData = reactive({
  email: '',
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
const updateProfile = async () => {
  try {
    await memberStore.updateProfile(profileData)
    mainStore.setAlertMsgHandler('個人資料修改成功')
  } catch ({ statusCode, statusMessage }) {
    showError({ statusCode, statusMessage })
  }
}

// 修改密碼
const passwordInput = ref(null)
const password = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const updatePassword = async () => {
  // confirm password
  if (password.newPassword !== password.confirmPassword) {
    await mainStore.setAlertMsgHandler('密碼不一致')
    resetPasswordInput()
    return
  }

  // check old password
  try {
    await memberStore.userLogin({
      email: memberStore.loginInfo.email,
      password: password.oldPassword,
    })
  } catch ({ statusCode, statusMessage }) {
    if (statusCode === 401) {
      await mainStore.setAlertMsgHandler('登入逾時，請重新登入！')
      memberStore.userLogout()
      router.replace('/login?redirect=member')
      return
    }
    await mainStore.setAlertMsgHandler(statusMessage)
    resetPasswordInput()
    return
  }

  // update password
  try {
    await memberStore.updatePassword(password.newPassword)
    await mainStore.setAlertMsgHandler('密碼修改成功，請重新登入。')
    memberStore.userLogout()
    router.replace('/login')
  } catch ({ statusCode, statusMessage }) {
    showError({ statusCode, statusMessage })
  }
}
const resetPasswordInput = () => {
  for (const value of Object.keys(password)) {
    password[value] = ''
  }
  passwordInput.value.focus()
}

onMounted(async () => {
  try {
    if (!profile.value) {
      await nextTick()
      await memberStore.readProfile()
    }
    for (const value of Object.keys(profileData)) {
      profileData[value] = profile.value[value]
    }
  } catch ({ statusCode, statusMessage }) {
    if (statusCode === 401) {
      await mainStore.setAlertMsgHandler('登入逾時，請重新登入！')
      memberStore.userLogout()
      router.replace('/login?redirect=member')
      return
    }
    showError({ statusCode, statusMessage })
  }
})
</script>
