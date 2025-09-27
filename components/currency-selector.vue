<!-- components/CurrencySelector.vue -->
<template>
  <div class="one flex items-center text-white space-x-2 bg-[#141414] rounded-md w-30 py-1 px-2 border border-border-money">
    <label for="currency-1" class="sr-only">Currency</label>
    <img id="currency-image" :src="getCurrencyImage(selectedCurrency)" alt="Currency Flag">
    <select
      name="currency"
      id="currency-1"
      class="bg-transparent text-white focus:outline-none bg-black"
      v-model="selectedCurrency"
      @change="updateCurrency"
    >
      <option class="bg-black" value="USD">USD - USA Dollar</option>
      <option class="bg-black" value="EUR">EUR - Euro</option>
      <option class="bg-black" value="GBP">GBP - British Pound</option>
      <option class="bg-black" value="CAD">CAD - Canadian Dollar</option>
      <option class="bg-black" value="AED">AED - UAE Dirham</option>
      <option class="bg-black" value="SAR">SAR - Saudi Riyal</option>
      <option class="bg-black" value="CNY">CNY - Chinese Yuan</option>
      <option class="bg-black" value="CHF">CHF - Swiss Franc</option>
      <option class="bg-black" value="KES">KES - Kenyan Shilling</option>
      <option class="bg-black" value="ZAR">ZAR - SA Rand</option>
      <option class="bg-black" value="SEK">SEK - Swedish Krona</option>
      <option class="bg-black" value="JPY">JPY - Japanese Yen</option>
      <option class="bg-black" value="NOK">NOK - Norwegian Krone</option>
      <option class="bg-black" value="DKK">DKK - Danish Krone</option>
      <option class="bg-black" value="DJF">DJF - Djiboutian Franc</option>
      <option class="bg-black" value="INR">INR - Indian Rupee</option>
      <option class="bg-black" value="AUD">AUD - Australian Dollar</option>
      <option class="bg-black" value="KWD">KWD - Kuwaiti Dinar</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Ref for the selected currency with default value 'USD'
const selectedCurrency = ref('USD');

// Define emits
const emit = defineEmits(['currency-selected']);

// Method to get the image for the selected currency
function getCurrencyImage(currency) {
  // Ensure the default image path is valid and matches the actual file path
  return `/images/flags/${currency}.png`;
}

// Emit the selected currency when changed
function updateCurrency() {
  emit('currency-selected', selectedCurrency.value);
}
</script>

  
  <style lang="scss" scoped>
img{
  height: 1.5rem;
  width: 1.5rem;
  
  border-radius: 15px;
}
  select {
    background-color: #000; /* Background color of the dropdown */
    color: #fff; /* Text color */
    padding: 4px 4px; /* Padding inside the select */
    font-size: 0.9em; /* Font size for text inside the dropdown */
    width: 150px; /* Width of the dropdown box */
    height: 30px; /* Height of the dropdown box */
  }

  
  option {
    background-color: #000; /* Background color of the options */
    color: #fff; /* Text color */
    font-size: 0.9em; /* Font size for text inside options */
  }
  
  /* Adjusting the dropdown on focus (when clicked) */
  select:focus {
    outline: none; /* Remove default focus outline */
    border-color: #555; /* Border color on focus */
  }
  .one{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 1;
    overflow: visible;
  }
  </style>
  