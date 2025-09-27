<template>
  <div class="container">
    <div class="select">
      <div class="money-name">
        <div class="money"><GraphMoney @currency-selected="updateCurrency" /></div>
        <div class="name"><graphbank @bank-selected="updateBank" /></div>
      </div>
      <div class="exchange-type">
        <SelectExchanges @change="updateExchangeType" />
      </div>
    </div>
    <graphtime />
    <BarChart
  :selectedCurrency="selectedCurrency"
  :selectedBankData="selectedBankData"
  :exchangeType="exchangeType"
/>

  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { banks } from '../data/store.js';
import BarChart from './BarChart.vue';

const selectedCurrency = ref('USD');
const selectedBank = ref(''); // Initialize as empty
const selectedBankData = ref(null); // Initialize as null
const exchangeType = ref('buying');

// Function to set the default bank with the highest USD buying value
const setDefaultBank = () => {
  const highestBuyingBank = banks.reduce((max, bank) =>
    bank.USD.buying > max.USD.buying ? bank : max, banks[0]
  );
  selectedBank.value = highestBuyingBank.name;
};

// Function to update bank data based on selected bank
const updateBank = (bankName) => {
  selectedBank.value = bankName;
  selectedBankData.value = banks.find(bank => bank.name === bankName) || banks[0];
  console.log('Bank updated in two.vue:', selectedBank.value);
};

// Update default bank on mount
onMounted(() => {
  setDefaultBank();
});

// Watch for changes in selectedBank and update selectedBankData accordingly
watch(selectedBank, (newBank) => {
  selectedBankData.value = banks.find(bank => bank.name === newBank) || banks[0];
  console.log('Selected bank data updated in two.vue:', selectedBankData.value);
});

// Handle currency and exchange type updates
const updateCurrency = (currency) => {
  selectedCurrency.value = currency;
  console.log('Currency updated in two.vue:', selectedCurrency.value);
};

const updateExchangeType = (type) => {
  exchangeType.value = type;
  console.log('Exchange type updated in two.vue:', exchangeType.value);
};
</script>




  <style lang="scss" scoped>
  .money-name {
display: flex;
justify-content: space-between;
gap: 10px;
  }
  .select{
    display: flex;
    justify-content: space-between;
   
    width: 100%;
    height: 40px;
   
  }
  .container {
    color: #ffffff;
    margin-right: 15px;
  
    width: 100%;
    flex-shrink: 0; 
    flex-grow: 1; 
    height: 23rem;
    border-radius: 0.75rem;
  background: color #1a1a1a; 
    padding: 1rem;
    position: relative;
    border-radius: 0.75rem;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    background-color: #1a1a1a;
    box-sizing: border-box;
  }
  
  
  @media (max-width: 768px) {
  .select {
   flex-direction: column;
   gap: 5px;
  }
  
}
  </style>
  