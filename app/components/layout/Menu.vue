<template>
  <section id="menu" ref="menuRef" class="pt-28 lg:pt-40 pb-12 sm:pb-20 text-center uppercase flex flex-col items-center gap-4">
    <h5 class="text-[22px] text-secondary w-fit mx-auto font-bebas bg-neutral py-4 px-6">
      {{ $t('menu.tagline') }}
    </h5>
    <h2 class="section-title">{{ $t('menu.title') }}</h2>
    <p class="text-sm xl:text-[17px] max-w-4xl mx-auto lowercase">
      {{ $t('menu.description') }}
    </p>

    <div class="relative flex items-center w-full">
      <button
        @click="swiper.prev()"
        class="hidden sm:flex shrink-0 z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white shadow-md hover:bg-orange-600 transition-colors duration-200 mx-1 lg:mx-3"
        aria-label="Previous"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <div class="flex-1 min-w-0 overflow-hidden">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          :init="false"
          class="swiper w-full"
        >
          <swiper-slide
            v-for="slide in (hamburgers ?? [])"
            :key="slide.id"
            class="hero pt-4 md:px-12"
          >
            <div
              :class="'card-' + slide.title"
              class="card transition-all mx-auto h-full w-10/12"
            >
              <figure class="p-2 lg:p-4 xl:p-10 h-full cursor-grab active:cursor-grabbing">
                <uiMenuImage :src="slide.img" />
              </figure>
              <div class="card-body p-0 items-center text-center">
                <h2 class="card-title text-2xl sm:text-4xl text-primary xl:mb-2.5 font-bebas uppercase">
                  {{ slide.title }}
                </h2>
                <p class="text-xs xl:text-[17px] leading-5 lowercase w-2/3 xl:w-full">
                  {{ $t(`menu.items.${slide.id}`) }}
                </p>
                <h2 class="card-title py-1 lg:py-2 text-3xl sm:text-[38px] text-primary font-bebas uppercase">
                  {{ slide.price }} €
                </h2>
                <div class="card-actions mt-auto">
                  <button class="button-orange" @click.stop="cart.addItem(slide)">
                    {{ $t('menu.buyNow') }}
                  </button>
                </div>
              </div>
            </div>
            <div class="box left-1/2 bottom-1/2 absolute z-[1000]" />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      </div>

      <button
        @click="swiper.next()"
        class="hidden sm:flex shrink-0 z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white shadow-md hover:bg-orange-600 transition-colors duration-200 mx-1 lg:mx-3"
        aria-label="Next"
      >
        <Icon name="heroicons:chevron-right" class="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
    </div>
  </section>

  <div id="cartbox" class="select-none fixed container bg-red top-5 left-5 w-10 h-16 bg-cover z-[1000]" />
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/useCart'
import { useAdminStore } from '@/stores/adminStore'

const cart = useCartStore()
const adminStore = useAdminStore()
const menuRef = ref<HTMLElement>()
useLocaleTransition(menuRef, 'h5, h2, button.button-orange')

const containerRef = ref(null)

if (!adminStore.products.length) {
  await adminStore.getProducts()
}

const hamburgers = computed(() => adminStore.products)

const swiper = useSwiper(containerRef, {
  loop: true,
  speed: 1000,
  touchStartPreventDefault: false,
  breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 20 },
    640:  { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 2 },
    1536: { slidesPerView: 3 },
  },
})

</script>

<style>
swiper-slide .button-orange {
  pointer-events: auto;
  position: relative;
  z-index: 10;
  cursor: pointer;
}
</style>
