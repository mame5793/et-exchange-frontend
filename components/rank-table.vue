<template>
  <div class="table-container">
    <table v-if="filteredBanks.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>Bank</th>
          <th>Buying</th>
          <th>Selling</th>
          <th>Sale Changes</th>
          <th>Buy Changes</th>
          <th>Last UpdatedAt</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bank, index) in filteredBanks" :key="bank.id ?? index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="bank-info">
              <img :src="`/images/${bank.name.replace(' ', '').toLowerCase()}.png`" alt="" />
              <span>{{ bank.name }}</span>
            </div>
          </td>

          <!-- use optional chaining & fallback so it never throws -->
          <td>{{ bank[selectedCurrency]?.buying ?? '-' }}</td>
          <td>{{ bank[selectedCurrency]?.selling ?? '-' }}</td>
          <td class="change">{{ bank[selectedCurrency]?.saleChanges ?? '-' }}</td>
          <td class="change">{{ bank[selectedCurrency]?.buyChanges ?? '-' }}</td>
          <td>{{ bank.lastUpdatedAt ?? '-' }}</td>

          <td>
            <NuxtLink :to="`/bank/${bank.id}?currency=${selectedCurrency}`">
              <button class="p-2 rounded hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                  <path fill="none" stroke="#e6e6e6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9m3.75 11.625a2.625 2.625 0 1 1-5.25 0a2.625 2.625 0 0 1 5.25 0">
                  </path>
                </svg>
              </button>
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- centered friendly message when no banks match the selected currency -->
    <div v-else class="no-data" style="text-align:center; padding:16px; color:#cbd5e1;">
      No banks available for <strong>{{ selectedCurrency }}</strong>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { banks } from '../data/store.js';

const props = defineProps({
  selectedCurrency: { type: String, default: 'USD' },
  selectedOrderType: { type: String, default: 'Selling(highest First)' }
});

/*
  Build a filtered & sorted bank list safely:
  - Filter banks that have numeric buying/selling for the selected currency
  - Sort according to selectedOrderType (supports Selling/Buying + Highest/Lowest)
  - Use non-destructive operations (no in-place array mutation)
*/
const filteredBanks = computed(() => {
  const cur = props.selectedCurrency || 'USD';
  const order = (props.selectedOrderType || '').toLowerCase();

  const metric = order.includes('selling') ? 'selling' : 'buying';
  const highest = order.includes('highest');

  // keep only banks that have that currency and a numeric value
  const available = banks.filter(b => {
    const obj = b?.[cur];
    return !!obj && (typeof obj.buying === 'number' || typeof obj.selling === 'number');
  });

  // sort safely (work on a shallow copy)
  const sorted = available.slice().sort((a, b) => {
    const avRaw = a?.[cur]?.[metric];
    const bvRaw = b?.[cur]?.[metric];

    // if missing, treat as -Infinity for highest sort so they go last,
    // and +Infinity for lowest sort so they go last as well.
    const av = (avRaw === undefined || avRaw === null) ? (highest ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(avRaw);
    const bv = (bvRaw === undefined || bvRaw === null) ? (highest ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(bvRaw);

    if (av === bv) return (a.name || '').localeCompare(b.name || '');
    return highest ? (bv - av) : (av - bv);
  });

  return sorted;
});
</script>

<style scoped>
.change {
  color:  #58e274; 
}
button:hover svg path {
  stroke: rgb(61, 185, 36);
}
.img-span {
  margin-left: -5px;
  background-color: white;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
img {
  object-fit: cover;
  display: block; 
  padding: 0.2rem;
  border-radius: 0.375rem;
  height: 2.5rem;
  width: 2.5rem;
}
.bank-info {
  display: flex;
  align-items: center;
}
.table-container {
  overflow-x: auto;   /* default: scroll when needed */
  overflow-y: hidden;
  width: 100%;
}



/* For large screens, no scrollbar */
@media (min-width: 1024px) {
  .table-container {
    overflow-x: hidden;
  }
}

table {
 width: 100%;
  border-collapse: collapse;
  height: auto;
  margin-top: 15px;
  margin-left: 18px;
  margin-right: 18px;
  border-radius: 0.75rem;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background-color: black;
  color: white;
}
th{
  background-color: #0a1a2e;
}
th, td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
tr:hover{
  background-color: #1a1a1a;
}
@media (max-width: 600px) {
  table {
    max-width: 100%;
  }
}
</style>
