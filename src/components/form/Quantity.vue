<template>
  <div class="quantity">
    <label v-if="label" class="quantity__label" :for="`quantity-${uniqueId}`">{{ label }}</label>
    <div class="quantity__inner">
      <button class="quantity__btn" type="button" @click="decrement">-</button>
      <input
        :id="`quantity-${uniqueId}`"
        class="quantity__input"
        type="number"
        :value="model"
        inputmode="numeric"
        @input="onInput"
      />
      <button class="quantity__btn" type="button" @click="model++">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateUniqueId } from '@/utils'

const model = defineModel<number>({ required: true })
defineProps<{ label?: string }>()

const uniqueId = generateUniqueId()
const decrement = () => (model.value = Math.max(1, model.value - 1))
const onInput = (event: Event) => (model.value = Number((event.target as HTMLInputElement).value))
</script>

<style lang="scss">
.quantity {
  &__label {
    display: block;
    width: fit-content;
    margin-bottom: 0.75rem;
  }

  &__inner {
    display: flex;
    width: 9rem;
    height: 2.875rem;
    border: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
    border-radius: 0.25rem;
    transition: border 0.25s;

    &:has(input:focus) {
      border-color: var(--color-black);
    }
  }

  &__btn {
    display: grid;
    place-content: center;
    width: 2.5rem;
    font-size: 1.25rem;

    &:hover {
      background: rgba(var(--color-black-rgb), 0.03);
    }
  }

  &__input {
    flex: 1;
    min-width: 0;
    text-align: center;
    -moz-appearance: textfield;
    border: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
