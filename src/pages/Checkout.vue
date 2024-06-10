<template>
  <div class="checkout">
    <header class="checkout__header">
      <div class="container">
        <h1 class="checkout__title text-h2">Checkout</h1>
      </div>
    </header>
    <div class="checkout__body">
      <div class="container">
        <div class="checkout__wrapper">
          <form class="checkout__form">
            <section class="checkout__section">
              <h2 class="checkout__section-title text-h3">Contact</h2>
              <input class="checkout__input checkout__input--wide" type="email" placeholder="Email Address" />
            </section>
            <section class="checkout__section">
              <h2 class="checkout__section-title text-h3">Delivery</h2>
              <div class="checkout__group">
                <input class="checkout__input checkout__input--wide" type="text" placeholder="Country / Region" />
                <input class="checkout__input" type="text" placeholder="First Name" />
                <input class="checkout__input" type="text" placeholder="Last Name" />
                <input class="checkout__input checkout__input--wide" type="text" placeholder="Address" />
                <input class="checkout__input" type="text" placeholder="City" />
                <input class="checkout__input" type="text" placeholder="Postal Code" />
              </div>
              <Checkbox class="checkout__save" label="Save this info for future" />
            </section>
            <section class="checkout__section">
              <h2 class="checkout__section-title text-h3">Payment</h2>
              <div class="checkout__group">
                <input class="checkout__input checkout__input--wide" type="text" placeholder="Card Number" />
                <input class="checkout__input" type="text" placeholder="Expiration Date" />
                <input class="checkout__input" type="text" placeholder="Security Code" />
                <input class="checkout__input checkout__input--wide" type="text" placeholder="Card Holder Name" />
              </div>
              <Checkbox class="checkout__save" label="Save this info for future" />
            </section>
            <Btn class="checkout__submit">Pay Now</Btn>
          </form>
          <div class="checkout__summary">
            <Loader v-if="isPending" />
            <p v-if="isError" class="checkout__error">Error: something went wrong</p>
            <div v-if="products.length > 0" class="checkout__products">
              <div v-for="product in products" :key="product.id" class="checkout__product">
                <div class="checkout__product-image">
                  <img class="checkout__product-img" :src="product.image" :alt="product.title" />
                  <div class="checkout__product-quantity">{{ product.quantity }}</div>
                </div>
                <RouterLink class="checkout__product-title" :to="`/product/${product.id}`">
                  {{ product.title }}
                </RouterLink>
                <div class="checkout__product-price">${{ product.price }}</div>
              </div>
            </div>
            <form v-if="!discount" class="checkout__discount" @submit.prevent="applyDiscount">
              <input
                v-model="discountCode"
                class="checkout__discount-input"
                type="text"
                placeholder="Discount code"
                minlength="5"
                required
              />
              <Btn class="checkout__discount-btn" submit>Apply</Btn>
            </form>
            <p class="checkout__summary-item">
              Subtotal
              <span class="checkout__summary-value">${{ subtotalCost }}</span>
            </p>
            <p class="checkout__summary-item">
              Shipping
              <span class="checkout__summary-value">$40.00</span>
            </p>
            <p v-if="discount" class="checkout__summary-item">
              Discount
              <span class="checkout__summary-value">${{ discount }}</span>
            </p>
            <p class="checkout__summary-item">
              Total
              <span class="checkout__summary-value checkout__summary-value--total">${{ totalCost }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Subscribe />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Btn from '@/components/Btn.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import Subscribe from '@/components/Subscribe.vue'
import Loader from '@/components/Loader.vue'
import { fetchProducts } from '@/api/products'
import { Product, CartProduct } from '@/types'
import { useCartStore } from '@/store'

const products = ref<CartProduct[]>([])
const cartStore = useCartStore()

const {
  isPending,
  isError,
  data: fetchedProducts,
} = useQuery({
  queryKey: ['cart'],
  queryFn: () => fetchProducts('products'),
  gcTime: Infinity,
  refetchOnMount: false,
})

const getProducts = (data: Product[]) => {
  const cartMap = new Map(cartStore.state.map(item => [item.id, item.quantity]))
  products.value = data
    .filter(product => cartMap.has(product.id))
    .map(product => {
      const quantity = cartMap.get(product.id) ?? 1
      return { ...product, quantity }
    })
}

if (fetchedProducts.value) {
  getProducts(fetchedProducts.value)
}

watchEffect(() => {
  if (!fetchedProducts.value) return
  getProducts(fetchedProducts.value)
})

const discountCode = ref('')
const discount = ref<string | null>()
const applyDiscount = () => (discount.value = parseFloat('15').toFixed(2))

const subtotalCost = computed(() => {
  const total = products.value.reduce(
    (acc, product) => parseFloat((acc + product.price * product.quantity).toFixed(2)),
    0
  )
  return total
})
const shippingCost = 40
const totalCost = computed(() => subtotalCost.value + shippingCost - (discount.value ? parseFloat(discount.value) : 0))
</script>

<style lang="scss">
.checkout {
  overflow-x: clip;

  &__header {
    border-bottom: 0.0625rem solid rgba(var(--color-black-rgb), 0.4);

    @media (max-width: 63.9375rem) {
      border: none;
    }
  }

  &__title {
    margin-bottom: clamp(1.5rem, 1.0081rem + 2.0986vw, 2.75rem);
    text-align: center;
  }

  &__body {
    margin-bottom: clamp(3.5rem, 2.4179rem + 4.617vw, 6.25rem);
    border-bottom: 0.0625rem solid rgba(var(--color-black-rgb), 0.4);

    @media (max-width: 63.9375rem) {
      border: none;
    }
  }

  &__wrapper {
    display: flex;

    @media (max-width: 63.9375rem) {
      display: grid;
      gap: 3rem;
    }
  }

  &__form {
    flex-basis: 53%;
    padding-block: 5rem;
    padding-right: clamp(1.5rem, -6.9211rem + 13.1579vw, 4rem);

    @media (max-width: 63.9375rem) {
      order: 1;
      padding: 0;
    }
  }

  &__section {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 3.75rem;

    @media (max-width: 63.9375rem) {
      gap: 1rem;
      margin-bottom: 2rem;
    }

    &-title {
      color: var(--color-primary);
    }
  }

  &__input {
    flex-grow: 1;
    padding: 1.5rem 1.75rem;
    border: 0.0625rem solid var(--color-secondary);
    transition: 0.25s;
    transition-property: border, box-shadow;

    &:focus {
      border-color: var(--color-black);
      outline: none;
      box-shadow: inset 0 0 0 0.0625rem var(--color-black);
    }

    &--wide {
      width: 100%;
    }

    &::placeholder {
      color: var(--color-secondary);
      opacity: 1;
    }
  }

  &__group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__submit {
    width: 100%;
  }

  &__summary {
    position: relative;
    z-index: 0;
    flex: 1;
    min-width: 0;
    padding-block: 4rem;
    padding-left: clamp(1.5rem, -6.9211rem + 13.1579vw, 4rem);
    background: rgba(var(--color-black-rgb), 0.02);

    @media (max-width: 63.9375rem) {
      padding: 1.5rem;
    }

    &::before {
      position: absolute;
      inset: 0 -50vw 0 100%;
      z-index: -1;
      content: '';
      background: rgba(var(--color-black-rgb), 0.02);

      @media (max-width: 63.9375rem) {
        display: none;
      }
    }

    &-item {
      display: flex;
      justify-content: space-between;
      color: var(--color-primary);

      &:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }

    &-value {
      &--total {
        font-weight: 550;
        color: var(--color-black);
      }
    }
  }

  &__error {
    margin-bottom: 2rem;
    font-size: 1.125rem;
    color: var(--color-red);
  }

  &__products {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 30rem) {
      gap: 2rem;
    }
  }

  &__product {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    @media (max-width: 30rem) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    &-image {
      position: relative;
      flex-shrink: 0;
      background: var(--color-white);
    }

    &-quantity {
      position: absolute;
      top: -0.75rem;
      right: -0.75rem;
      display: grid;
      place-content: center;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.75rem;
      color: var(--color-white);
      background: var(--color-red);
      border-radius: 50%;
    }

    &-img {
      width: 7rem;
      aspect-ratio: 1;
      padding: 0.5rem;
      border: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
      object-fit: contain;
    }

    &-title {
      font-size: 1.125rem;
      font-weight: 500;

      @media (max-width: 47.9375rem) {
        font-size: 1rem;
      }

      &:hover {
        color: var(--color-blue);
      }
    }

    &-price {
      margin-left: auto;

      @media (max-width: 30rem) {
        margin: 0;
      }
    }
  }

  &__discount {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (max-width: 30rem) {
      display: grid;
    }

    &-input {
      flex: 1;
      min-width: 0;
      padding: 1rem 1.5rem;
      border: none;
      transition: box-shadow 0.25s;

      &::placeholder {
        color: var(--color-secondary);
        opacity: 1;
      }

      &:focus {
        outline: none;
        box-shadow: inset 0 0 0 0.0625rem var(--color-secondary);
      }
    }

    &-btn {
      min-width: 10rem;
    }
  }
}
</style>
