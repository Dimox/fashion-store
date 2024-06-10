<template>
  <section class="instagram">
    <div class="container">
      <h2 class="instagram__title text-h1">Follow Us On Instagram</h2>
      <p class="instagram__description">
        Follow us on Instagram to stay informed about the latest fashion trends, new collections, and exclusive
        promotions.
      </p>
    </div>
    <div class="instagram__images">
      <img class="instagram__img" :src="img1" :srcset="`${img1x2} 2x`" width="320" height="308" alt="" loading="lazy" />
      <img class="instagram__img" :src="img2" :srcset="`${img2x2} 2x`" width="256" height="380" alt="" loading="lazy" />
      <img class="instagram__img" :src="img3" :srcset="`${img3x2} 2x`" width="256" height="308" alt="" loading="lazy" />
      <img class="instagram__img" :src="img4" :srcset="`${img4x2} 2x`" width="256" height="380" alt="" loading="lazy" />
      <img class="instagram__img" :src="img5" :srcset="`${img5x2} 2x`" width="256" height="308" alt="" loading="lazy" />
      <img class="instagram__img" :src="img6" :srcset="`${img6x2} 2x`" width="256" height="380" alt="" loading="lazy" />
      <img class="instagram__img" :src="img7" :srcset="`${img7x2} 2x`" width="320" height="308" alt="" loading="lazy" />
    </div>
  </section>
</template>

<script setup lang="ts">
import img1 from '@/assets/img/instagram-1.webp?url'
import img1x2 from '@/assets/img/instagram-1@2x.webp?url'
import img2 from '@/assets/img/instagram-2.webp?url'
import img2x2 from '@/assets/img/instagram-2@2x.webp?url'
import img3 from '@/assets/img/instagram-3.webp?url'
import img3x2 from '@/assets/img/instagram-3@2x.webp?url'
import img4 from '@/assets/img/instagram-4.webp?url'
import img4x2 from '@/assets/img/instagram-4@2x.webp?url'
import img5 from '@/assets/img/instagram-5.webp?url'
import img5x2 from '@/assets/img/instagram-5@2x.webp?url'
import img6 from '@/assets/img/instagram-6.webp?url'
import img6x2 from '@/assets/img/instagram-6@2x.webp?url'
import img7 from '@/assets/img/instagram-7.webp?url'
import img7x2 from '@/assets/img/instagram-7@2x.webp?url'
</script>

<style lang="scss">
.instagram {
  margin-bottom: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);
  overflow-x: hidden;

  &__title {
    margin-bottom: 1.5rem;
    color: var(--color-primary);
    text-align: center;
  }

  &__description {
    max-width: 50ch;
    margin-inline: auto;
    margin-bottom: clamp(2rem, 0.8195rem + 5.0367vw, 5rem);
    color: var(--color-secondary);
    text-align: center;
  }

  &__images {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__img {
    width: clamp(10rem, 19%, 16rem);

    &:first-child,
    &:last-child {
      width: clamp(10rem, 24%, 20rem);
    }
  }
}
</style>
