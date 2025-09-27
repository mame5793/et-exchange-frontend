<template>
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="bg-transparent text-white flex items-center space-x-2 px-4 py-2 border border-border-money rounded-md bg-black focus:outline-none"
      >
        <img :src="selectedImage" alt="Selected Flag" class="w-5 h-3.5">
        <span>{{ selectedText }}</span>
      </button>
      <ul
        v-if="showDropdown"
        class="absolute left-0 mt-2 bg-black text-white border border-border-money rounded-md w-full z-10"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700"
        >
          <img :src="option.image" alt="Flag" class="w-5 h-3.5 mr-2">
          <span>{{ option.text }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  });
  
  const showDropdown = ref(false);
  const selectedOption = ref(props.options.find(option => option.value === props.value));
  
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };
  
  const selectOption = (option) => {
    selectedOption.value = option;
    showDropdown.value = false;
    emit('update:value', option.value);
  };
  
  const selectedImage = computed(() => selectedOption.value ? selectedOption.value.image : '');
  const selectedText = computed(() => selectedOption.value ? selectedOption.value.text : '');
  </script>
  
  <style scoped>
img{
  height: 1.5rem;
  width: 1.5rem;
  
  border-radius: 15px;
}
  select {
    background-color: #000; 
    color: #fff;
    padding: 4px 4px; 
    font-size: 0.9em; 
    width: 170px; 
    height: 30px; 
  }

  
  option {
    background-color: #000; 
    color: #fff;
    font-size: 0.9em; 
  }

  select:focus {
    outline: none; 
  }
.text-container{
  display: flex;
  gap:5px;
  justify-content: space-between;

  flex-shrink: 1;
}
.text{
    color: #667078;
  font-weight: bold;
  font-size: 1.125rem;
  display: flex;
}

.highlight {
  background: var(--gradient-color);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-left: 4px;
}
.rank-container{
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 25px;
  flex-grow: 1;
  flex-shrink: 1;
  border-radius: 0.75rem;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background-color: #1a1a1a;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
}
  </style>
  