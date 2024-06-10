<template>
  <section class="hero">
    <div class="container">
      <div class="hero__content">
        <p>
          <span class="hero__text-1">Ultimate</span>
          <span class="hero__text-2">Sale</span>
        </p>
        <p class="hero__text-3">New collection</p>
        <Btn class="hero__btn" tag="RouterLink" to="/catalog">Shop Now</Btn>
      </div>
      <img class="hero__img hero__img--1" :src="img1" :srcset="`${img1x2} 2x`" width="392" height="756" alt="" />
      <img class="hero__img hero__img--2" :src="img2" :srcset="`${img2x2} 2x`" width="392" height="756" alt="" />
      <img class="hero__img hero__img--3" :src="img3" :srcset="`${img3x2} 2x`" width="426" height="150" alt="" />
      <img class="hero__img hero__img--4" :src="img4" :srcset="`${img4x2} 2x`" width="426" height="150" alt="" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Btn from './Btn.vue'
import img1 from '@/assets/img/hero-1.webp?url'
import img1x2 from '@/assets/img/hero-1@2x.webp?url'
import img2 from '@/assets/img/hero-2.webp?url'
import img2x2 from '@/assets/img/hero-2@2x.webp?url'
import img3 from '@/assets/img/hero-3.webp?url'
import img3x2 from '@/assets/img/hero-3@2x.webp?url'
import img4 from '@/assets/img/hero-4.webp?url'
import img4x2 from '@/assets/img/hero-4@2x.webp?url'
</script>

<style lang="scss">
.hero {
  .container {
    display: grid;
    grid-template: auto 1fr auto / auto 1fr auto;
    gap: 2.1875rem;

    @media (max-width: 80rem) {
      gap: 1.5rem;
    }

    @media (max-width: 47.9375rem) {
      gap: 1rem;
    }
  }

  &__img {
    width: 100%;
    border-radius: 0.625rem;
    object-fit: cover;

    &--1 {
      grid-row: 1 / -1;
      grid-column: 1;
      height: 100%;
    }

    &--2 {
      grid-row: 1 / -1;
      grid-column: 3;
      height: 100%;
    }

    &--3 {
      grid-row: 1;
      grid-column: 2;
    }

    &--4 {
      grid-row: 3;
      grid-column: 2;
    }
  }

  &__content {
    display: grid;
    grid-row: 2;
    grid-column: 2;
    place-content: center;
    place-items: center;
    color: var(--color-primary);
    text-align: center;
    text-transform: uppercase;
  }

  &__text-1 {
    display: block;
    margin-bottom: 1rem;
    font-size: clamp(1.625rem, 0.1494rem + 6.2959vw, 5.375rem);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  &__text-2 {
    display: block;
    margin-bottom: 0.75rem;
    font-family: var(--font-family-alt);
    font-size: clamp(3.125rem, 0.4197rem + 11.5425vw, 10rem);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.02em;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.125rem var(--color-primary);
  }

  &__text-3 {
    margin-bottom: 1.125rem;
    font-size: clamp(1rem, 0.9016rem + 0.4197vw, 1.25rem);
    letter-spacing: 0.03em;
  }

  &__btn {
    width: min(13rem, 100%);
    padding-inline: 0;
  }
}
</style>
