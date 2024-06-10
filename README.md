# Fashion Store

Верстка сайта магазина модной одежды.

Результат - https://dimox.github.io/fashion-store/

## Используемый стек

- Vue 3 `<script setup>` SFCs
- Vue Router
- Pinia
- TypeScript
- Vite
- ESLint
- Stylelint
- Bun как менеджер пакетов

## Особенности

- В качестве API для товаров задействован [fakestoreapi.com](https://fakestoreapi.com).
- Для кэширования запросов к API используется [TanStack Query](https://tanstack.com/query).
- Показан каталог товаров с пагинацией и фильтрацией по разным параметрам.
- Возможность добавлять товары в корзину и удалять их из нее. Для сохранения состояния корзины используются `Pinia` и `localStorage`.
- Анимация шапки при прокрутке страницы (работает только в браузерах, поддерживающих `animation-timeline`).
- Блок FAQ на тегах `details` и `summary` с анимацией.
- Блок отзывов с использованием [Swiper Element](https://swiperjs.com/element).
- Кнопка прокрутки вверх страницы (плавное появление/исчезновение реализовано с помощью `animation-timeline`).
- При добавлении в svg-спрайт новой иконки автоматически генерируется список типов для TypeScript.
- Адаптивная вёрстка.