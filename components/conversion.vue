<template>
  <div class="conversion-container">
    <div class="text-container">
      <p class="text">Currency <span class="highlight">Conversion</span></p>
      <p class="sentence">Providing conversion and exchange rates.</p>
    </div>
    <CurrencyConversionCalculator />
  </div>
</template>

<script setup>
import CurrencyConversionCalculator from '~/components/CurrencyConversionCalculator.vue'
</script>

<style scoped lang="scss">
.conversion-container {
 
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid rgba(255,255,255,0.1);
  max-width: 500px;
  margin: auto;
}

.text-container {
  margin-bottom: 1rem;
}

.text {
  color: #667078;
  font-weight: bold;
  font-size: 1.125rem;
}

.highlight {
  background: var(--gradient-color);
  -webkit-text-fill-color: transparent;
}

.sentence { color: azure; font-size: 0.875rem; }

@media (max-width: 640px) {
  .conversion-container { max-width: 95%; padding: 0.5rem; }
  .text { font-size: 1rem; }
  .sentence { font-size: 0.75rem; }
}
</style>
