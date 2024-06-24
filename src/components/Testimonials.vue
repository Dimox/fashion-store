<template>
  <section class="testimonials">
    <div class="container">
      <h2 class="testimonials__title text-h1">This Is What Our Customers Say</h2>
      <p class="testimonials__description">
        Our customers love our fashion-forward collections, praising the unique styles and high-quality materials. Read
        their testimonials to see why our brand is a favorite among trendsetters worldwide!
      </p>
      <swiper-container ref="swiper" class="testimonials__swiper" init="false">
        <swiper-slide v-for="testimonial in testimonials" :key="testimonial.name" class="testimonials__slide">
          <TestimonialCard class="testimonials__card" :testimonial="testimonial" />
        </swiper-slide>
      </swiper-container>
      <div class="testimonials__arrows">
        <button class="testimonials__arrow" type="button" @click="swiper.swiper.slidePrev()">
          <Icon name="chevron-left" />
        </button>
        <button class="testimonials__arrow" type="button" @click="swiper.swiper.slideNext()">
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { register, SwiperContainer } from 'swiper/element'
import { EffectCreative } from 'swiper/modules'
import TestimonialCard from './TestimonialCard.vue'
import Icon from './Icon.vue'
import { Testimonial } from '@/types'

import person1 from '@/assets/img/person-1.webp?url'
import person1x2 from '@/assets/img/person-1@2x.webp?url'
import person2 from '@/assets/img/person-2.webp?url'
import person2x2 from '@/assets/img/person-2@2x.webp?url'
import person3 from '@/assets/img/person-3.webp?url'
import person3x2 from '@/assets/img/person-3@2x.webp?url'
import person4 from '@/assets/img/person-4.webp?url'
import person4x2 from '@/assets/img/person-4@2x.webp?url'
import person5 from '@/assets/img/person-5.webp?url'
import person5x2 from '@/assets/img/person-5@2x.webp?url'

register()

const swiper = ref()
const params = {
  modules: [EffectCreative],
  rewind: true,
  speed: 400,
  initialSlide: 1,
  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: ['-35.6%', 0, -405],
    },
    next: {
      translate: ['35.6%', 0, -405],
    },
  },
}

onMounted(() => {
  const swiperContainer = swiper.value as SwiperContainer
  Object.assign(swiperContainer, params)
  swiperContainer.initialize()
})

const testimonials: Testimonial[] = [
  {
    name: 'Suzan B.',
    status: 'UI Designer',
    img: person1,
    img2x: person1x2,
    rating: 4.5,
    quote: "Items That I ordered were the best investment I ever made. I can't say enough about your quality service.",
  },
  {
    name: 'James K.',
    status: 'Traveler',
    img: person2,
    img2x: person2x2,
    rating: 5,
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
  },
  {
    name: 'Megen W.',
    status: 'UI Designer',
    img: person3,
    img2x: person3x2,
    rating: 4,
    quote:
      'Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.',
  },
  {
    name: 'Emily J.',
    status: 'Fashion Blogger',
    img: person4,
    img2x: person4x2,
    rating: 5,
    quote:
      "I've been a loyal customer for years, and this store never disappoints! The quality of the clothing is consistently excellent, and the designs are always on trend.",
  },
  {
    name: 'Michael T.',
    status: 'Professional Stylist',
    img: person5,
    img2x: person5x2,
    rating: 4,
    quote:
      "As a professional stylist, I am always on the lookout for brands that offer both style and quality, and this store has it all. It's a go-to destination for anyone serious about fashion.",
  },
]
</script>

<style lang="scss">
.testimonials {
  margin-bottom: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);
  padding-block: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem) 3.75rem;
  overflow-x: clip;
  background: rgba(var(--color-black-rgb), 0.02);

  @media (max-width: 47.9375rem) {
    padding-bottom: 3rem;
  }

  .container {
    --container-width: 87.5rem;
  }

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

  &__swiper {
    margin-bottom: 2rem;

    &::part(container) {
      overflow: visible;
    }
  }

  &__slide {
    height: auto;
    padding-inline: clamp(0rem, -34.6963rem + 61.6822vw, 16.5rem);
    overflow: visible;
  }

  &__card {
    transition: 0.4s;
    transition-property: opacity, box-shadow;

    @media (max-width: 63.9375rem) {
      opacity: 0;
    }
  }

  .swiper-slide-prev &__card,
  .swiper-slide-next &__card {
    box-shadow: 0 0.9375rem 2.8125rem 0 rgba(46, 33, 61, 0.08);
  }

  .swiper-slide-active &__card {
    box-shadow: 0 1.25rem 3.75rem 0 rgba(46, 33, 61, 0.08);
    opacity: 1;
  }

  &__arrows {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  &__arrow {
    display: grid;
    place-content: center;
    width: 3rem;
    height: 3rem;
    background: var(--color-white);
    border-radius: 50%;
    box-shadow: 0 0.25rem 0.875rem 0.0625rem rgba(var(--color-black-rgb), 0.16);
  }
}
</style>
