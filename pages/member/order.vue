<template>
  <div class="mt-11 sm:px-8 md:mt-0 md:flex-grow md:pl-[8.6%]">
    <div class="max-w-[250px]">
      <input
        v-model="searchOrderIDComputed"
        type="text"
        class="w-full flex-1 appearance-none rounded-lg border border-default-gray-300 bg-white py-2 px-4 text-base text-default-gray-700 placeholder-default-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-raisin-black"
        placeholder="訂單編號"
      />
    </div>
    <div class="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                scope="col"
                class="min-w-[140px] border-b border-default-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-default-gray-800"
              >
                訂單編號
              </th>
              <th
                scope="col"
                class="min-w-[140px] border-b border-default-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-default-gray-800"
              >
                訂單內容
              </th>
              <th
                scope="col"
                class="min-w-[140px] border-b border-default-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-default-gray-800"
              >
                訂單金額
              </th>
              <th
                scope="col"
                class="min-w-[140px] border-b border-default-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-default-gray-800"
              >
                建立時間
              </th>
            </tr>
          </thead>
          <tbody class="text-default-gray-900">
            <tr v-for="order in showOrders[currentPage - 1]" :key="order.orderID">
              <td
                class="whitespace-nowrap border-b border-default-gray-200 bg-white px-5 py-5 text-sm"
              >
                {{ order.orderID }}
              </td>
              <td
                class="whitespace-nowrap border-b border-default-gray-200 bg-white px-5 py-5 text-sm"
              >
                <ul>
                  <li v-for="(item, index) in order.content" :key="index">
                    {{ item.name }} x{{ item.amount }}
                  </li>
                </ul>
              </td>
              <td class="border-b border-default-gray-200 bg-white px-5 py-5 text-sm">
                {{ order.total }}
              </td>
              <td class="border-b border-default-gray-200 bg-white px-5 py-5 text-sm">
                {{ order.createTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="showOrders.length > 1"
      class="xs:flex-row xs:justify-between flex flex-col items-center bg-white px-5 py-4"
    >
      <div class="pagination flex items-center">
        <button
          type="button"
          class="w-full rounded-l-xl border-t border-b border-[#e5e7eb] bg-white p-4 text-base text-default-gray-600 focus:outline-none disabled:cursor-default disabled:text-opacity-50 betterhover:hover:bg-default-gray-100 disabled:betterhover:hover:bg-transparent"
          :disabled="currentPage === 1"
          @click="currentPage -= 1"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            class=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
            />
          </svg>
        </button>
        <button
          v-for="n in showOrders.length"
          :key="n"
          type="button"
          class="w-full border-t border-b border-[#e5e7eb] bg-white px-4 py-2 text-base text-raisin-black focus:outline-none betterhover:hover:bg-default-gray-100"
          :class="n === currentPage ? 'text-raisin-black' : 'text-default-gray-600'"
          @click="currentPage = n"
        >
          {{ n }}
        </button>
        <button
          type="button"
          class="w-full rounded-r-xl border-t border-b border-[#e5e7eb] bg-white p-4 text-base text-default-gray-600 focus:outline-none disabled:cursor-default disabled:text-opacity-50 betterhover:hover:bg-default-gray-100 disabled:betterhover:hover:bg-transparent"
          :disabled="currentPage === showOrders.length"
          @click="currentPage += 1"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            class=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { Order } from '@/types'

useHead({ title: 'Mypage' })
const memberStore = useMemberStore()

const currentPage = ref(1)
const searchOrderID = ref('')
const searchOrderIDComputed = computed({
  get() {
    return searchOrderID.value
  },
  set(value) {
    searchOrderID.value = value
    currentPage.value = 1
  },
})
const orders = computed(() => {
  return memberStore.orders
    .map(item => ({
      orderID: item.orderID,
      content: item.content,
      total: useFormatPrice(item.total),
      createTime: dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss'),
    }))
    .filter(item =>
      searchOrderID.value ? item.orderID.includes(searchOrderID.value.trim()) : true
    )
}) as unknown as Ref<Order[]>
const showOrders = useShowList(orders) as Ref<Order[][]>
</script>

<style lang="scss" scoped>
.pagination > button {
  &:first-child {
    border-left-width: 1px;
  }
  &:last-child {
    border-right-width: 1px;
  }
  + button {
    border-left-width: 1px;
  }
}
</style>
