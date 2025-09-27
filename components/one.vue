<template>
    <div class="conversion-container">
      <div class="text-container">
      <div class="text-content"> 
        <p class="text">
  Currency<span class="highlight">Conversion</span>
</p>

    </div>
</div>
<CurrencyConversionCalculator />
    </div>
  </template>
  <script setup>
 import CurrencyConversionCalculator from './CurrencyConversionCalculator.vue';
  </script>
  <style scoped>
  .text{
    color: #667078;
  font-weight: bold;
  font-size: 1.425rem;
  display: flex;
}
  .conversion-container {
    margin-right: 5px;
    margin-left: 1px;
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1; 
    height: 23rem;
    border-radius: 0.75rem;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    background-color: #1a1a1a;
    padding: 1rem;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .text-content{
  display:flex;
  justify-content: space-between;
}

#select-exchangess{
  padding: 3px;
  border-radius: 6px;
}
.select-exchanges {
  border-radius: 6px;
  padding: 3px;
  font-size: 16px;
  display: flex;
  margin-left: auto; 

}



.text-content {
  color: #667078;
  font-weight: bold;
  font-size: 1.125rem;
}

@media (min-width: 768px) {
  .text-content {
    font-size: 1.5rem;
  }
}

.highlight {
  background: var(--gradient-color);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-left: 4px;
}

.sentence {
  color: azure;
}
  </style>
  