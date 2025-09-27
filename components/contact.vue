<template>
    <div>
        <div>  
        <NuxtLink to="/contact" class="btn">contact</NuxtLink>
      </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.btn {
  background: linear-gradient(to right,
      #58e274, 
      #75e677); 
  width: 100%;
  color: black; 
  font-weight: bold;
  text-align: center; 
  padding-left: 2.5rem; 
  padding-right: 2.5rem;
  padding-top: 0.75rem; 
  padding-bottom: 0.75rem; 
  font-size: 1rem; 
  
  border-radius: 0.375rem; 
  transition: color 0.2s ease;
  cursor: pointer;
  position: relative;
  z-index: 0;
}
.btn::after {
  content: "";
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #333;
  left: 0;
  top: 0;
  border-radius: 10px;
}

.btn::before {
  content: "";
  background: linear-gradient(
    45deg,
    #FF0000, #FF7300, #FFFB00, #48FF00,
    #00FFD5, #002BFF, #FF00C8, #FF0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 600%;
  z-index: -1;
  width: calc(100% + 4px);
  height:  calc(100% + 4px);
  filter: blur(8px);
  animation: glowing 20s linear infinite;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
  opacity: 0;
}

@keyframes glowing {
  0% {background-position: 0 0;}
  50% {background-position: 400% 0;}
  100% {background-position: 0 0;}
}


.btn:hover::before {
  opacity: 1;
}

.btn:active:after {
  background: transparent;
}

.btn:active {
  color: #000;
  font-weight: bold;
}
</style>