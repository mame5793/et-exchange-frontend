<template>
  <div class="container">
    <NuxtLink to="/bureaux" class="link">
      <span class="text">Cash Exchange Offices</span>
    </NuxtLink>
  </div>
</template>

<script setup>
// no script needed
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
}

.link {
  text-decoration: none;
  color: #4ade80; /* green accent */
  font-weight: 600;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #22c55e; /* brighter green on hover */
  }
}
</style>
