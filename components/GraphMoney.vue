<template>
  <div class="one flex items-center text-white space-x-2 bg-black rounded-md w-30 py-1 px-2 border border-border-money">
    <label for="currency-1" class="sr-only">Currency</label>
    <img id="currency-image" :src="getCurrencyImage(selectedCurrency)" alt="Currency Flag"/>
    <select
      name="currency"
      id="currency-1"
      class="bg-transparent text-white focus:outline-none bg-black"
      v-model="selectedCurrency"
      @change="updateCurrency"
    >
      <option class="bg-black" value="USD">USD</option>
      <option class="bg-black" value="EUR">EUR</option>
      <option class="bg-black" value="GBP">GBP</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCurrency = ref('USD');

const emit = defineEmits(['currency-selected']);

const getCurrencyImage = (currency) => `/images/flags/${currency}.png`;

const updateCurrency = () => {
  emit('currency-selected', selectedCurrency.value);
};
</script>




  <style lang="scss" scoped>
  img{
    height: 1.5rem;
    width: 1.5rem;
    
    border-radius: 15px;
  }
    select {
      display: flex;
   flex-shrink: 1;
      background-color: #000; 
      color: #fff; 
      padding: 4px 4px; 
      font-size: 0.9em;
     
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
  </style>