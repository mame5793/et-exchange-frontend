<template>
  <div class="exchange-tables bg-[#0b0b0b] p-4 rounded-xl border border-gray-800">
    <!-- Tabs -->
    <div class="flex gap-4 mb-4 border-b border-gray-700">
      <button
        class="pb-2 px-4 text-sm font-semibold"
        :class="activeTab === 'cash' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'"
        @click="activeTab = 'cash'"
      >
        Cash Buying / Selling
      </button>
      <button
        class="pb-2 px-4 text-sm font-semibold"
        :class="activeTab === 'transactions' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'"
        @click="activeTab = 'transactions'"
      >
        Transactions Buying / Selling
      </button>
    </div>

    <!-- Cash Table -->
    <table v-if="activeTab === 'cash'" class="w-full text-sm">
      <thead>
        <tr class="text-left text-gray-400 border-b border-gray-700">
          <th class="p-2">Currency Code</th>
          <th class="p-2">Currency Name</th>
          <th class="p-2">Cash Buying</th>
          <th class="p-2">Cash Selling</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.code" class="border-b border-gray-800 hover:bg-gray-900">
          <td class="p-2">{{ row.code }}</td>
          <td class="p-2">{{ row.name }}</td>
          <td class="p-2">{{ row.cashBuying }}</td>
          <td class="p-2">{{ row.cashSelling }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Transactions Table -->
    <table v-else class="w-full text-sm">
      <thead>
        <tr class="text-left text-gray-400 border-b border-gray-700">
          <th class="p-2">Currency Code</th>
          <th class="p-2">Currency Name</th>
          <th class="p-2">Transactions Buying</th>
          <th class="p-2">Transactions Selling</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.code" class="border-b border-gray-800 hover:bg-gray-900">
          <td class="p-2">{{ row.code }}</td>
          <td class="p-2">{{ row.name }}</td>
          <td class="p-2">{{ row.transBuying }}</td>
          <td class="p-2">{{ row.transSelling }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bank: { type: Object, required: true }
})

const activeTab = ref('cash')

const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'Pound Sterling',
  CAD: 'Canadian Dollar',
  AED: 'United Arab Emirates Dirham',
  SAR: 'Saudi Riyal',
  CNY: 'Chinese Yuan'
}

const rows = computed(() => {
  if (!props.bank) return []
  return Object.keys(props.bank)
    .filter(k => !['id','name','lastUpdatedAt'].includes(k))
    .map(code => ({
      code,
      name: currencyNames[code] || code,
      cashBuying: props.bank[code]?.buying ?? '-',
      cashSelling: props.bank[code]?.selling ?? '-',
      // placeholders: can be replaced with actual transaction values if different
      transBuying: props.bank[code]?.buying ?? '-',
      transSelling: props.bank[code]?.selling ?? '-'
    }))
})
</script>

<style scoped>
.exchange-tables {
  width: 100%;
  overflow-x: auto;
}
table {
  border-collapse: collapse;
}
</style>
