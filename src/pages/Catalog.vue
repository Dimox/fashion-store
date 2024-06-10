<template>
  <div ref="catalogRef" class="catalog">
    <div class="catalog__wrapper">
      <div class="container">
        <header class="catalog__header">
          <h1 class="catalog__title text-h2">Catalog</h1>
          <Breadcrumbs />
          <Btn class="catalog__toggle-filters" @click="openFilters">Filters</Btn>
        </header>
        <div class="catalog__body">
          <Filters
            v-model="filters"
            class="catalog__filters"
            :class="{ 'catalog__filters--open': isFiltersOpen }"
            @close="closeFilters"
          />
          <div class="catalog__main">
            <div class="catalog__cards">
              <Loader v-if="isLoading || isPlaceholderData" class="new-arrivals__loader" />
              <CatalogCard v-for="product in products" :key="product.id" :product="product" />
            </div>
            <p v-if="isError" class="catalog__error">Error: something went wrong</p>
            <Pagination v-model="currentPage" class="catalog__pagination" :max-pages="maxPages" />
          </div>
        </div>
      </div>
    </div>
    <Instagram />
    <Subscribe />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watchEffect } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Btn from '@/components/Btn.vue'
import CatalogCard from '@/components/CatalogCard.vue'
import Loader from '@/components/Loader.vue'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'
import Instagram from '@/components/Instagram.vue'
import Subscribe from '@/components/Subscribe.vue'
import { fetchProducts } from '@/api/products'
import { Product, FiltersT } from '@/types'
import { scrollIntoView } from '@/utils'
import { additionalData } from '@/data'

const catalogRef = ref<HTMLDivElement | null>(null)
const PRODUCTS_LIMIT = 6
const products = ref<Product[]>([])
const currentPage = ref(1)
const maxPages = ref(0)
const rangeStart = computed(() => (currentPage.value - 1) * PRODUCTS_LIMIT)
const rangeEnd = computed(() => rangeStart.value + PRODUCTS_LIMIT)
const isFiltersOpen = ref(false)

const {
  isLoading,
  isPlaceholderData,
  isFetched,
  isError,
  data: fetchedProducts,
} = useQuery({
  queryKey: ['catalog', currentPage],
  queryFn: () => fetchProducts('products'),
  placeholderData: previousData => previousData,
  gcTime: Infinity,
  refetchOnMount: false,
})

const getProducts = (data: Product[], filters?: FiltersT[]) => {
  data = data
    .filter(product => product.category !== 'electronics')
    .map(product => {
      const data = additionalData.find(item => item.id === product.id)
      if (data) {
        const { colors, tag } = data
        return { ...product, colors, tag }
      }
      return product
    })

  if (filters?.length) {
    filters.forEach(filter => {
      data = data.filter(product => {
        return filter.items.some(item => {
          if (filter.name === 'Categories' && 'value' in item) {
            return item.value === product.category
          }
          if (filter.name === 'Colors' && 'value' in item) {
            return product.colors?.includes(item.value)
          }
          if (filter.name === 'Prices' && 'min' in item) {
            return product.price >= item.min && product.price <= item.max
          }
          if (filter.name === 'Tags' && 'value' in item) {
            return product.tag === item.value
          }
        })
      })
    })
  }

  products.value = data.slice(rangeStart.value, rangeEnd.value)
  maxPages.value = Math.max(1, Math.ceil(data.length / PRODUCTS_LIMIT))
  if (maxPages.value < currentPage.value) currentPage.value = 1
  if (isFetched.value && catalogRef.value) scrollIntoView(catalogRef.value)
}

if (fetchedProducts.value) {
  getProducts(fetchedProducts.value)
}

const filters = ref<FiltersT[]>([])
const activeFilters = computed(() => {
  return filters.value
    .filter(filter => {
      return filter.items.some(item => item.checked)
    })
    .map(filter => {
      return {
        name: filter.name,
        items: filter.items.filter(item => item.checked),
      }
    }) as FiltersT[]
})

watchEffect(() => {
  if (!fetchedProducts.value) return
  getProducts(fetchedProducts.value, activeFilters.value)
})

const openFilters = () => {
  isFiltersOpen.value = true
  document.documentElement.classList.add('overflow')
}

const closeFilters = () => {
  isFiltersOpen.value = false
  document.documentElement.classList.remove('overflow')
}
</script>

<style lang="scss">
.catalog {
  scroll-margin: 13rem;

  &__wrapper {
    margin-bottom: clamp(3rem, 2.4098rem + 2.5184vw, 4.5rem);
    padding-bottom: clamp(3rem, 2.4098rem + 2.5184vw, 4.5rem);
    box-shadow: 0 1.25rem 3.25rem 0 rgba(var(--color-black-rgb), 0.03);
  }

  &__header {
    display: grid;
    gap: 1.25rem;
    margin-bottom: clamp(1.5rem, 0.3195rem + 5.0367vw, 4.5rem);
  }

  &__title {
    text-align: center;
  }

  &__toggle-filters {
    display: none;
    margin-inline: auto;

    @media (max-width: 47.9375rem) {
      display: block;
    }
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
  }

  &__filters {
    width: clamp(12rem, 25%, 17.5rem);

    @media (max-width: 47.9375rem) {
      position: fixed;
      inset: 0;
      z-index: 100;
      width: 100%;
      padding: 1rem;
      overflow: auto;
      background: var(--color-white);
      transition: transform 0.3s ease-in;
      transform: translateX(100%);

      &--open {
        transition-timing-function: ease-out;
        transform: translateX(0);
      }
    }
  }

  &__main {
    flex: 1;
  }

  &__cards {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));
    gap: 2.625rem 1.5rem;
  }

  &__error {
    font-size: 1.125rem;
    color: var(--color-red);
    text-align: center;
  }

  &__pagination {
    margin-top: 3rem;
  }
}
</style>
