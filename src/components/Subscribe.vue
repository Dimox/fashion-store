<template>
  <section class="subscribe">
    <div class="container">
      <div class="subscribe__body">
        <h2 class="subscribe__title text-h1">Subscribe To Our Newsletter</h2>
        <p class="subscribe__description">
          Sign up for our weekly newsletter to receive the latest fashion news, exclusive offers, and behind-the-scenes
          insights.
        </p>
        <form class="subscribe__form">
          <input class="subscribe__input" type="email" placeholder="Email Address" />
          <Btn class="subscribe__btn">Subscribe Now</Btn>
        </form>
      </div>
      <img
        class="subscribe__img subscribe__img--1"
        :src="img1"
        :srcset="`${img1x2} 2x`"
        width="355"
        height="747"
        alt=""
        loading="lazy"
      />

      <img
        class="subscribe__img subscribe__img--2"
        :src="img2"
        :srcset="`${img2x2} 2x`"
        width="337"
        height="747"
        alt=""
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Btn from './Btn.vue'
import img1 from '@/assets/img/subscribe-1.webp?url'
import img1x2 from '@/assets/img/subscribe-1@2x.webp?url'
import img2 from '@/assets/img/subscribe-2.webp?url'
import img2x2 from '@/assets/img/subscribe-2@2x.webp?url'
</script>

<style lang="scss">
.subscribe {
  margin-bottom: 3rem;

  .container {
    --container-width: 87.5rem;
    display: grid;
    grid-template-columns: auto 50% auto;

    @media (max-width: 47.9375rem) {
      grid-template-columns: 1fr;
    }
  }

  &__body {
    place-self: center;
  }

  &__title {
    margin-bottom: 1.5rem;
    color: var(--color-primary);
    text-align: center;
  }

  &__description {
    max-width: 50ch;
    margin-inline: auto;
    margin-bottom: 2rem;
    color: var(--color-secondary);
    text-align: center;
  }

  &__form {
    display: grid;
    place-items: center;
  }

  &__input {
    width: 100%;
    margin-bottom: 2rem;
    padding: clamp(1rem, 0.6557rem + 1.469vw, 1.875rem);
    font-size: clamp(1rem, 0.8524rem + 0.6296vw, 1.375rem);
    border: none;
    box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.01), 0 0.8125rem 0.4375rem 0 rgba(0, 0, 0, 0.02),
      0 2.0625rem 0.8125rem 0 rgba(0, 0, 0, 0.02), 0 3.9375rem 1.5625rem 0 rgba(0, 0, 0, 0.02),
      0 6.625rem 2.9375rem 0 rgba(0, 0, 0, 0.03), 0 10.1875rem 5rem 0 rgba(0, 0, 0, 0.04);

    &:focus {
      outline: 0.0625rem solid var(--color-blue);
    }

    &::placeholder {
      color: var(--color-secondary);
      opacity: 1;
    }
  }

  &__btn {
    padding-inline: 2.75rem;
  }

  &__img {
    @media (max-width: 47.9375rem) {
      display: none;
    }

    &--1 {
      grid-row: 1;
      grid-column: 1;
      padding-right: 1.5rem;
    }

    &--2 {
      justify-self: flex-end;
    }
  }
}
</style>
