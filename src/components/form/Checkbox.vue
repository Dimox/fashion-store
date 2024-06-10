<template>
  <label class="checkbox">
    <input v-model="model" class="checkbox__input visually-hidden" type="checkbox" :checked="model" />
    <span class="checkbox__state">
      <Icon class="checkbox__check" name="check" width="16" height="16" />
    </span>
    <slot>
      <span class="checkbox__label">{{ label }}</span>
    </slot>
  </label>
</template>

<script setup lang="ts">
import Icon from '../Icon.vue'

const model = defineModel<boolean>()
defineProps<{ label?: string }>()
</script>

<style lang="scss">
.checkbox {
  display: flex;
  gap: 0.75rem;
  width: fit-content;
  cursor: pointer;

  &__state {
    display: grid;
    place-content: center;
    width: 1.375rem;
    height: 1.375rem;
    border: 0.125rem solid rgba(var(--color-black-rgb), 0.2);
    border-radius: 0.25rem;
    transition: border 0.25s;

    .checkbox__input:checked + & {
      border-color: var(--checked-color, var(--color-blue));
    }
  }

  &__check {
    opacity: 0;
    transition: opacity 0.25s;

    .checkbox__input:checked + .checkbox__state & {
      color: var(--checked-color, var(--color-blue));
      opacity: 1;
    }
  }
}
</style>
