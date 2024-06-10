<template>
  <div class="cart">
    <div class="container cart__container">
      <header class="cart__header">
        <h1 class="cart__title text-h2">Shopping Cart</h1>
        <Breadcrumbs current="Your Shopping Cart" />
      </header>
      <Loader v-if="isPending" />
      <p v-if="isError" class="cart__error">Error: something went wrong</p>
      <template v-if="products.length > 0">
        <table class="cart__table">
          <thead class="cart__thead">
            <tr>
              <th class="cart__th">Product</th>
              <th class="cart__th">Price</th>
              <th class="cart__th">Quantity</th>
              <th class="cart__th">Total</th>
            </tr>
          </thead>
          <tbody class="cart__items">
            <tr v-for="product in products" :key="product.id" class="cart__item">
              <td class="cart__td cart__td--product">
                <div class="cart__product">
                  <img class="cart__product-img" :src="product.image" :alt="product.title" />
                  <RouterLink class="cart__product-title" :to="`/product/${product.id}`">
                    {{ product.title }}
                  </RouterLink>
                  <button class="cart__remove" type="button" @click="removeProduct(product.id)">Remove</button>
                </div>
              </td>
              <td class="cart__td cart__td--price" data-label="Price">${{ product.price }}</td>
              <td class="cart__td cart__td--quantity" data-label="Quantity">
                <Quantity
                  v-model="product.quantity"
                  class="cart__quantity"
                  @update:model-value="updateProduct(product.id, $event)"
                />
              </td>
              <td class="cart__td cart__td--total" data-label="Total">${{ productTotalCost(product) }}</td>
            </tr>
          </tbody>
        </table>
        <footer class="cart__footer">
          <Checkbox v-model="wrapProduct" class="cart__wrap" label="For $10.00 please wrap the product" />
          <p class="cart__subtotal">
            <span>Subtotal</span>
            <span>${{ subtotalCost }}</span>
          </p>
          <Btn class="cart__checkout" tag="RouterLink" to="/checkout">Checkout</Btn>
        </footer>
      </template>
      <template v-else-if="!isPending && !isError">
        <div class="cart__empty">
          <p>Your shopping cart is empty</p>
          <Btn tag="RouterLink" to="/catalog">Shop Now</Btn>
        </div>
      </template>
    </div>
    <Subscribe />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Loader from '@/components/Loader.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Quantity from '@/components/form/Quantity.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import Btn from '@/components/Btn.vue'
import Subscribe from '@/components/Subscribe.vue'
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

const removeProduct = (id: number) => {
  cartStore.removeItem(id)
}

const wrapProduct = ref(false)
const wrapCost = computed(() => (wrapProduct.value ? 10 : 0))

const productTotalCost = (product: CartProduct) => parseFloat((product.price * product.quantity).toFixed(2))
const subtotalCost = computed(() => {
  const total = products.value.reduce((acc, product) => parseFloat((acc + productTotalCost(product)).toFixed(2)), 0)
  return total + wrapCost.value
})

const updateProduct = (id: number, quantity: number) => {
  cartStore.updateItem(id, quantity)
}
</script>

<style lang="scss">
.cart {
  &__container {
    margin-bottom: clamp(3.5rem, 2.2211rem + 5.4565vw, 6.75rem);
  }

  &__error {
    font-size: 1.125rem;
    color: var(--color-red);
    text-align: center;
  }

  &__header {
    margin-bottom: clamp(2rem, 1.0163rem + 4.1973vw, 4.5rem);
  }

  &__title {
    margin-bottom: 1.25rem;
    text-align: center;
  }

  &__table {
    width: 100%;
    margin-bottom: 2rem;
  }

  &__thead {
    @media (max-width: 47.9375rem) {
      display: none;
    }
  }

  &__th,
  &__td {
    padding-inline: 2rem;
    padding-bottom: 2rem;

    @media (max-width: 63.9375rem) {
      padding-inline: 1.25rem;
    }

    @media (max-width: 47.9375rem) {
      padding: 0;
    }

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
      text-align: right;

      @media (max-width: 47.9375rem) {
        text-align: left;
      }
    }
  }

  &__th {
    font-family: var(--font-family-alt);
    font-size: 1.375rem;
  }

  &__items {
    border: 0 solid rgba(var(--color-black-rgb), 0.4);
    border-width: 0.0625rem 0;
  }

  &__item {
    @media (max-width: 47.9375rem) {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem 0.5rem;
      justify-content: space-between;
      padding-block: 2rem;

      &:not(:first-child) {
        border-top: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
      }
    }
  }

  &__td {
    padding-top: 2rem;
    vertical-align: top;
    border-top: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);

    @media (max-width: 47.9375rem) {
      display: block;
      padding-top: 0;
      border: none;

      &::before {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        content: attr(data-label);
      }
    }

    .cart__item:first-child & {
      border: none;
    }

    &--product {
      @media (max-width: 47.9375rem) {
        flex-basis: 100%;
      }
    }

    &--price,
    &--quantity {
      width: 14rem;

      @media (max-width: 63.9375rem) {
        width: auto;
      }
    }

    &--total {
      width: 7rem;

      @media (max-width: 63.9375rem) {
        width: auto;
      }
    }
  }

  &__product {
    display: grid;
    grid-template: auto 1fr / auto 1fr;
    gap: 1rem 1.5rem;
    align-items: flex-start;
    justify-items: flex-start;

    @media (max-width: 47.9375rem) {
      grid-template-rows: auto auto;
      gap: 1rem;
    }

    &-img {
      grid-row: 1 / -1;
      width: 6rem;
      aspect-ratio: 1;
      object-fit: contain;
    }

    &-title {
      font-size: 1.25rem;
      font-weight: 550;

      @media (max-width: 47.9375rem) {
        align-self: flex-end;
        font-size: 1rem;
      }

      &:hover {
        color: var(--color-blue);
      }
    }
  }

  &__remove {
    color: var(--color-secondary);

    &:hover {
      color: var(--color-red);
    }
  }

  &__quantity {
    transform: translateY(-0.625rem);

    @media (max-width: 47.9375rem) {
      transform: none;
    }
  }

  &__footer {
    width: min(33rem, 100%);
    margin-left: auto;
  }

  &__wrap {
    --checked-color: var(--color-black);
  }

  &__subtotal {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    font-size: 1.125rem;
    font-weight: 550;
    border-top: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
  }

  &__checkout {
    width: 100%;
  }

  &__empty {
    display: grid;
    gap: 2rem;
    place-content: center;
  }
}
</style>
