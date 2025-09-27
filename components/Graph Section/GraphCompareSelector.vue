<template>
  <div class="selector-bar">
    <!-- Top row -->
    <div class="top-row">
      <!-- Main bank (fixed) -->
      <div class="main-bank" v-if="mainBank">
        <img :src="getBankImage(mainBank)" alt="logo" />
        <div class="main-info">
          <div class="label">Main</div>
          <div class="name">{{ mainBank.name }}</div>
        </div>
      </div>

      <!-- Compare bank -->
      <div class="control">
        <select v-model="compareBankName" @change="onCompareChange">
          <option value="">Compare with...</option>
          <option v-for="b in filteredBanks" :key="b.id" :value="b.name">{{ b.name }}</option>
        </select>
      </div>

      <!-- Currency -->
      <div class="control">
        <select v-model="selectedCurrency" @change="onCurrencyChange">
          <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <!-- Type -->
      <div class="control ml-auto">
        <select v-model="selectedType" @change="onTypeChange">
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
        </select>
      </div>
    </div>

    <!-- Bottom row: timeframes -->
    <div class="time-row">
      <button
        v-for="t in times"
        :key="t"
        :class="{ active: selectedTime === t }"
        @click="setTime(t)"
      >
        {{ t }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  banks: { type: Array, required: true },
  mainBank: { type: Object, default: null }
})

const emit = defineEmits(['update-compare','update-currency','update-type','update-time'])

const compareBankName = ref('')
const selectedCurrency = ref('USD')
const selectedType = ref('buying')
const selectedTime = ref('1D')

const currencies = ['USD','EUR','GBP']
const times = ['1D','1W','1M']

const filteredBanks = computed(() => {
  if (!props.mainBank) return props.banks
  return props.banks.filter(b => b.id !== props.mainBank.id)
})

const onCompareChange = () => emit('update-compare', compareBankName.value)
const onCurrencyChange = () => emit('update-currency', selectedCurrency.value)
const onTypeChange = () => emit('update-type', selectedType.value)
const setTime = (t) => { selectedTime.value = t; emit('update-time', t) }

const getBankImage = (b) => b ? `/images/${b.name.replace(/ /g,'').toLowerCase()}.png` : ''
</script>

<style scoped>
.selector-bar {
  background: #0b0b0b;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Top row */
.top-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.main-bank {
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 160px;
}
.main-bank img { width:36px; height:36px; border-radius:6px; object-fit:cover }
.main-info .label { font-size:12px; color:#9aa0a6 }
.main-info .name { font-weight:600 }

.control select {
  background:#000;
  color:#fff;
  border:1px solid #222;
  padding:6px 8px;
  border-radius:6px;
}

.ml-auto {
  margin-left: auto; /* push type selector to right */
}

/* Bottom row */
.time-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.time-row button {
  background: transparent;
  color:#bdbdbd;
  border:none;
  padding:6px 12px;
  border-radius:6px;
  cursor:pointer;
}
.time-row button.active {
  background: linear-gradient(135deg,#FF7E5F,#FFB88C);
  color:#000;
}

/* Responsive */
@media (max-width: 760px) {
  .top-row {
    flex-wrap: wrap;
  }
  .ml-auto {
    margin-left: 0; /* reset auto push on small screens */
  }
  .time-row {
    flex-wrap: wrap;
  }
}
</style>
