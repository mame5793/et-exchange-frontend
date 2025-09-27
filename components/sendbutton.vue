<template>
  <!-- prevent form submit by default -->
  <button type="button" class="send-btn" @click="handleClick">
    <span v-if="!isSent">Send Message</span>
    <span v-else class="sent">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="white" d="M9.55 18.45 4.1 13l1.4-1.4 4.05 4.05L18.5 6.7l1.4 1.45z"/>
      </svg>
      Sent
    </span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isSent = ref(false);

const handleClick = () => {
  isSent.value = true;

  // after 2s redirect to home page
  setTimeout(() => {
    router.push("/");
  }, 2000);
};
</script>


<style scoped>
.send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(90deg, #4CAF50, #58e274);
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 12px 26px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  width: 100%;
}

.send-btn:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #43A047, #4CAF50);
}

.send-btn:active {
  transform: scale(0.97);
}

.sent {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .send-btn {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .send-btn {
    font-size: 0.95rem;
    padding: 9px 18px;
  }
}
</style>
