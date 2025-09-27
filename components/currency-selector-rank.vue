<template>
  <div class="one flex items-center text-white space-x-2 bg-black rounded-md w-30 py-1 px-2 border border-border-money">
    <label for="currency-1" class="sr-only">Currency</label>
    <img id="currency-image" :src="getCurrencyImage(selectedCurrency)" alt="Currency Flag">
    <select
      name="currency"
      id="currency-1"
      class="bg-transparent text-white focus:outline-none bg-black"
      v-model="selectedCurrency"
      @change="updateCurrency"
    >
<option  class="bg-black" value="USD"> <span>USD - USA Dollar</span></option>
<option class="bg-black" value="EUR">
  <span>EUR - Euro</span>
</option>
<option class="bg-black" value="GBP">
  <span>GBP - British Pound</span>
</option>
<option class="bg-black" value="CAD">
  <span>CAD - Canadian Dollar</span>
</option>
<option class="bg-black" value="AED">
  <span>AED - UAE Dirham</span>
</option>
<option class="bg-black" value="SAR">
  <span>SAR - Saudi Riyal</span>
</option>
<option class="bg-black" value="CNY">
  <span>CNY - Chinese Yuan</span>
</option>
<option class="bg-black" value="CHF">
  <span>CHF - Swiss Franc</span>
</option>
<option class="bg-black" value="KES">
  <span>KES - Kenyan Shilling</span>
</option>
<option class="bg-black" value="ZAR">
  <span>ZAR - SA Rand</span>
</option>
<option class="bg-black" value="SEK">
  <span>SEK - Swedish Krona</span>
</option>
<option class="bg-black" value="JPY">
  <span>JPY - Japanese Yen</span>
</option>
<option class="bg-black" value="NOK">
  <span>NOK - Norwegian Krone</span>
</option>
<option class="bg-black" value="DKK">
  <span>DKK - Danish Krone</span>
</option>
<option class="bg-black" value="DJF">
  <span>DJF - Djiboutian Franc</span>
</option>
<option class="bg-black" value="INR">
  <span>INR - Indian Rupee</span>
</option>
<option class="bg-black" value="AUD">
  <span>AUD - Australian Dollar</span>
</option>
<option class="bg-black" value="KWD">
  <span>KWD - Kuwaiti Dinar</span>
</option>
</select>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCurrency: 'USD',
    };
  },
  methods: {
    getCurrencyImage(currency) {
      return `/images/flags/${currency}.png`;
    },
    updateCurrency() {
      this.$emit('currency-selected', this.selectedCurrency);
    },
  },
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
    width: 160px; 
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
</style>