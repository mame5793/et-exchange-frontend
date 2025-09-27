<!-- components/CurrencySelector.vue -->
<template>
  <div
    class="one flex items-center text-white space-x-2 bg-[#141414] rounded-md w-30 py-1 px-2 border border-border-money"
  >
    <label for="currency-1" class="sr-only">Currency</label>
    <img
      id="currency-image"
      :src="getCurrencyImage(selectedCurrency)"
      alt="Currency Flag"
    />
    <select
      name="currency"
      id="currency-1"
      class="bg-transparent text-white focus:outline-none bg-black"
      v-model="selectedCurrency"
      @change="updateCurrency"
    >
      <option
        v-for="cur in availableCurrencies"
        :key="cur"
        :value="cur"
        class="bg-black"
      >
        {{ cur }} - {{ currencyNames[cur] || cur }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  availableCurrencies: {
    type: Array,
    default: () => [], // ✅ always an array
  },
  modelValue: {
    type: String,
    default: "USD",
  },
});

const emit = defineEmits(["currency-selected", "update:modelValue"]);

const selectedCurrency = ref(props.modelValue);

// Map of currency abbreviations to full names
const currencyNames = {
  USD: "USA Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
  CNY: "Chinese Yuan",
  CHF: "Swiss Franc",
  KES: "Kenyan Shilling",
  ZAR: "SA Rand",
  SEK: "Swedish Krona",
  JPY: "Japanese Yen",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  DJF: "Djiboutian Franc",
  INR: "Indian Rupee",
  AUD: "Australian Dollar",
  KWD: "Kuwaiti Dinar",
};

function getCurrencyImage(currency) {
  return `/images/flags/${currency}.png`;
}

function updateCurrency() {
  emit("currency-selected", selectedCurrency.value);
  emit("update:modelValue", selectedCurrency.value);
}

// ✅ Watch availableCurrencies safely
watch(
  () => props.availableCurrencies,
  (newList = []) => {
    if (!newList.includes(selectedCurrency.value)) {
      selectedCurrency.value = newList[0] || "";
      emit("currency-selected", selectedCurrency.value);
      emit("update:modelValue", selectedCurrency.value);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
img {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 15px;
}
select {
  background-color: #000;
  color: #fff;
  padding: 4px 4px;
  font-size: 0.9em;
  width: 150px;
  height: 30px;
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
.one {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  overflow: visible;
}
</style>
