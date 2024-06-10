<template>
  <div>
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
</script>
