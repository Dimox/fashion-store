<template>
  <button class="scroll-to-top" type="button" @click="scrollToTop">
    <Icon name="arrow-up" width="17" height="26" />
  </button>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style lang="scss">
.scroll-to-top {
  --offset: 2.5rem;
  --size: 2.5rem;
  position: fixed;
  right: var(--offset);
  bottom: var(--offset);
  display: grid;
  place-content: center;
  width: var(--size);
  height: var(--size);
  background: var(--color-white);
  border: 0.0625rem solid var(--color-black);
  border-radius: 50%;

  @supports (animation-timeline: scroll()) {
    animation-name: fade-in;
    animation-timeline: scroll();
  }

  @media (max-width: 80rem) {
    --offset: 1.5rem;
  }

  @media (max-width: 47.9375rem) {
    --offset: 1rem;
    --size: 2rem;

    .icon {
      width: 0.75rem;
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
