<template>
  <div class="wrapper">
    <NuxtLink to="https://t.me/exethiopia" target="_blank" rel="noopener">
      <div class="icon telegram">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.3em" viewBox="0 0 24 24">
            <path fill="#080808" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"></path>
          </svg>
        </span>
      </div>
    </NuxtLink>

    <NuxtLink to="https://www.linkedin.com/exethiopia" target="_blank" rel="noopener">
      <div class="icon linkedin">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
            <path fill="#080808" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 480.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3M135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5c0 21.3-17.2 38.5-38.5 38.5m282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7c-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5c67.2 0 79.7 44.3 79.7 101.9z"></path>
          </svg>
        </span>
      </div>
    </NuxtLink>

    <NuxtLink to="https://x.com/ExEthiopia" target="_blank" rel="noopener">
      <div class="icon x">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 448 512">
            <path fill="#080808" d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"></path>
          </svg>
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.wrapper {
  display: inline-flex;
  gap: 20px;
}

.icon {
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.icon span {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* default background */
  border-radius: 50%;
  height: 40px;
  width: 40px;
  transition: all 0.3s ease;
}

.icon svg path {
  fill: #080808; /* default icon color */
  transition: fill 0.3s ease;
}

/* Hover effect: smooth color change + slight scale */
.icon:hover span {
  background-color: #000; /* black background on hover */
  transform: scale(1.1); /* slightly enlarge */
}

.icon:hover svg path {
  fill: #4CAF50; /* green icon on hover */
}

/* Responsive */
@media (max-width: 768px) {
  .wrapper {
    gap: 15px;
  }
  .icon span {
    height: 35px;
    width: 35px;
  }
}

@media (max-width: 480px) {
  .wrapper {
    gap: 10px;
  }
  .icon span {
    height: 30px;
    width: 30px;
  }
}
</style>
