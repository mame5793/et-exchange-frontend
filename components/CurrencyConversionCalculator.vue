<template>
  <div>
    <!-- selectors row -->
    <div class="select">
      <div class="select-bank">
        <img id="select-bank-image" :src="getBankImage(selectedBankData)" alt="selected logo" />
        <select name="bank" v-model="selectedBankName" @change="onBankChange">
          <option value="" disabled>Select a bank</option>
          <option v-for="bank in banks" :key="bank.name" :value="bank.name">{{ bank.name }}</option>
        </select>
      </div>

      <div class="exchange">
        <SelectExchanges @change="updateSelectedExchangeType" />
      </div>
    </div>

    <div class="space-y-3">
      <p class="text-xs text-yellow-200 mb-2">Calculate to get instant Price</p>

      <!-- SWAP CONTAINER: ETB input / ICON / FOREIGN input -->
      <div class="swap-container" :class="{ swapped: !etbOnTop }">
        <!-- ETB input -->
        <div class="input-row etb-container" :style="{ order: etbOnTop ? 0 : 2 }">
          <input
            type="number"
            v-model.number="etbAmount"
            @input="calculateForeignAmount"
            class="swap-input"
            placeholder="ETB amount"
          />
          <div class="label-area">
 <img :src="getEtbFlag()" alt="ETB" />

  <span class="label-text">ETB</span>
</div>

        </div>

        <!-- swap icon -->
        <div class="swap-icon-wrapper" :style="{ order: 1 }">
          <button
            class="swap-btn"
            @click="swapPositions"
            @mouseenter="rotateIcon(180)"
            @mouseleave="rotateIcon(0)"
            title="Swap"
          >
            <svg
              ref="icon"
              class="custom-icon"
              :style="{ transform: `rotate(${rotation}deg)` }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path fill="#27aa27" d="M12.89 11.1c-1.78-.59-2.64-.96-2.64-1.9c0-1.02 1.11-1.39 1.81-1.39c1.31 0 1.79.99 1.9 1.34l1.58-.67c-.15-.45-.82-1.92-2.54-2.24V5h-2v1.26c-2.48.56-2.49 2.86-2.49 2.96c0 2.27 2.25 2.91 3.35 3.31c1.58.56 2.28 1.07 2.28 2.03c0 1.13-1.05 1.61-1.98 1.61c-1.82 0-2.34-1.87-2.4-2.09l-1.66.67c.63 2.19 2.28 2.78 2.9 2.96V19h2v-1.24c.4-.09 2.9-.59 2.9-3.22c0-1.39-.61-2.61-3.01-3.44"/>
            </svg>
          </button>
        </div>

        <!-- Foreign currency input -->
        <div class="input-row type-currency" :style="{ order: etbOnTop ? 2 : 0 }">
          <input
            type="number"
            v-model.number="foreignAmount"
            @input="calculateEtbAmount"
            class="swap-input"
            placeholder="Foreign amount"
          />
          <div class="label-area currency-selector-wrap">
  <CurrencySelector
    v-model="selectedCurrency"
    :available-currencies="availableCurrencies"
    @currency-selected="updateCurrency"
  />
