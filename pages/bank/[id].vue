<template>
  <div class="page max-w-6xl mx-auto p-6 text-white flex flex-col gap-6">

    <!-- Bank Not Found -->
    <div v-if="!bank" class="text-center text-red-500">Bank not found</div>

    <!-- Bank Detail & Comparison -->
    <div v-else class="flex flex-col gap-6">

      <!-- Header -->
      <div class="flex items-center gap-4 bank-info">
        <img :src="getBankImage(bank)" class="w-14 h-14 rounded bg-white p-1"/>
        <div>
          <h1 class="text-2xl font-bold">{{ bank.name }}</h1>
          <div class="text-sm text-gray-400">Pair / currency: {{ selectedCurrency }}</div>
        </div>
      </div>

      <!-- Bank Description -->
      <div class="bank-info-description text-gray-300 mt-2">
        {{ bank.description }}
      </div>

      <!-- Main Content: Table + Sidebar -->
      <div class="flex flex-col lg:flex-row gap-6 mt-4">

        <!-- Left: Tabs + Table -->
        <div class="flex-1 flex flex-col gap-4">

          <!-- Tabs -->
          <div class="tabs flex gap-2">
            <div :class="['tab-btn', activeTab === 'cash' ? 'active-tab' : '']" @click="activeTab='cash'">
              Cash Buying/Selling
            </div>
            <div :class="['tab-btn', activeTab === 'transaction' ? 'active-tab' : '']" @click="activeTab='transaction'">
              Transactions Buying/Selling
            </div>
          </div>

          <!-- Tables -->
          <div v-if="activeTab==='cash'" class="overflow-x-auto">
            <table class="w-full table-auto">
              <thead>
                <tr class="bg-gray-800">
                  <th class="border px-4 py-2">Currency Code</th>
                  <th class="border px-4 py-2">Currency Name</th>
                  <th class="border px-4 py-2">Cash Buying</th>
                  <th class="border px-4 py-2">Cash Selling</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cur in currencies" :key="cur">
                  <td class="border px-4 py-2">{{ cur }}</td>
                  <td class="border px-4 py-2">{{ currencyNames[cur] }}</td>
                  <td class="border px-4 py-2">{{ safeValue(bank, cur, 'buying') }}</td>
                  <td class="border px-4 py-2">{{ safeValue(bank, cur, 'selling') }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="activeTab==='transaction'" class="overflow-x-auto">
            <table class="w-full table-auto">
              <thead>
                <tr class="bg-gray-800">
                  <th class="border px-4 py-2">Currency Code</th>
                  <th class="border px-4 py-2">Currency Name</th>
                  <th class="border px-4 py-2">Transaction Buying</th>
                  <th class="border px-4 py-2">Transaction Selling</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cur in currencies" :key="cur">
                  <td class="border px-4 py-2">{{ cur }}</td>
                  <td class="border px-4 py-2">{{ currencyNames[cur] }}</td>
                  <td class="border px-4 py-2">{{ safeValue(bank, cur, 'buying') }}</td>
                  <td class="border px-4 py-2">{{ safeValue(bank, cur, 'selling') }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <!-- Right Sidebar: Bank Info -->
        <div class="w-full lg:w-64 flex-shrink-0 bg-[#111111] p-4 rounded-lg flex flex-col gap-3 self-start">
          <img :src="getBankImage(bank)" class="w-24 h-24 rounded mx-auto"/>
          <h2 class="text-xl font-bold text-center">{{ bank.name }}</h2>
          
          <p class="text-gray-400 text-sm"><strong>Contact:</strong> {{ bank.contact }}</p>
          <p class="text-gray-400 text-sm"><strong>Website:</strong> 
            <a :href="bank.website" target="_blank" class="text-blue-400 underline">{{ bank.website }}</a>
          </p>
          <p class="text-gray-400 text-sm"><strong>Headquarters:</strong> {{ bank.headquarters }}</p>
        </div>

      </div>

      <!-- Calculator & Chart: Full Width -->
      <div class="flex flex-col lg:flex-row gap-4 mt-6 w-full">

        <!-- Calculator: smaller width -->
        <div class="lg:w-1/3 w-full">
          <DetailCalculator :mainBank="bank" />
        </div>

        <!-- Chart & Selector: larger width -->
        <div class="lg:w-2/3 w-full flex flex-col gap-4">
          <GraphCompareSelector
            :banks="banks"
            :mainBank="bank"
            @update-compare="onCompareUpdate"
            @update-currency="onCurrencyUpdate"
            @update-type="onTypeUpdate"
            @update-time="onTimeUpdate"
          />
          <GraphCompareChart
            :mainBank="bank"
            :compareBank="compareBank"
            :currency="selectedCurrency"
            :type="selectedType"
            :time="selectedTime"
          />
        </div>

      </div>

      <!-- Back Button -->
      <div class="mt-6 flex justify-center">
  <button @click="goHome" class="btn">Back to Home</button>
</div>


    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { banks } from '~/data/store.js'

import DetailCalculator from '~/components/DetailCalculator.vue'
import GraphCompareSelector from '~/components/Graph Section/GraphCompareSelector.vue'
import GraphCompareChart from '~/components/Graph Section/GraphCompareChart.vue'

const route = useRoute()
const router = useRouter()
const bankId = Number(route.params.id) || route.params.id
const bank = banks.find(b => String(b.id) === String(bankId)) || null

const activeTab = ref('cash')
const selectedCurrency = ref('USD')
const selectedType = ref('buying')
const selectedTime = ref('1D')
const compareBankName = ref('')

const compareBank = computed(() => banks.find(b => b.name === compareBankName.value) || null)

function onCompareUpdate(name) { compareBankName.value = name }
function onCurrencyUpdate(cur) { selectedCurrency.value = cur }
function onTypeUpdate(t) { selectedType.value = t }
function onTimeUpdate(t) { selectedTime.value = t }

const getBankImage = (b) => b ? `/images/${b.name.replace(/ /g,'').toLowerCase()}.png` : ''
const safeValue = (b, cur, key) => (b && b[cur] && b[cur][key] !== undefined) ? b[cur][key] : '-'

const currencies = ['USD','EUR','GBP','CAD','AED','SAR','CNY']
const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'Pound Sterling',
  CAD: 'Canadian Dollar',
  AED: 'UAE Dirham',
  SAR: 'Saudi Riyal',
  CNY: 'Chinese Yuan'
}

async function goHome() {
  selectedCurrency.value = 'USD'
  selectedType.value = 'buying'
  selectedTime.value = '1D'
  compareBankName.value = ''
  try { await router.push('/') } catch { window.location.href='/' }
}
</script>

<style scoped>
.page { padding-bottom: 60px; }

.bank-info img { object-fit: cover; }

.tabs { margin-top: 10px; display: flex; gap: 8px; }
.tab-btn { background: #222; color: #ccc; padding: 8px 16px; border-radius: 8px; cursor: pointer; border: none; }
.active-tab { background: linear-gradient(135deg, #FF7E5F, #FFB88C); color: #000; padding: 8px 16px; border-radius: 8px; }

.btn {
  background: #16a34a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #22c55e;
}

table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #444; padding: 8px; text-align: center; }
thead th { background-color: #111; }

/* Responsive Layout */
@media (max-width: 1024px) {
  .flex-col.lg\:flex-row { flex-direction: column !important; }
}
</style>
