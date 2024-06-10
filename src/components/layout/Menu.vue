<template>
  <nav class="menu">
    <ul class="menu__list">
      <li v-for="item in menu" :key="item.name" class="menu__item">
        <RouterLink :to="item.path" class="menu__link">
          {{ item.name }}
          <button v-if="item.name === 'Cart'" class="menu__cart" type="button">
            <Icon name="cart" />
            <span v-if="cartCounter" class="menu__cart-counter">{{ cartCounter }}</span>
          </button>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/store'
import Icon from '@/components/Icon.vue'

const cartStore = useCartStore()
const cartCounter = computed(() => cartStore.state.length)

const menu = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'Cart', path: '/cart' },
]
</script>

<style lang="scss">
.menu {
  &__list {
    display: flex;
    gap: 3rem;
    align-items: center;
  }

  &__link {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    color: var(--color-primary);

    &:hover {
      color: var(--color-blue);
    }
  }

  &__cart {
    position: relative;

    &-counter {
      position: absolute;
      top: -0.75rem;
      left: calc(100% - 0.125rem);
      display: grid;
      place-content: center;
      min-width: 1.5rem;
      min-height: 1.5rem;
      font-size: 0.75rem;
      color: var(--color-white);
      background: var(--color-red);
      border-radius: 50%;
    }
  }
}
</style>
