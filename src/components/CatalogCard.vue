<template>
  <div class="catalog-card">
    <RouterLink class="catalog-card__link" :to="`/product/${product.id}`">
      <img class="catalog-card__img" :src="product.image" alt="" loading="lazy" />
      {{ product.title }}
    </RouterLink>
    <div class="catalog-card__price">${{ product.price }}</div>
    <div v-if="product.colors?.length" class="catalog-card__colors">
      <div v-for="color in product.colors" :key="color" class="catalog-card__color" :style="`--color: ${color}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{ product: Product }>()
</script>

<style lang="scss">
.catalog-card {
  &__img {
    width: 100%;
    max-height: 19.25rem;
    aspect-ratio: 1;
    margin-bottom: 1.25rem;
    padding: 2rem;
    border: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
    object-fit: contain;
  }

  &__link {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 500;

    &:hover {
      color: var(--color-blue);
    }
  }

  &__colors {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  &__color {
    width: 1.625rem;
    height: 1.625rem;
    background: var(--color);
    border-radius: 50%;
  }
}
</style>
