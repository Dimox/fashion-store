<template>
  <div v-if="maxPages > 1" class="pagination">
    <button v-if="model > 1" class="pagination__arrow" type="button" @click="model--">«</button>
    <button
      v-for="page in maxPages"
      :key="page"
      class="pagination__page"
      :class="{ 'pagination__page--active': model === page }"
      type="button"
      @click="model = page"
    >
      {{ page }}
    </button>
    <button v-if="model < maxPages" class="pagination__arrow" type="button" @click="model++">»</button>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<number>({ required: true })
defineProps<{ maxPages: number }>()
</script>

<style lang="scss">
.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;

  &__page,
  &__arrow {
    display: grid;
    place-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;

    &:hover {
      background: rgba(var(--color-black-rgb), 0.05);
    }
  }

  &__page {
    &--active {
      cursor: default;
      background: rgba(var(--color-black-rgb), 0.05);
    }
  }
}
</style>
