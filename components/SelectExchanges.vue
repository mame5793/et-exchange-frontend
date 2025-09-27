<template>
  <div class="select-exchanges">
    <select name="exchange" id="select-exchangess" v-model="selectedExchangeType" @change="emitChange">
      <option value="buying">Buying</option>
      <option value="selling">Selling</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedExchangeType = ref('buying');

const emit = defineEmits(['change']);

const emitChange = () => {
  emit('change', selectedExchangeType.value);
};
</script>


<style lang="scss" scoped>
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