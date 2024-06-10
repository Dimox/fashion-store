<template>
  <component :is="tag" class="btn" :class="`btn--${type}`" :[typeAttr]="typeValue" :[toAttr]="to">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { ButtonType, Tag } from '@/types'

const props = withDefaults(
  defineProps<{
    type?: `${ButtonType}`
    submit?: boolean
    tag?: `${Tag}`
    to?: string
  }>(),
  {
    type: 'primary',
    tag: Tag.Button,
    to: '',
  }
)

const { tag, submit } = toRefs(props)
const typeAttr = computed(() => (tag.value === Tag.Button ? 'type' : ''))
const toAttr = computed(() => (tag.value === Tag.RouterLink ? 'to' : ''))
const typeValue = computed(() => (tag.value === Tag.Button ? (submit.value ? 'submit' : 'button') : ''))
</script>

<style lang="scss">
.btn {
  display: block;
  padding: 1rem 2.5rem;
  text-align: center;
  border-radius: 0.625rem;

  &--primary {
    color: var(--color-white);
    background: var(--color-black);
    box-shadow: 0 1.25rem 2.1875rem 0 rgba(var(--color-black-rgb), 0.15);
    transition: background 0.25s;

    &:hover {
      background: var(--color-primary);
    }
  }

  &--secondary {
    --border-color: var(--color-black);
    box-shadow: inset 0 0 0 0.0625rem var(--border-color);
    transition: 0.25s;
    transition-property: color, box-shadow;

    &:hover {
      --border-color: var(--color-blue);
      color: var(--color-blue);
    }
  }
}
</style>
