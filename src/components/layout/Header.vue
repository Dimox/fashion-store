<template>
  <header class="header">
    <div class="container">
      <RouterLink class="header__logo" to="/">Fashion Store</RouterLink>
      <Menu class="header__menu" />
      <div class="header__mobile-menu-wrapper">
        <button class="header__burger" type="button" @click.stop="isMobileMenuOpen = !isMobileMenuOpen">
          <Icon name="menu" />
        </button>
        <Menu class="header__mobile-menu" :class="{ 'header__mobile-menu--open': isMobileMenuOpen }" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon.vue'
import Menu from './Menu.vue'

const isMobileMenuOpen = ref(false)
document.addEventListener('click', () => (isMobileMenuOpen.value = false))
</script>

<style lang="scss">
body {
  @supports (animation-timeline: scroll()) {
    padding-top: clamp(4.25rem, 0.9053rem + 14.2707vw, 12.75rem);
  }
}

.header {
  padding-block: clamp(1rem, -0.328rem + 5.6663vw, 4.375rem);
  color: var(--color-primary);
  background: var(--color-white);

  @supports (animation-timeline: scroll()) {
    position: fixed;
    inset: 0 0 auto;
    z-index: 10;
    animation-name: header;
    animation-fill-mode: forwards;
    animation-range: 0 20vh;
    animation-timeline: scroll();
  }

  .container {
    display: flex;
    align-items: center;

    @media (max-width: 47.9375rem) {
      margin-block: -0.25rem;
    }
  }

  &__logo {
    font-family: var(--font-family-alt);
    font-size: clamp(1.75rem, 1.1598rem + 2.5184vw, 3.25rem);
    font-weight: normal;
    line-height: 1;

    @supports (animation-timeline: scroll()) {
      animation-name: logo;
      animation-fill-mode: forwards;
      animation-range: 0 20vh;
      animation-timeline: scroll();
    }

    &:hover {
      color: var(--color-black);
    }
  }

  &__menu {
    margin-left: auto;

    @media (max-width: 47.9375rem) {
      display: none;
    }
  }

  &__mobile-menu-wrapper {
    position: relative;
    display: none;
    margin-left: auto;

    @media (max-width: 47.9375rem) {
      display: block;
    }
  }

  &__burger {
    padding: 0.5rem;
    background: rgba(var(--color-black-rgb), 0.06);
  }

  &__mobile-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 10;
    display: none;
    color: var(--color-white);
    background: var(--color-secondary);

    &--open {
      display: block;
    }

    .menu__list {
      display: grid;
      gap: 0;
    }

    .menu__link {
      padding: 1rem 1.75rem;
      color: inherit;
    }
  }
}

@keyframes header {
  100% {
    padding-block: 1rem;
    font-size: 0.875rem;
    box-shadow: 0 1.5rem 2rem rgba(var(--color-black-rgb), 0.06);
  }
}

@keyframes logo {
  100% {
    font-size: 1.75rem;
  }
}
</style>
