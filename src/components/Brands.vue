<template>
  <section class="brands" :style="{ '--total-items': brands.length }">
    <div class="container">
      <div
        v-for="(brand, idx) in brands"
        :key="brand"
        class="brands__item"
        :style="{ '--counter': brands.length - idx - 1 }"
      >
        <svg class="brands__logo">
          <use :xlink:href="`${brandsLogo}#${brand}`" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import brandsLogo from '@/assets/img/sprites/brands-logo.svg?url'

const brands = ['christian-dior', 'gucci', 'denim', 'calvin-klein', 'prada', 'louis-vuitton', 'chanel']
</script>

<style lang="scss">
.brands {
  display: grid;
  margin-bottom: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);
  padding-block: clamp(3rem, 2.213rem + 3.3578vw, 5rem);
  box-shadow: 0 1.25rem 3.25rem 0 rgba(var(--color-black-rgb), 0.03);

  .container {
    --animation-duration: 50s;
    position: relative;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    width: min(calc(var(--container-width)), 100%);
    overflow: hidden;

    &::after {
      position: absolute;
      inset: 0;
      content: '';
      background: linear-gradient(
        90deg,
        var(--color-white),
        rgba(var(--color-white-rgb), 0) 10%,
        rgba(var(--color-white-rgb), 0) 90%,
        var(--color-white)
      );

      @media (max-width: 83rem) {
        display: none;
      }
    }
  }

  &__item {
    display: grid;
    place-content: center;
    width: clamp(9.375rem, 6.3746rem + 12.8017vw, 17rem);
    padding-inline: clamp(1rem, 0.4589rem + 2.3085vw, 2.375rem);
    translate: calc((var(--counter) - var(--total-items)) * 100%);
    animation-name: slide-to-left;
    animation-duration: var(--animation-duration);
    animation-timing-function: linear;
    animation-delay: calc((var(--counter) - var(--total-items)) * var(--animation-duration) / var(--total-items));
    animation-iteration-count: infinite;
  }

  &__logo {
    width: 100%;
    height: clamp(2rem, 1.6065rem + 1.6789vw, 3rem);
  }
}

@keyframes slide-to-left {
  0% {
    translate: calc(var(--counter) * 100%);
  }
}
</style>
