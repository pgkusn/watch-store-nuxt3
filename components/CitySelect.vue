<template>
  <div>
    <div class="select mt-2">
      <select v-model="citySelectComputed" :required="required" @change="changeCity">
        <option value="" selected disabled>請選擇</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>
    <div class="select ml-[10px]">
      <select v-model="areaSelectComputed" :required="required" @change="changeCity">
        <option value="" selected disabled>請選擇</option>
        <option v-for="area in areas" :key="area" :value="area">
          {{ area }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import cityData from '@/assets/data/city.json'

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  address: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['changeCity'])

const cities = cityData.map(city => city.CityName)
const citySelect = ref('')
const citySelectComputed = computed({
  get() {
    return props.address?.city || citySelect.value
  },
  set(value) {
    citySelect.value = value
    areaSelect.value = ''
  },
})
const areas = computed(() =>
  cityData
    .find(city => city.CityName === citySelectComputed.value)
    ?.AreaList.map(item => item.AreaName)
)
const areaSelect = ref('')
const areaSelectComputed = computed({
  get() {
    return props.address?.area || areaSelect.value
  },
  set(value) {
    areaSelect.value = value
  },
})

const changeCity = () => {
  emit('changeCity', {
    city: citySelect.value,
    area: areaSelect.value,
  })
}
</script>
