
<template>
  <div class="class_container">
    <div class="button-group">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        :class="{ 'button': true, 'active': button.active }"
        @click="setActive(index)"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const buttons = ref([
 
  { label: '1D', active: false },
  { label: '1W', active: false },
  { label: '1M', active: false },
]);

const setActive = (index) => {
  buttons.value.forEach((button, i) => {
    button.active = i === index;
  });
  emit('time-selected', buttons.value[index].label);
};

const emit = defineEmits(['time-selected']);
</script>

 

<style lang="scss" scoped>
.class_container{
  margin-top: 30px;
}
.button-group {

  display: flex;
  gap: 12px; 
  background-color: #0F0F0F;
  border-radius: 8px;
  width: fit-content;
  margin: 10px auto; 
  padding: 4px 8px;
  justify-content: center;
}

.button {
  width: 36px; 
  height: 36px; 
  padding: 4px; 
  border-radius: 8px;
  border: none;
  color: #A9A9A9; 
  background-color: transparent;
  cursor: pointer;
}

.button.active {
  background: linear-gradient(135deg, #FF7E5F, #FFB88C); /* graph-gradient */
  color: #0F0F0F; /* text color for active state */
}

.button:hover {
  opacity: 0.8;
}

</style>