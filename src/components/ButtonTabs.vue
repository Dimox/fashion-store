<template>
  <div class="button-tabs">
    <button
      v-for="option in options"
      :key="option.value"
      class="button-tabs__btn"
      :class="{ 'button-tabs__btn--active': modelValue === option.value }"
      type="button"
      @click="setActiveTab(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ButtonTab } from '@/types'

defineModel<string>({ required: true })
defineProps<{ options: ButtonTab[] }>()
const emit = defineEmits(['update:modelValue'])

const setActiveTab = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style lang="scss">
.button-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 0.6065rem + 1.6789vw, 2rem);

  &__btn {
    padding: 1.25rem 2.5rem;
    color: var(--color-secondary);
    text-align: center;
    background: rgba(var(--color-black-rgb), 0.02);
    border-radius: 0.625rem;

    &:hover {
      color: var(--color-primary);
    }

    &--active,
    &--active:hover {
      color: var(--color-white);
      background: var(--color-black);
      box-shadow: 0 1.25rem 2.25rem 0 rgba(var(--color-black-rgb), 0.15);
    }
  }
}
</style>
