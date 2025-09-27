<template>
  <div class="page max-w-5xl mx-auto p-6 text-white flex flex-col gap-8">
    <!-- Header -->
    <header class="text-center">
      <h1 class="text-4xl font-bold mb-2">Bureaux de Change</h1>
      <p class="text-gray-400 text-lg">
        Everything you need to know about foreign currency exchange offices.
      </p>
    </header>

    <!-- Introduction (collapsible) -->
    <section class="bg-[#111111] p-6 rounded-lg shadow-md">
      <button
        @click="toggleSection('intro')"
        class="flex justify-between items-center w-full text-left"
      >
        <h2 class="text-1xl font-semibold">What is a Bureau de Change?</h2>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 transition-transform"
            :class="{ 'rotate-180': openSection === 'intro' }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <transition name="fade">
        <p v-if="openSection === 'intro'" class="mt-3 text-gray-300 leading-relaxed">
          A <span class="font-semibold">Bureau de Change</span> is a business that specializes in
          exchanging one currency for another. These services are often used by travelers,
          businesses, and anyone needing foreign currency. They provide quick access to cash in
          different currencies and may also offer related financial services such as money transfers.
        </p>
      </transition>
    </section>

    <!-- Location Info (collapsible) -->
    <section class="bg-[#111111] p-6 rounded-lg shadow-md">
      <button
        @click="toggleSection('location')"
        class="flex justify-between items-center w-full text-left"
      >
        <h2 class="text-1xl font-semibold">Where Can You Find Them?</h2>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 transition-transform"
            :class="{ 'rotate-180': openSection === 'location' }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <transition name="fade">
        <p v-if="openSection === 'location'" class="mt-3 text-gray-300 leading-relaxed">
          Bureaux de change can usually be found in major cities, airports, shopping districts,
          business centers, and other commercial areas where there is a high demand for foreign
          currency exchange. They are designed to provide convenient and fast services to both
          locals and international visitors.
        </p>
      </transition>
    </section>

    <!-- Helpful Note -->
    <section class="bg-[#0f0f0f] p-6 rounded-lg border border-gray-800">
      <h2 class="text-xl font-semibold mb-2">Things to Keep in Mind</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li>Exchange rates may vary between different bureaux de change.</li>
        <li>Some may charge a service fee or commission.</li>
        <li>Always compare rates before making a large transaction.</li>
        <li>Official bureaux de change are licensed and regulated for customer protection.</li>
      </ul>
    </section>

    <!-- Back Button -->
    <div class="mt-6 flex justify-center">
      <NuxtLink to="/" class="btn">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const openSection = ref(null);

function toggleSection(section) {
  openSection.value = openSection.value === section ? null : section;
}
</script>

<style scoped>
.page {
  padding-bottom: 60px;
}

.btn {
  background: #16a34a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  text-decoration: none;
}

.btn:hover {
  background: #22c55e;
}

/* Transition for smooth open/close */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 500px;
}

.rotate-180 {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.25rem;
  }
}
</style>
