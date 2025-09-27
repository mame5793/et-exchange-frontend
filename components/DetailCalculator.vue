<template>
  <div v-if="mainBank" class="calculator-container p-4 rounded-xl border border-gray-800 bg-[#0b0b0b] w-full max-w-md mx-auto">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="text-lg font-bold text-white">Currency Conversion - {{ mainBank.name }}</h2>
      <p class="text-sm text-gray-400">
        {{ isSwapped ? selectedCurrency + ' ↔ ETB' : 'ETB ↔ ' + selectedCurrency }}
      </p>
    </div>

    <!-- Bank Info -->
    <div class="flex items-center gap-2 mb-4">
      <img :src="getBankImage(mainBank)" class="w-10 h-10 rounded-full" />
      <span class="text-white font-semibold">{{ mainBank.name }}</span>
    </div>

    <!-- Currency & Exchange Type -->
    <div class="flex flex-col sm:flex-row gap-4 mb-4">
      <div class="flex items-center gap-2 flex-1">
        <img :src="getCurrencyImage(selectedCurrency)" class="w-8 h-8 rounded-full" />
        <select v-model="selectedCurrency" @change="recalculate" class="bg-black text-white rounded px-2 py-1 w-full">
          <option v-for="cur in currencies" :key="cur" :value="cur">{{ cur }}</option>
        </select>
      </div>

      <div class="flex items-center gap-2 flex-1">
        <select v-model="selectedType" @change="recalculate" class="bg-black text-white rounded px-2 py-1 w-full">
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
        </select>
      </div>
    </div>

    <!-- Amount Inputs -->
    <div class="flex flex-col sm:flex-row gap-4 mb-4">
      <!-- Top Input -->
      <div class="flex items-center gap-2 flex-1 bg-[#141414] p-2 rounded border border-gray-700">
        <img :src="isSwapped ? getCurrencyImage(selectedCurrency) : '/images/flags/ETB.png'" class="w-6 h-6 rounded-full" />
        <input
          type="number"
          min="0"
          v-model.number="topAmount"
          @input="topInputChanged"
          class="bg-transparent text-white w-full focus:outline-none text-lg"
          :placeholder="isSwapped ? selectedCurrency : 'ETB'"
        />
      </div>

      <!-- Bottom Input -->
      <div class="flex items-center gap-2 flex-1 bg-[#141414] p-2 rounded border border-gray-700">
        <img :src="isSwapped ? '/images/flags/ETB.png' : getCurrencyImage(selectedCurrency)" class="w-6 h-6 rounded-full" />
        <input
          type="number"
          min="0"
          v-model.number="bottomAmount"
          @input="bottomInputChanged"
          class="bg-transparent text-white w-full focus:outline-none text-lg"
          :placeholder="isSwapped ? 'ETB' : selectedCurrency"
        />
      </div>
    </div>

    <!-- Swap Button -->
    <div class="flex justify-center mb-4">
      <button @click="swapValues" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
        Swap
      </button>
    </div>

    <!-- Exchange Rate Info -->
    <div class="text-white text-sm">
      <p>Exchange Rate: 1 {{ selectedCurrency }} = {{ exchangeRate.toFixed(4) }} ETB ({{ selectedType }})</p>
    </div>
  </div>

  <div v-else>
    <p class="text-white">Loading calculator...</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  mainBank: { type: Object, required: true },
})

const currencies = ['USD','EUR','GBP','CAD','AED','SAR','CNY','CHF','KES','ZAR','SEK','JPY','NOK','DKK','DJF','INR','AUD','KWD']

const selectedCurrency = ref('USD')
const selectedType = ref('buying')

// Amounts
const topAmount = ref(0)
const bottomAmount = ref(0)
const isSwapped = ref(false) // tracks swap direction

// Helpers
const getBankImage = (bank) => bank ? `/images/${bank.name.replace(/ /g,'').toLowerCase()}.png` : ''
const getCurrencyImage = (currency) => `/images/flags/${currency}.png`

const exchangeRate = computed(() => {
  if (!props.mainBank || !props.mainBank[selectedCurrency.value]) return 1
  return props.mainBank[selectedCurrency.value][selectedType.value] || 1
})

// Input handlers
function topInputChanged() {
  if (isSwapped.value) {
    bottomAmount.value = (topAmount.value * exchangeRate.value).toFixed(2)
  } else {
    bottomAmount.value = (topAmount.value / exchangeRate.value).toFixed(4)
  }
}

function bottomInputChanged() {
  if (isSwapped.value) {
    topAmount.value = (bottomAmount.value / exchangeRate.value).toFixed(4)
  } else {
    topAmount.value = (bottomAmount.value * exchangeRate.value).toFixed(2)
  }
}

// Swap function
function swapValues() {
  isSwapped.value = !isSwapped.value
  const temp = topAmount.value
  topAmount.value = bottomAmount.value
  bottomAmount.value = temp
}

// Recalculate on currency/type change
function recalculate() {
  if (isSwapped.value) {
    bottomAmount.value = (topAmount.value * exchangeRate.value).toFixed(2)
  } else {
    bottomAmount.value = (topAmount.value / exchangeRate.value).toFixed(4)
  }
}

// Watch mainBank changes (if page reload)
watch(() => props.mainBank, recalculate)
</script>

<style scoped>
.calculator-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

@media (max-width: 640px) {
  .calculator-container {
    padding: 1rem;
    width: 95%;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .calculator-container {
    padding: 1.5rem;
    width: 90%;
  }
}

@media (min-width: 1025px) {
  .calculator-container {
    padding: 2rem;
    width: 360px;
  }
}
</style>
