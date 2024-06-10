<template>
  <aside class="filters">
    <h2 class="filters__title text-h3">Filters</h2>
    <section v-for="{ name, items } in filters" :key="name" class="filters__section">
      <h3 class="filters__subtitle">{{ name }}</h3>
      <fieldset class="filters__items" :class="`filters__items--${name.toLowerCase()}`">
        <template v-for="item in items" :key="item.value">
          <Checkbox v-model="item.checked" class="filters__item">
            <template v-if="name === 'Colors'">
              <span v-if="'value' in item" class="filters__color" :style="`--color: ${item.value}`">
                <Icon class="filters__check" name="check" />
              </span>
            </template>
            <span v-else-if="'min' in item" class="filters__label">${{ item.min }} - ${{ item.max }}</span>
            <span v-else-if="'value' in item" class="filters__label">
              {{ item.label ? item.label : item.value }}
            </span>
          </Checkbox>
        </template>
      </fieldset>
    </section>
    <button class="filters__close" type="button" @click="$emit('close')">
      <Icon name="close" />
    </button>
    <div class="filters__actions">
      <Btn type="secondary" @click="clearAll">Clear all</Btn>
      <Btn class="filters__apply" @click="$emit('close')">Apply</Btn>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { FiltersT } from '@/types'
import { additionalData } from '@/data'
import Icon from '@/components/Icon.vue'
import Btn from '@/components/Btn.vue'
import Checkbox from '@/components/form/Checkbox.vue'

defineEmits(['close'])
const model = defineModel<FiltersT[]>({ required: true })

const getUniqueColors = (data: { colors: string[] }[]) => {
  const colors = data.reduce((acc: { value: string; checked: boolean }[], { colors }) => {
    colors.forEach(color => {
      if (!acc.some(item => item.value === color)) {
        acc.push({ value: color, checked: false })
      }
    })
    return acc
  }, [])
  return colors
}

const colors = getUniqueColors(additionalData)

const filters = ref<FiltersT[]>([
  {
    name: 'Categories',
    items: [
      { label: "Men's Fashion", value: "men's clothing", checked: false },
      { label: "Women's Fashion", value: "women's clothing", checked: false },
      { label: 'Jewelery', value: 'jewelery', checked: false },
    ],
  },
  {
    name: 'Colors',
    items: colors as FiltersT['items'],
  },
  {
    name: 'Prices',
    items: [
      { min: 0, max: 50, checked: false },
      { min: 50, max: 100, checked: false },
      { min: 100, max: 200, checked: false },
      { min: 200, max: 1000, checked: false },
    ],
  },
  {
    name: 'Tags',
    items: [
      { value: 'T-Shirts', checked: false },
      { value: 'Jackets', checked: false },
      { value: 'Backpacks', checked: false },
      { value: 'Bracelets', checked: false },
      { value: 'Rings', checked: false },
    ],
  },
])

watchEffect(() => {
  model.value = filters.value
})

const clearAll = () => {
  filters.value.forEach(filter => {
    filter.items.forEach(item => {
      item.checked = false
    })
  })
}
</script>

<style lang="scss">
.filters {
  display: grid;
  gap: 2rem;
  align-content: flex-start;

  &__subtitle {
    margin-bottom: 1rem;
    font-family: var(--font-family-alt);
    font-size: 1.125rem;
    font-weight: normal;
  }

  &__items {
    display: grid;
    gap: 0.625rem;

    &--colors {
      display: flex;
      flex-wrap: wrap;

      .checkbox__state {
        display: none;
      }
    }
  }

  &__item {
    color: var(--color-secondary);
  }

  &__color {
    width: 1.875rem;
    height: 1.875rem;
    background: var(--color);
    border-radius: 50%;

    .filters__items--colors & {
      display: grid;
      place-content: center;
    }
  }

  &__check {
    color: var(--color);
    filter: invert(100%);
    opacity: 0;

    .filters__item:has(:checked) & {
      opacity: 1;
    }
  }

  &__label {
    transition: color 0.25s;

    .filters__item:has(:checked) & {
      color: var(--color-blue);
    }
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: none;
    padding: 0.375rem;

    @media (max-width: 47.9375rem) {
      display: block;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__apply {
    display: none;

    @media (max-width: 47.9375rem) {
      display: block;
    }
  }
}
</style>
