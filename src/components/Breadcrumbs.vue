<template>
  <div class="breadcrumbs">
    <RouterLink class="breadcrumbs__link" to="/">Home</RouterLink>
    <Icon name="chevron-right" width="10" height="10" />
    {{ current || $route.name }}
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue'

defineProps<{
  current?: string
}>()
</script>

<style lang="scss">
.breadcrumbs {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;

  &__link {
    color: var(--color-primary);

    &:hover {
      color: var(--color-blue);
    }
  }
}
</style>
