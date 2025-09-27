<template>
  <div class="scroll-container" ref="scrollContainer">
    <div class="scroll-content" ref="scrollContent">
      <div v-for="(item, index) in sortedItems" :key="index" class="item">
        <span class="img-span" :style="{ backgroundImage: `url('${item.imgUrl}')` }"></span>
        <div class="bank-text">
          <span class="name">{{ item.name }}</span>
          <span class="usd">USD</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="#22c55e" d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"></path>
            </svg>
          </span>
          <span class="buychange-percent">{{ item.buyChangePercent }}</span>
          <span>{{ item.buyValue }}</span>
          <span class="pipe">|</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="#22c55e" d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"></path>
            </svg>
          </span>
          <span class="sellchange-percent">{{ item.sellChangePercent }}</span>
          <span>{{ item.sellValue }}</span>
        </div>
      </div>
      <!-- Duplicate content for seamless scrolling -->
      <div v-for="(item, index) in sortedItems" :key="'duplicate-' + index" class="item">
        <span class="img-span" :style="{ backgroundImage: `url('${item.imgUrl}')` }"></span>
        <div class="bank-text">
          <span class="name">{{ item.name }}</span>
          <span class="usd">USD</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="#22c55e" d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"></path>
            </svg>
          </span>
          <span class="buychange-percent">{{ item.buyChangePercent }}</span>
          <span>{{ item.buyValue }}</span>
          <span class="pipe">|</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="#22c55e" d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"></path>
            </svg>
          </span>
          <span class="sellchange-percent">{{ item.sellChangePercent }}</span>
          <span>{{ item.sellValue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
import { banks } from '../data/store.js';

const items = ref(
  banks.map(bank => ({
    name: bank.name,
    imgUrl: `/images/${bank.name.replace(' ', '')}.png`,
    buyValue: bank.USD.buying,
    sellValue: bank.USD.selling,
    buyChangePercent: bank.USD.buyChanges,
    sellChangePercent: bank.USD.saleChanges,
  }))
);

const sortedItems = computed(() => {
  return items.value.sort((a, b) => {
    if (b.buyValue !== a.buyValue) return b.buyValue - a.buyValue;
    return b.sellValue - a.sellValue;
  });
});

onMounted(() => {
  const scrollContent = document.querySelector('.scroll-content');
  const containerWidth = document.querySelector('.scroll-container').offsetWidth;
  const contentWidth = scrollContent.scrollWidth / 2; // Half because of duplication

  // Preload images
  sortedItems.value.forEach(item => {
    const img = new Image();
    img.src = item.imgUrl;
  });

  gsap.to(scrollContent, {
    x: -contentWidth,
    ease: 'linear',
    duration: 200, // Increased duration for slower scroll speed
    repeat: -1,
    onRepeat: () => {
      gsap.set(scrollContent, { x: containerWidth });
    }
  });
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.scroll-container {
  width: 100vw;
  overflow: hidden;
  position: relative;
 
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 1) 85%,
    rgba(0, 0, 0, 0)
  );
}

.scroll-content {
  display: flex;
  white-space: nowrap;
  width: 200%; /* Twice the width of the container to fit duplicated content */
  will-change: transform; /* Inform the browser that the element will be animated */
}

.item {
  width: 495px;
  height: 42px;
  background-color: #111827;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 5px;
}

.img-span {
  height: 2.5rem;
  width: 2.5rem;
  background-color: white;
  background-size: contain; /* Ensure the image maintains its aspect ratio */
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform; /* Inform the browser that the element will be animated */
}

.bank-text {
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bank-text span {
  margin-right: 5px;
}

.pipe {
  color: white;
}

.buychange-percent, .sellchange-percent {
  background: var(--gradient-color);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.usd {
  color: white;
  padding-left: 0.15rem;
}

.name {
  color: rgb(255, 255, 255);
  padding-left: 0.4rem;
  flex-grow: 1;
  white-space: nowrap;
}
</style>
