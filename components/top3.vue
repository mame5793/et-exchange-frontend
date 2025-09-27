<template>
  <div class="top3-wrapper">
    <div class="top3-header">
      <div class="text-area">
        <p class="title">
          Top 3<span class="highlight"> Banks</span>
        </p>
        <p class="subtitle">Buying and Selling rates</p>
      </div>
      <currency-selector @currency-selected="onCurrencySelected" />
    </div>

    <!-- Show message if no bank supports the currency -->
    <div v-if="!hasData" class="no-data">
      No data available for {{ selectedCurrency }}
    </div>

    <!-- Show cards if banks support the currency -->
    <div v-else class="cards-grid">
      <!-- Top Buying -->
      <div
        v-for="(bank, index) in topBuying"
        :key="'buy-' + index"
        class="card"
      >
        <span class="caption">Top Buying Rate</span>
        <div class="rate-info">
          <span class="rate">
            {{ bank[selectedCurrency]?.buying ?? "N/A" }}
          </span>
          <div class="status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <p class="status-text">High</p>
          </div>
        </div>
        <p class="name">{{ bank.name }}</p>
      </div>

      <!-- Top Selling -->
      <div
        v-for="(bank, index) in topSelling"
        :key="'sell-' + index"
        class="card"
      >
        <span class="caption">Top Selling Rate</span>
        <div class="rate-info">
          <span class="rate">
            {{ bank[selectedCurrency]?.selling ?? "N/A" }}
          </span>
          <div class="status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <p class="status-text">High</p>
          </div>
        </div>
        <p class="name">{{ bank.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { banks } from "../data/store.js";

const selectedCurrency = ref("USD");

// Banks that actually support the selected currency
const validBanks = computed(() =>
  banks.filter((bank) => bank[selectedCurrency.value])
);

// Does any bank have this currency?
const hasData = computed(() => validBanks.value.length > 0);

// Top 3 buying
const topBuying = computed(() =>
  validBanks.value
    .slice()
    .sort(
      (a, b) =>
        (b[selectedCurrency.value]?.buying || 0) -
        (a[selectedCurrency.value]?.buying || 0)
    )
    .slice(0, 3)
);

// Top 3 selling
const topSelling = computed(() =>
  validBanks.value
    .slice()
    .sort(
      (a, b) =>
        (b[selectedCurrency.value]?.selling || 0) -
        (a[selectedCurrency.value]?.selling || 0)
    )
    .slice(0, 3)
);

function onCurrencySelected(currency) {
  selectedCurrency.value = currency;
}
</script>

<style scoped>
/* Global box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

.top3-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
  color: #fff;
  overflow-x: hidden;
}
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px; /* Adjust depending on desired space */
  text-align: center;

  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #f87171; /* red-400 */
}

.top3-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .top3-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.text-area {
  text-align: center;
}
.text-area .title {
  font-size: 1.75rem;
  font-weight: bold;
}
.text-area .highlight {
  color: #10b981;
}
.text-area .subtitle {
  color: #d1d5db;
  font-size: 1rem;
}

.cards-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  margin: 0;
}

@media (min-width: 400px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 640px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background-color: #111827;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0; /* Prevent overflow from text */
  word-wrap: break-word;
}

.caption {
  color: #9b9ea2;
  font-size: 0.875rem;
}

.rate-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.rate {
  color: #10b981;
  font-size: 1.25rem;
  font-weight: 600;
}

.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-text {
  color: #10b981;
  font-size: 0.875rem;
}

.name {
  color: #d1d5db;
  font-size: 0.875rem;
  word-break: break-word;
}
</style>
