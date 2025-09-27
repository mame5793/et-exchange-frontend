<template>
  <div class="rank-container">
    <!-- Title -->
    <p class="text">
      Rank<span class="highlight">Table</span> 
    </p>

    <!-- Controls -->
    <div class="controls">
      <currency-selector-rank @currency-selected="updateCurrency" />

      <div
        class="flex items-center text-white space-x-2 bg-black rounded-md py-1 px-2 border border-border-money order-select"
      >
        <label for="order-type" class="sr-only">type</label>
        <select
          id="order-type"
          class="bg-transparent text-white focus:outline-none bg-black"
          v-model="selectedOrderType"
          @change="updateOrderType"
        >
          <option class="bg-black" value="Selling(highest First)">Selling(highest First)</option>
          <option class="bg-black" value="Selling(Lowest First)">Selling(Lowest First)</option>
          <option class="bg-black" value="Buying(highest First)">Buying(highest First)</option>
          <option class="bg-black" value="Buying(lowest First)">Buying(lowest First)</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import CurrencySelectorRank from './currency-selector-rank.vue';

const selectedCurrency = ref('USD');
const selectedOrderType = ref('Selling(highest First)');

const emit = defineEmits(['filter-changed']);

function updateCurrency(currency) {
  selectedCurrency.value = currency;
  emit('filter-changed', { currency: selectedCurrency.value, orderType: selectedOrderType.value });
}

function updateOrderType() {
  emit('filter-changed', { currency: selectedCurrency.value, orderType: selectedOrderType.value });
}
</script>

<style lang="scss" scoped>
select {
  background-color: #000;
  color: #fff;
  padding: 4px 4px;
  font-size: 0.9em;
  width: 160px;
  height: 30px;
}

option {
  background-color: #000;
  color: #fff;
  font-size: 0.9em;
}

select:focus {
  outline: none;
  border-color: #555;
}

.text {
  color: #667078;
  font-weight: bold;
  font-size: 1.425rem;
  display: flex;
}

.highlight {
  background: var(--gradient-color);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-left: 4px;
  margin-right: 3px;
}

.rank-container {
  display: flex;
  flex-direction: row; /* Default: all inline */
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  margin-left: 20px;
  margin-right: 20px;
  border-radius: 0.75rem;

  
  padding: 1rem;
  box-sizing: border-box;
}

/* Controls wrapper */
.controls {
  display: flex;
  gap: 10px;
}

/* Small screens */
@media (max-width: 768px) {
  .rank-container {
    flex-direction: column; /* stack title on top */
    align-items: flex-start;
  }

  .controls {
    display: flex;
    flex-direction: row; /* currency + select side by side */
    justify-content: space-between;
    width: 100%;
  }

  .controls > * {
    flex: 1 1 45%;
    min-width: 120px;
  }

  .order-select select {
    width: 100%;
  }
}
</style>
