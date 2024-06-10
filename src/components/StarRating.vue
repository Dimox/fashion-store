<template>
  <div class="star-rating" :aria-label="`${rating} stars out of ${totalStars}`">
    <svg class="star-rating__star" xmlns="http://www.w3.org/2000/svg">
      <symbol id="star" viewBox="0 0 15 15">
        <path d="M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z" />
      </symbol>
    </svg>
    <template v-for="i in totalStars" :key="i">
      <svg
        v-if="i - 1 != integer"
        class="star-rating__item"
        :class="{ 'star-rating__item--active': i - 1 < integer }"
        width="20"
        height="20"
      >
        <use xlink:href="#star"></use>
      </svg>
      <svg v-else class="star-rating__item" width="20" height="20">
        <linearGradient :id="`gradient-${uniqueId}`" x1="0" x2="100%" y1="0" y2="0">
          <stop class="star-rating__stop-left" :offset="`${fractionalPercent}%`"></stop>
          <stop class="star-rating__stop-right" :offset="`${fractionalPercent}%`"></stop>
        </linearGradient>
        <use xlink:href="#star" :fill="`url(#gradient-${uniqueId})`"></use>
      </svg>
    </template>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { generateUniqueId } from '@/utils'

const props = defineProps<{ rating: number }>()
const rating = toRef(props, 'rating')
const modulo = (x: number, y: number) => x - Math.floor(x / y) * y

const totalStars = 5
const integer = Math.floor(rating.value)
const fractional = modulo(rating.value, 1)
const fractionalPercent = (fractional * 100).toFixed(2)
const uniqueId = generateUniqueId()
</script>

<style lang="scss">
.star-rating {
  --inactive-color: rgba(var(--color-black-rgb), 0.15);
  --active-color: var(--color-orange);
  display: flex;

  &__star {
    display: none;
  }

  &__item {
    fill: var(--inactive-color);

    &--active {
      fill: var(--active-color);
    }
  }

  &__stop-left {
    stop-color: var(--active-color);
  }

  &__stop-right {
    stop-color: var(--inactive-color);
  }
}
</style>
