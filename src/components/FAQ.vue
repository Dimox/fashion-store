<template>
  <section class="faq" :style="`--animation-duration: ${ANIMATION_DURATION}ms`">
    <div class="container">
      <h2 class="faq__title text-h1">Frequently Asked Questions</h2>
      <p class="faq__description">
        Have questions? We've got you covered. Browse through our FAQs or contact our support team for help.
      </p>
      <details
        v-for="(item, idx) in faq"
        :key="item.question"
        class="faq__item"
        :class="{ 'faq__item--open': item.openClass }"
        :open="item.open"
      >
        <summary class="faq__question" @click="onClick($event, item)">
          {{ item.question }}
          <Icon class="faq__arrow" name="chevron-down" />
        </summary>
        <div ref="answerRefs" class="faq__answer" :style="`--answer-height: ${setMaxHeight(idx)}px`">
          <div class="faq__text">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from './Icon.vue'
import { FAQ } from '@/types'

const minimizeSiblings = ref(true)
const ANIMATION_DURATION = 300 // milliseconds
const answerRefs = ref<HTMLDivElement[]>([])

const setMaxHeight = (idx: number) => answerRefs.value[idx]?.scrollHeight

const onClick = (event: Event, item: FAQ) => {
  event.preventDefault()
  const isAnimating = ref(true)
  item.openClass = !item.openClass

  if (item.open) {
    if (isAnimating.value) return
    setTimeout(function () {
      item.open = false
      isAnimating.value = false
    }, ANIMATION_DURATION)
  } else {
    item.open = true
  }

  if (!minimizeSiblings.value) return

  faq.value.map(el => {
    if (el === item) return
    el.openClass = false
    setTimeout(function () {
      el.open = false
    }, ANIMATION_DURATION)
  })
}

const faq = ref([
  {
    question: 'What sizes do you offer?',
    answer:
      'We offer a wide range of sizes from XS to XXL. Please refer to our size guide on each product page to find the best fit for you.',
    openClass: true,
    open: true,
  },
  {
    question: 'How do I track my order?',
    answer:
      "Once your order is shipped, you will receive a tracking number via email. You can use this number on our website's tracking page to monitor your shipment.",
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of delivery. Items must be in their original condition with tags attached. Please visit our Returns & Exchanges page for more details and to initiate a return.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. For more information, check our Shipping Information page.',
  },
  {
    question: 'How can I contact customer service?',
    answer:
      'Our customer service team is available Monday to Friday from 9 AM to 6 PM. You can reach us via email at support@fashion.store or by calling (123) 456-7890.',
  },
  {
    question: 'Do you offer gift cards?',
    answer:
      "Yes, we offer digital gift cards that can be purchased on our website. They are available in various denominations and are sent directly to the recipient's email.",
  },
  {
    question: 'How can I find out about new arrivals and promotions?',
    answer:
      'Subscribe to our newsletter and follow us on social media to stay updated on the latest arrivals, special offers, and exclusive promotions.',
  },
])
</script>

<style lang="scss">
.faq {
  margin-bottom: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);
  padding-block: clamp(3rem, 1.7211rem + 5.4565vw, 6.25rem);
  background: rgba(var(--color-black-rgb), 0.02);

  .container {
    --container-width: 50rem;
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

  &__item {
    border: 0 solid rgba(var(--color-black-rgb), 0.1);
    border-bottom-width: 0.0625rem;
    transition: var(--animation-duration);

    &:first-of-type {
      border-top-width: 0.0625rem;
    }
  }

  &__question {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0;
    font-size: clamp(1.125rem, 1.0758rem + 0.2099vw, 1.25rem);
    font-weight: 500;
    color: var(--color-primary);
    list-style: none; // remove default marker in Firefox
    cursor: pointer;
    transition: font-weight var(--animation-duration);

    &::-webkit-details-marker {
      display: none; // remove default marker in Chrome
    }

    .faq__item--open & {
      font-weight: 650;
      color: var(--color-black);
    }
  }

  &__arrow {
    flex-shrink: 0;
    pointer-events: none;
    transition: transform var(--animation-duration);

    .faq__item--open & {
      transform: rotate(180deg);
    }
  }

  &__answer {
    max-height: 0;
    overflow: hidden;
    transition: margin var(--animation-duration);
    animation: answerSlideUp var(--animation-duration);

    .faq__item--open & {
      max-height: var(--answer-height);
      animation: answerSlideDown var(--animation-duration);
    }
  }

  &__text {
    padding-bottom: 1.75rem;
  }
}

@keyframes answerSlideUp {
  0% {
    max-height: var(--answer-height);
    opacity: 1;
  }

  100% {
    max-height: 0;
    opacity: 0;
  }
}

@keyframes answerSlideDown {
  0% {
    max-height: 0;
    opacity: 0;
  }

  100% {
    max-height: var(--answer-height);
    opacity: 1;
  }
}
</style>
