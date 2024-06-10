<template>
  <svg class="icon" :width="width" :height="height">
    <use :xlink:href="iconUrl" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IconName } from '@/types/icons'
import spriteUrl from '@/assets/img/sprites/icons.svg?url'

const props = withDefaults(
  defineProps<{
    name: `${IconName}`
    width?: string | number
    height?: string | number
  }>(),
  {
    width: 20,
    height: 20,
  }
)

const iconUrl = computed(() => `${spriteUrl}#${props.name}`)
</script>