</div>

        </div>
      </div>

      <!-- conversion sentence -->
      <div class="conversion-sentence">
        <p v-if="conversionSentence" class="text-green-400 text-center">
          {{ conversionSentence }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { banks } from '../data/store.js';
import SelectExchanges from '~/components/SelectExchanges.vue';
import CurrencySelector from "~/components/DynamicCurrencySelector.vue";
// state
const selectedExchangeType = ref("buying");
const selectedCurrency = ref("USD");
const etbAmount = ref(0);
const foreignAmount = ref(0);
const rotation = ref(0);
const etbOnTop = ref(true);
const selectedBankName = ref("");
function getEtbFlag() {
  return '/images/flags/ETB.png'   // Vue will resolve from /public/
}

// default selected bank
const highestBuyingBank = computed(() => {
  let maxBuyingRate = 0;
  let highestBank = null;
  for (const bank of banks) {
    const buyingRate = bank["USD"]?.buying || 0;
    if (buyingRate > maxBuyingRate) {
      maxBuyingRate = buyingRate;
      highestBank = bank;
    }
  }
  return highestBank;
});
selectedBankName.value = highestBuyingBank.value?.name || "";

// selected bank computed
const selectedBankData = computed(() => banks.find(b => b.name === selectedBankName.value) || null);

// available currencies for dropdown
const availableCurrencies = computed(() => {
  if (!selectedBankData.value) return [];
  return Object.keys(selectedBankData.value).filter(
    key => key !== 'name' && selectedBankData.value[key]?.buying !== undefined
  );
});

// watchers
watch(selectedBankName, () => calculateForeignAmount());

// helpers
function getBankImage(bank) {
  if (bank) return `images/${bank.name.replace(" ", "").toLowerCase()}.png`;
  return "";
}

function updateSelectedExchangeType(newValue) {
  selectedExchangeType.value = newValue;
  calculateForeignAmount();
}

const exchangeRate = computed(() => {
  if (selectedBankData.value) return selectedBankData.value[selectedCurrency.value]?.[selectedExchangeType.value] || 1;
  return 1;
});

function updateCurrency() {
  calculateForeignAmount();
}

function calculateForeignAmount() {
  foreignAmount.value = etbAmount.value ? (etbAmount.value / exchangeRate.value).toFixed(4) : 0;
}

function calculateEtbAmount() {
  etbAmount.value = foreignAmount.value ? (foreignAmount.value * exchangeRate.value).toFixed(2) : 0;
}

// swap toggle
function swapPositions() {
  etbOnTop.value = !etbOnTop.value;
  rotation.value = (rotation.value + 180) % 360;
}

function rotateIcon(deg) {
  rotation.value = deg;
}

function onBankChange() {
  calculateForeignAmount();
}

// conversion sentence
const conversionSentence = computed(() => {
  if (!selectedBankData.value || !exchangeRate.value) return "";
  if (Number(etbAmount.value) > 0) return `${etbAmount.value} ETB = ${foreignAmount.value} ${selectedCurrency.value} (${selectedExchangeType.value})`;
  if (Number(foreignAmount.value) > 0) return `${foreignAmount.value} ${selectedCurrency.value} = ${etbAmount.value} ETB (${selectedExchangeType.value})`;
  return "";
});
</script>

<style scoped>
/* container & selectors */
.select {
  display: flex;
  gap: 0.5rem;
  padding: 6px 0;
  align-items: center;
  justify-content: space-between;
}
.exchange {
  background: #000;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
}
.select-bank {
  background: #000;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 6px; /* space between flag and select */
}

.select-bank img {
  width: 30px;
  height: 30px;
  border-radius: 6px;
}

/* style only the <select> itself */
.select-bank select {
  background: #000;
  color: white;
  border: none;
  font-size: 0.9em;
  padding: 4px 6px;
  appearance: none;   /* remove default arrow (optional) */
  outline: none;
}


.select-bank img { width: 30px; height: 30px; border-radius: 6px; margin-right: 8px; }

/* swap container: column with three children (etb, icon, foreign) */
.swap-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

/* each input-row */
.input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0; /* critical to prevent overflow in flex layouts */
  background: #141414;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
}

/* the text input itself takes remaining space */
.swap-input {
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.25rem;
  padding: 4px 6px;

  /* force numbers to align right */
  text-align: left;

  /* prevent arrows inside number inputs in Chrome/Edge */

}
.swap-input::-webkit-outer-spin-button,
.swap-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


/* label area (flag + short text OR currency selector)
   fixed width so the input always keeps the rest of the space */
.label-area {
  flex: 0 0 86px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
.label-area img { width: 26px; height: 26px; border-radius: 50%; }
.label-text { color: #ddd; font-size: 0.9rem; }

/* currency selector wrapper - keep a consistent size */
.currency-selector-wrap { width: 86px; display:flex; 
border: none;
  align-items:center; justify-content:flex-end; }

/* swap icon center wrapper */
.swap-icon-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5; /* keep on top of inputs */
}

/* swap button + svg */
.swap-btn {
  background: #151515;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.swap-btn { outline: 2px solid rgba(16,185,129,0.2); }
.swap-btn:focus { outline: 5px solid rgba(16,185,129,0.2); }


/* responsive icon size */
.custom-icon {
  width: 1.4rem;
  height: 1.4rem;
}

/* conversion sentence centered and no extra top margin per your request */
.conversion-sentence p { margin: 0; padding-top: 6px; text-align: center; }

/* responsive tweaks */
/* small screens: tighten spacing and font sizes */
@media (max-width: 480px) {
  .swap-container { max-width: 100%; padding: 0 6px; gap: 8px; }
  .swap-input { font-size: 1rem; }
  .label-area { flex-basis: 72px; }
  .currency-selector-wrap { width: 72px; }
  .custom-icon { width: 1.6rem; height: 1.6rem; }
}

/* medium screens */
@media (min-width: 481px) and (max-width: 1024px) {
  .swap-container { max-width: 560px; }
  .swap-input { font-size: 1.1rem; }
  .label-area { flex-basis: 80px; }
  .currency-selector-wrap { width: 80px; }
}

/* large screens keep bigger sizes */
@media (min-width: 1025px) {
  .swap-container { max-width: 680px; }
  .swap-input { font-size: 1.25rem; }
  .label-area { flex-basis: 86px; }
}
@media (max-width: 1024px) {
  .custom-icon {
    width: 34px;
    height: 34px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .custom-icon {
    width: 25px;
    height: 25px;
  }


  .swap-btn {
  background: #151515;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
 
}
}
</style>
