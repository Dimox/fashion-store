<template>
  <section class="product">
    <Loader v-if="isPending" class="product__loader" />
    <p v-if="isError" class="product__error">Error: something went wrong</p>
    <div v-if="product" class="container product__container">
      <img class="product__img" :src="product.image" :alt="product.title" />
      <div class="product__details">
        <header class="product__header">
          <h1 class="product__title text-h3">{{ product.title }}</h1>
          <button class="product__favorite" type="button">
            <Icon name="star" />
          </button>
        </header>
        <div class="product__rating">
          <StarRating :rating="product.rating?.rate" />
          ({{ product.rating.count }} reviews)
        </div>
        <div class="product__price">
          <div class="product__price-new">${{ product.price }}</div>
          <div class="product__price-old">${{ getOldPrice(product.price) }}</div>
          <div class="product__price-save">Save {{ DISCOUNT }}%</div>
        </div>
        <p class="product__viewing">
          <Icon class="product__viewing-icon" name="eye" />
          24 people are viewing this right now
        </p>
        <div class="product__stock">
          <div class="product__stock-title">Only 9 items left in stock!</div>
          <div class="product__stock-value"></div>
        </div>
        <template v-if="product.category !== 'jewelery'">
          <div class="product__size">
            <p><span class="product__label">Size:</span> {{ activeSize }}</p>
            <div class="product__size-items">
              <label v-for="(size, idx) in sizes" :key="size" class="product__size-item">
                <input
                  class="product__size-input visually-hidden"
                  type="radio"
                  name="product-size"
                  :value="size"
                  :checked="idx === 0"
                  @change="activeSize = size"
                />
                <span class="product__size-value">{{ size }}</span>
              </label>
            </div>
          </div>
          <div class="product__color">
            <p><span class="product__label">Color:</span> {{ activeColor }}</p>
            <div class="product__color-items">
              <label v-for="(color, idx) in product.colors" :key="color" class="product__color-item">
                <input
                  class="product__color-input visually-hidden"
                  type="radio"
                  name="product-color"
                  :value="color"
                  :checked="idx === 0"
                  @change="activeColor = getColorName(color)"
                />
                <span class="product__color-value" :style="`--color: ${color}`" />
              </label>
            </div>
          </div>
        </template>
        <div class="product__actions">
          <Quantity v-model="quantity" label="Quantity" />
          <Btn v-if="!isProductInCart" type="secondary" @click="addToCart">Add to cart</Btn>
          <template v-else>
            <Btn type="secondary" @click="$router.push('/cart')">View Cart</Btn>
            <Btn @click="$router.push('/checkout')">Checkout</Btn>
          </template>
        </div>
        <div class="product__tools">
          <button v-for="tool in tools" :key="tool.name" class="product__tool" type="button">
            <Icon :name="tool.icon" />
            {{ tool.name }}
          </button>
        </div>
        <div class="product__info">
          <div class="product__info-item">
            <Icon class="product__info-icon" name="delivery" />
            <p>
              <span class="product__info-label">Estimated Delivery:</span>
              <span class="product__info-value">Jul 30 - Aug 03</span>
            </p>
          </div>
          <div class="product__info-item">
            <Icon class="product__info-icon" name="shipping" />
            <p>
              <span class="product__info-label">Free Shipping & Returns:</span>
              <span class="product__info-value">On all orders over $75</span>
            </p>
          </div>
        </div>
        <div class="product__payment">
          <img :src="paymentImg" width="320" height="21" alt="" loading="lazy" />
          <p>Guarantee safe & secure checkout</p>
        </div>
      </div>
    </div>
    <Subscribe />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store'
import { fetchProduct } from '@/api/products'
import { IconName } from '@/types/icons'
import Loader from '@/components/Loader.vue'
import StarRating from '@/components/StarRating.vue'
import Icon from '@/components/Icon.vue'
import Btn from '@/components/Btn.vue'
import Quantity from '@/components/form/Quantity.vue'
import Subscribe from '@/components/Subscribe.vue'
import paymentImg from '@/assets/img/payment.webp?url'
import { additionalData, colors } from '@/data'
import { Product } from '@/types'

const route = useRoute()
const id = Number(route.params.id)
const product = ref<Product>()
const DISCOUNT = 33
const getOldPrice = (price: number) => ((price * 100) / (100 - DISCOUNT)).toFixed(2)
const activeColor = ref('')
const getColorName = (color: string) => colors.find(item => item.value === color)?.name ?? ''

const {
  isPending,
  isError,
  data: fetchedProduct,
} = useQuery({
  queryKey: ['product', id],
  queryFn: () => fetchProduct(id),
  gcTime: Infinity,
  refetchOnMount: false,
})

const getProduct = (data: Product) => {
  const colors = additionalData.find(item => item.id === id)?.colors
  product.value = { ...data, colors }
  if (!product.value.colors) return
  activeColor.value = getColorName(product.value.colors[0])
}

watchEffect(() => {
  if (!fetchedProduct.value) return
  getProduct(fetchedProduct.value)
})

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const activeSize = ref(sizes[0])
const tools: { name: string; icon: `${IconName}` }[] = [
  { name: 'Compare', icon: 'compare' },
  { name: 'Ask a question', icon: 'question' },
  { name: 'Share', icon: 'share' },
]

