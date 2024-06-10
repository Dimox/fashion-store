<template>
  <section class="new-arrivals">
    <div class="container">
      <h2 class="new-arrivals__title text-h1">New Arrivals</h2>
      <p class="new-arrivals__description">
        Discover the latest trends with our New Arrivals, featuring chic and stylish pieces to refresh your wardrobe.
        Stay ahead of fashion with our curated selection of the season's must-haves.
      </p>
      <ButtonTabs v-model="activeTab" class="new-arrivals__tabs" :options="tabs" />
      <div class="new-arrivals__cards">
        <Loader v-if="isLoading || isPlaceholderData" class="new-arrivals__loader" />
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <p v-if="isError" class="new-arrivals__error">Error: something went wrong</p>
      <Btn class="new-arrivals__more" tag="RouterLink" to="/catalog">View More</Btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import ProductCard from './ProductCard.vue'
import ButtonTabs from './ButtonTabs.vue'
import Btn from './Btn.vue'
import Loader from './Loader.vue'
import { fetchProducts } from '@/api/products'
import { ButtonTab } from '@/types'

const tabs = ref<ButtonTab[]>([
  { label: 'All', value: 'all' },
  { label: "Men's Fashion", value: "men's clothing" },
  { label: "Women's Fashion", value: "women's clothing" },
  { label: 'Jewelery', value: 'jewelery' },
])
const activeTab = ref<string>('all')

const PRODUCTS_LIMIT = 6
const apiPaths = {
  all: `products?limit=${PRODUCTS_LIMIT.toString()}`,
  category: (slug: string) => `products/category/${slug}?limit=${PRODUCTS_LIMIT.toString()}`,
}
const apiPath = ref(apiPaths.all)

const {
  isLoading,
  isPlaceholderData,
  isError,
  data: products,
} = useQuery({
  queryKey: ['products', apiPath],
  queryFn: () => fetchProducts(apiPath.value),
  placeholderData: previousData => previousData,
  gcTime: Infinity,
  refetchOnMount: false,
})

watch(activeTab, () => {
  apiPath.value = activeTab.value === 'all' ? apiPaths.all : apiPaths.category(activeTab.value)
})
</script>

<style lang="scss">
.new-arrivals {
  margin-bottom: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);

  &__title {
    margin-bottom: 1.5rem;
    color: var(--color-primary);
    text-align: center;
  }

  &__description {
    max-width: 50ch;
    margin-inline: auto;
    margin-bottom: clamp(2rem, 1.5081rem + 2.0986vw, 3.25rem);
    color: var(--color-secondary);
    text-align: center;
  }

  &__tabs {
    justify-content: center;
    margin-bottom: clamp(2rem, 1.5081rem + 2.0986vw, 3.25rem);
  }

  &__cards {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17.25rem, 1fr));
    gap: clamp(1rem, -2.0653rem + 7.0064vw, 3.75rem);
  }

  &__loader {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    background: rgba(var(--color-white-rgb), 0.9);
  }

  &__error {
    font-size: 1.125rem;
    color: var(--color-red);
    text-align: center;
  }

  &__more {
    display: block;
    width: fit-content;
    margin-inline: auto;
    margin-top: 3rem;
    padding-inline: 3.75rem;
  }
}
</style>
