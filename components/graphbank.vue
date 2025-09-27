<template>
  <div class="select-bank">
    <img id="select-bank-image" :src="getBankImage(selectedBankData)" alt="Selected logo"/>
    <select
      name="bank"
      id="select-bank"
      v-model="selectedBankName"
      @change="onBankChange"
    >
      <option value="" disabled>Select a bank</option>
      <option v-for="bank in banks" :key="bank.name" :value="bank.name">
        {{ formatBankName(bank.name) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { banks } from '../data/store.js'; // Adjust path as needed

const selectedBankName = ref('');

const selectedBankData = computed(() => {
  return banks.find(bank => bank.name === selectedBankName.value) || null;
});

const formatBankName = (name) => name.replace(' Bank', '');

const getBankImage = (bank) => {
  if (bank) {
    const formattedName = formatBankName(bank.name).replace(/ /g, '').toLowerCase();
    return `/images/${formattedName}Bank.png`;
  }
  return '';
};

const emit = defineEmits(['bank-selected']);

const onBankChange = () => {
  emit('bank-selected', selectedBankName.value);
};

// Initialize with the first bank's name or a default value
onMounted(() => {
  if (!selectedBankName.value && banks.length > 0) {
    selectedBankName.value = banks[0].name; // Set default value
  }
});
</script>



 


<style lang="scss" scoped>


.select-bank{
  background-color: #000;
  border-radius: 10px;
 padding: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
select {
    display: flex;
   
 flex-shrink: 1;
    background-color: #000; 
    color: #fff; 
    padding: 3px 3px; 
    font-size: 0.9em; 
  
    border: none
  }
 
  
  option {
    background-color: #000; 
    color: #fff; 
    cursor: pointer;
    font-size: 0.9em; 
  }
 

  select:focus {
    outline: none; 
    border-color: #555;
  }

img{
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 15px;
}

</style>