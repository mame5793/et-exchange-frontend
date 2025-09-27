<template>
  <div @click="togglePopBox" class="calculator">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="#404040" d="M4 2h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m3 10v2h2v-2zm0 4v2h2v-2zm4-4v2h2v-2zm0 4v2h2v-2zm4-4v6h2v-6zM7 6v4h10V6z"/>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps(['togglePopBox']);
</script>

<style scoped>
.calculator {
  background: var(--gradient-color, linear-gradient(45deg, #27aa27, #58e274));
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Hover effect */
.calculator:hover {
  background: linear-gradient(45deg, #58e274, #27aa27);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0,0,0,0.35);
}

.calculator svg {
  width: 60%;
  height: 60%;
  transition: fill 0.3s ease;
}

/* Change icon color on hover */
.calculator:hover svg path {
  fill: #ffffff;
}

/* Responsive */
@media (max-width: 640px) {
  .calculator {
    width: 50px;
    height: 50px;
    bottom: 4%;
    right: 4%;
  }
}
</style>
