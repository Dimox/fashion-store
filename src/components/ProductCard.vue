<template>
  <div class="product-card">
    <RouterLink class="product-card__link" :to="`/product/${product.id}`">
      <img class="product-card__img" :src="product.image" alt="" loading="lazy" />
      <span class="product-card__title">{{ product.title }}</span>
    </RouterLink>
    <div class="product-card__rating">
      <StarRating :rating="product.rating.rate" />
      <p class="product-card__reviews">({{ product.rating.count }}) Customer Reviews</p>
    </div>
    <div class="product-card__price">${{ product.price }}</div>
  </div>
</template>

<script setup lang="ts">
import StarRating from './StarRating.vue'
import type { Product } from '@/types'

defineProps<{ product: Product }>()
</script>

<style lang="scss">
.product-card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: subgrid;
  padding: 2rem 1.5rem 2rem;
  color: var(--color-primary);
  background: var(--color-white);
  border-radius: 0.625rem;
  box-shadow: 0 2.5rem 5.625rem rgba(var(--color-black-rgb), 0.06);

  &__img {
    max-height: 14.75rem;
    aspect-ratio: 1 / 0.7;
    margin-inline: auto;
    margin-bottom: 2rem;
    object-fit: contain;
  }

  &__link {
    display: block;

    &:hover {
      color: var(--color-blue);
    }
  }

  &__title {
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 500;
  }

  &__rating {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  &__reviews {
    font-size: 0.75rem;
    font-weight: 500;
  }

  &__price {
    align-self: flex-end;
    font-size: 1.5rem;
    font-weight: 500;
  }
}
</style>
