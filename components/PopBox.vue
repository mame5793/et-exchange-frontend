<template>
  <div class="pop-overlay" @click.self="closePopBox">
    <div class="pop" :class="{ 'closing': isClosing }">
      <div class="conversion-container">
        <!-- Header -->
        <div class="text-container">
          <div class="text-content">
            <p class="text">
              Currency<span class="highlight">Conversion</span>
            </p>
            <!-- Close Button -->
            <button class="close-btn" @click="startClose">
              ✕
            </button>
          </div>
          <p class="sentence">Providing conversion and exchange rates.</p>
        </div>

        <!-- Calculator -->
        <CurrencyConversionCalculator />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CurrencyConversionCalculator from "./CurrencyConversionCalculator.vue";

const emit = defineEmits(["close"]);
const isClosing = ref(false);

function startClose() {
  isClosing.value = true;
  setTimeout(() => {
    emit("close");
  }, 300); // match animation duration
}

function closePopBox() {
  startClose();
}
</script>

<style scoped>
/* Overlay */
.pop-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Pop container */
.pop {
  position: relative;
  width: 95%;
  max-width: 600px;
  animation: pop-in 0.3s ease-out forwards;
}
.pop.closing {
  animation: pop-out 0.3s ease-in forwards;
}

/* Conversion box */
.conversion-container {
  background: #1a1a1a;
  border-radius: 0.75rem;
  padding: 2rem;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

/* Header */
.text-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  color: #e2e8f0;
  font-weight: bold;
  font-size: 1.5rem;
}
.highlight {
  background: var(--gradient-color, linear-gradient(45deg, #27aa27, #58e274));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sentence {
  margin-top: 6px;
  color: #cbd5e1;
  font-size: 0.95rem;
}

/* Close Button */
.close-btn {
  background: transparent;
  border: none;
  color: #999;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.close-btn:hover {
  color: #ff5a5a;
  transform: scale(1.1);
}

/* Animations */
@keyframes pop-in {
  0% {
    transform: translateY(40px) scale(0.95);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
@keyframes pop-out {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(40px) scale(0.95);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .conversion-container {
    padding: 1.2rem;
  }
  .text {
    font-size: 1.2rem;
  }
}
</style>
