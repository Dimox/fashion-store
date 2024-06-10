<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <p class="footer__title text-h3">Fashion Store</p>
        <Menu class="footer__menu" />
      </div>
      <p class="footer__copyright">Copyright © {{ new Date().getFullYear() }} All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Menu from './Menu.vue'
</script>

<style lang="scss">
.footer {
  padding-block: 2.5rem;
  color: var(--color-primary);
  text-align: center;
  border-top: 0.0625rem solid rgba(var(--color-black-rgb), 0.13);

  @media (max-width: 47.9375rem) {
    padding-block: 2rem;
  }

  &__top {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;

    @media (max-width: 47.9375rem) {
      flex-direction: column;
      justify-content: center;
      margin-bottom: 2rem;
    }
  }

  &__title {
    font-size: 1.75rem;
  }

  .footer__menu {
    @media (max-width: 47.9375rem) {
      .menu__list {
        gap: 2.5rem;
      }
    }
  }

  &__copyright {
    font-size: 0.875rem;
  }
}
</style>
