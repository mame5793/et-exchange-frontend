 <template>
  <div>
    <!-- Loader -->
    <div v-if="loading" class="loader-overlay">
      <div class="dots">
        <span></span><span></span><span></span>
      </div>
    </div>

    <!-- Main content -->
    <div v-else class="main-page">
      <header>
        <Logo />
      </header>

      <main class="px-4 md:px-8 lg:px-16">
        <!-- Calculator Section -->
        <Calculator :togglePopBox="togglePopBox" />

        <!-- Bank Scroller Section -->
        <BankScroller />

        <!-- Advised Section -->
        <Advised />

        <!-- Top 3 Banks -->
        <div class="top3-section my-6">
          <Top3 />
        </div>

        <!-- Dashboard Section -->
        <div class="dashboard-section grid gap-6 lg:grid-cols-2 sm:grid-cols-1">
          <One class="conversion" />
          <Two />
        </div>

        <!-- App Section -->
        <div class="rank-container my-6">
          <App />
        </div>

        <!-- Currency Trend Section -->
        <curency />
      </main>

      <footer>
        <End />
      </footer>

      <!-- PopBox -->
      <PopBox v-if="showPopBox" @close="togglePopBox" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Components
import Calculator from '~/components/Calculator.vue'
import BankScroller from '~/components/BankScroller.vue'
import Advised from '~/components/advised.vue'
import Curency from '~/components/currency-trend.vue'
import Top3 from '~/components/top3.vue'
import One from '~/components/one.vue'
import Two from '~/components/two.vue'
import App from '~/components/App.vue'
import End from '~/components/end.vue'
import Logo from '~/components/Logo.vue'
import PopBox from '~/components/PopBox.vue'

// PopBox toggle
const showPopBox = ref(false)
function togglePopBox() {
  showPopBox.value = !showPopBox.value
}

// Loader state
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 800) // 0.8s loader before showing main content
})

// Debug env
console.log(import.meta.env.VITE_API_BASE_URL)
console.log(import.meta.env.VITE_APP_NAME)
console.log(import.meta.env.VITE_DEFAULT_CURRENCY)
</script>

<style scoped lang="scss">
/* Loader styles */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  z-index: 9999;
}

.dots {
  display: flex;
  gap: 8px;
}

.dots span {
  width: 12px;
  height: 12px;
  background: #00ff00; /* green dots */
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from {
    transform: translateY(0);
    opacity: 0.6;
  }
  to {
    transform: translateY(-12px);
    opacity: 1;
  }
}

/* Your existing styles */
.main-page {
  overflow-x: hidden;
}

.dashboard-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.top3-section {
  width: 100%;
  overflow-x: hidden;
}

.rank-container {
  width: 100%;
  padding: 1rem 0;
}

@media (max-width: 640px) {
  main {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

.currency-trend-section {
  width: 100%;
}
</style>
