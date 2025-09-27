<template>
    <div>
       <rank @filter-changed="updateFilters" /> 
      <rank-table :selected-currency="selectedCurrency" :selected-order-type="selectedOrderType" />
    </div>
  </template>
  
  <script setup>
 import Rank from './rank.vue';
 import RankTable from './rank-table.vue';
  
  const selectedCurrency = ref('USD');
  const selectedOrderType = ref('Selling(highest First)');
  
  function updateFilters(filters) {
    selectedCurrency.value = filters.currency;
    selectedOrderType.value = filters.orderType;
  }
  </script>
  
  
<style lang="scss" scoped>

</style>
  