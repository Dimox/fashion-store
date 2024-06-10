<template>
  <div class="loader" />
</template>

<script setup lang="ts"></script>

<style lang="scss">
.loader {
  display: grid;
  justify-content: center;

  &::after {
    --offset: 0.5rem;
    width: 3.25rem;
    aspect-ratio: 1;
    content: '';
    background: radial-gradient(farthest-side, var(--color-blue) 94%, #0000) no-repeat top / var(--offset) var(--offset),
      conic-gradient(#0000 30%, var(--color-blue));
    border-radius: 50%;
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - var(--offset)), var(--color-black) 0);
    animation: loader 0.5s infinite linear;
  }
}

@keyframes loader {
  100% {
    transform: rotate(1turn);
  }
}
</style>