const cartStore = useCartStore()
const quantity = ref(1)
const isProductInCart = computed(() => cartStore.state.some(item => item.id === product.value?.id))

watchEffect(() => {
  if (!product.value) return
  quantity.value = cartStore.state.find(item => item.id === id)?.quantity ?? 1
})

watch(
  quantity,
  newValue => {
    if (!product.value || !isProductInCart.value) return
    cartStore.updateItem(product.value.id, newValue)
  },
  { immediate: true }
)

const addToCart = () => {
  if (!product.value || isProductInCart.value) return
  cartStore.addItem(product.value.id, quantity.value)
}
</script>

<style lang="scss">
.product {
  --border-opacity: 0.1;

  &__error {
    font-size: 1.125rem;
    color: var(--color-red);
    text-align: center;
  }

  &__container {
    display: flex;
    gap: clamp(2rem, -2.1143rem + 8.5714vw, 5rem);
    align-items: flex-start;
    margin-bottom: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);

    @media (max-width: 47.9375rem) {
      display: block;
    }
  }

  &__img {
    width: clamp(18.75rem, 47%, 37.5rem);
    aspect-ratio: 1;
    margin-bottom: 2rem;
    padding: clamp(1rem, 0.213rem + 3.3578vw, 3rem);
    border: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
    object-fit: contain;

    @media (max-width: 63.9375rem) {
      width: 40%;
    }

    @media (max-width: 47.9375rem) {
      width: 100%;
      max-height: 15rem;
      padding: 0;
      border: none;
    }
  }

  &__details {
    flex-grow: 1;
  }

  &__header {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  &__title {
    flex-grow: 1;
  }

  &__favorite {
    display: grid;
    flex-shrink: 0;
    place-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 0.0625rem solid rgba(var(--color-black-rgb), var(--border-opacity));
    border-radius: 50%;
    transition: border 0.25s;

    &:hover {
      --border-opacity: 0.3;
    }
  }

  &__rating {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  &__price {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 2rem;

    &-new {
      font-size: 1.5rem;
    }

    &-old {
      color: var(--color-secondary);
      text-decoration: line-through;
    }

    &-save {
      padding: 0.125rem 0.5rem;
      font-size: 0.6875rem;
      color: var(--color-white);
      text-transform: uppercase;
      background: var(--color-red);
      border-radius: 5rem;
    }
  }

  &__viewing {
    display: flex;
    gap: 0.625rem;
    align-items: flex-start;
    margin-bottom: 2rem;
    color: var(--color-secondary);

    &-icon {
      margin-top: 0.125rem;
      color: var(--color-black);
    }
  }

  &__stock {
    margin-bottom: 2rem;

    &-title {
      margin-bottom: 0.75rem;
      color: var(--color-secondary);
    }

    &-value {
      display: flex;
      height: 0.375rem;
      background: rgba(var(--color-black-rgb), 0.1);
      border-radius: 0.25rem;

      &::after {
        width: 20%;
        content: '';
        background: var(--color-red);
        border-radius: 0.25rem;
      }
    }
  }

  &__label {
    font-weight: 600;
  }

  &__size {
    margin-bottom: 1.5rem;

    &-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
      margin-top: 0.75rem;
    }

    &-item {
      cursor: pointer;
    }

    &-value {
      display: grid;
      place-content: center;
      min-width: 2.75rem;
      height: 2.75rem;
      padding-inline: 0.5rem;
      letter-spacing: -0.0375rem;
      border: 0.0625rem solid rgba(var(--color-black-rgb), var(--border-opacity));
      border-radius: 0.3125rem;
      transition: border 0.25s;

      &:hover {
        --border-opacity: 0.3;
      }

      .product__size-input:checked + & {
        color: var(--color-white);
        background: var(--color-black);
      }
    }
  }

  &__color {
    margin-bottom: 2rem;

    &-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
      margin-top: 0.75rem;
    }

    &-item {
      display: grid;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
    }

    &-value {
      background: var(--color);
      border: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
      border-radius: 50%;

      .product__color-input:checked + & {
        border-color: var(--color-black);
        box-shadow: inset 0 0 0 0.25rem var(--color-white);
      }
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-end;
    margin-bottom: 4rem;

    @media (max-width: 63.9375rem) {
      gap: 1.5rem;
    }

    .btn {
      flex-grow: 1;
    }
  }

  &__tools {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 2rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 0.0625rem solid rgba(var(--color-black-rgb), 0.1);
  }

  &__tool {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    &:hover {
      color: var(--color-blue);
    }
  }

  &__info {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 2rem;

    &-item {
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
    }

    &-icon {
      flex-shrink: 0;
    }

    &-label {
      margin-right: 0.375rem;
      font-weight: 600;
    }
  }

  &__payment {
    display: grid;
    gap: 1.25rem;
    place-items: center;
    padding: 1.25rem;
    text-align: center;
    background: rgba(var(--color-black-rgb), 0.026);
    border-radius: 0.3125rem;
  }
}
</style>
