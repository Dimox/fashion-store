<template>
  <div class="testimonial-card">
    <img
      class="testimonial-card__img"
      :src="testimonial.img"
      :srcset="`${testimonial.img2x} 2x`"
      :alt="testimonial.name"
      loading="lazy"
    />
    <div class="testimonial-card__content">
      <blockquote class="testimonial-card__quote">
        <p>“{{ testimonial.quote }}”</p>
      </blockquote>
      <StarRating :rating="testimonial.rating" class="testimonial-card__rating" />
      <div class="testimonial-card__name">{{ testimonial.name }}</div>
      <div class="testimonial-card__status">{{ testimonial.status }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StarRating from './StarRating.vue'
import { Testimonial } from '@/types'

defineProps<{ testimonial: Testimonial }>()
</script>

<style lang="scss">
.testimonial-card {
  --padding: clamp(1.5rem, 0.9098rem + 2.5184vw, 3rem);
  display: flex;
  gap: var(--padding);
  align-items: flex-start;
  height: 100%;
  padding: var(--padding);
  color: var(--color-primary);
  background: var(--color-white);
  border-radius: 0.625rem;

  @media (max-width: 40rem) {
    flex-direction: column;
  }

  &__img {
    width: clamp(9rem, 32%, 15.125rem);
    aspect-ratio: 1;
    margin-bottom: 1.25rem;
    margin-left: 1.25rem;
    box-shadow: -1.25rem 1.25rem rgba(var(--color-black-rgb), 0.15);

    @media (max-width: 63.9375rem) {
      width: clamp(10rem, 20%, 15.125rem);
    }

    @media (max-width: 47.9375rem) {
      margin-inline: auto;
    }
  }

  &__quote {
    margin-bottom: 1.5rem;
  }

  &__rating {
    margin-bottom: 2rem;
  }

  &__name {
    margin-bottom: 0.75rem;
    font-family: var(--font-family-alt);
    font-size: clamp(1.25rem, 0.9549rem + 1.2592vw, 2rem);
    line-height: 1.25;

    &::before {
      display: block;
      width: min(14.5rem, 100%);
      height: 0.0625rem;
      margin-bottom: 1rem;
      content: '';
      background: var(--color-primary);
    }
  }
}
</style>
