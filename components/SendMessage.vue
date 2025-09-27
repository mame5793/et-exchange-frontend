<template>
    <div class="btn-container">
        <NuxtLink to="/contact" class="btn">SEND A MESSAGE</NuxtLink>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.btn-container{
  margin-top: 50px;
  margin-bottom: 15px;
}
.btn {
  background: linear-gradient(to right,
      #58e274, 
      #75e677); 

  color: black; 
  font-weight: bold;
  
  padding-left: 2rem; 
  padding-right: 2rem;
  padding-top: 0.55rem;
  padding-bottom: 0.55rem; 
  font-size: 0.8rem; 
  
  border-radius: 0.375rem; 
  transition: color 0.2s ease;
  cursor: pointer;
  
}
.btn:hover{
  color: white;
}
</style>