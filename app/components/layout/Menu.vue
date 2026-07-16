<template>
  <section id="menu" ref="menuRef" class="px-2 pt-28 lg:pt-40 pb-12 sm:pb-20 min-h-screen text-center uppercase flex flex-col items-center justify-between gap-4">
    <p class="tagline text-[22px] text-secondary w-56 mb-7 mx-auto font-bebas bg-neutral inline-block py-4 xl:px-4">
      {{ $t('menu.tagline') }}
    </p>
    <h2 class="text-primary font-bold text-xl sm:text-4xl xl:text-5xl font-alfa uppercase">{{ $t('menu.title') }}</h2>
    <p class="text-sm xl:text-[17px] max-w-4xl mx-auto lowercase">
      {{ $t('menu.description') }}
    </p>

    <div class="relative flex items-center w-full">
      <button
          @click="swiper.prev()"
          class="swiper-preview hidden sm:flex shrink-0 z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white shadow-md hover:bg-orange-600 transition-colors duration-200 mx-1 lg:mx-3 cursor-pointer"
          aria-label="Previous"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <div class="flex-1 min-w-0 overflow-hidden relative">
        <!-- Mobile overlay nav buttons -->
        <button
            @click="swiper.prev()"
            class="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center w-9 h-9 rounded-full bg-primary/80 backdrop-blur-sm text-white shadow-lg active:scale-95 transition-transform cursor-pointer"
            aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button
            @click="swiper.next()"
            class="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center w-9 h-9 rounded-full bg-primary/80 backdrop-blur-sm text-white shadow-lg active:scale-95 transition-transform cursor-pointer"
            aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
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
                  :class="'card-' + getTitle(slide)"
                  class="card transition-all mx-auto h-full w-10/12"
              >
                <figure class="p-2 lg:p-4 xl:p-10 h-full cursor-grab active:cursor-grabbing">
                  <uiMenuImage :src="slide.img" :alt="getTitle(slide)" />
                </figure>
                <div class="card-body p-0 items-center text-center">
                  <h3 class="card-title text-primary text-2xl sm:text-4xl xl:mb-2.5 font-bebas uppercase">
                    {{ getTitle(slide) }}
                  </h3>
                  <p class="text-xs xl:text-[17px] leading-5 lowercase w-2/3 xl:w-full">
                    {{ getDescription(slide) }}
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
          class="swiper-next hidden sm:flex shrink-0 z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white shadow-md hover:bg-orange-600 transition-colors duration-200 mx-1 lg:mx-3 cursor-pointer"
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
const { locale } = useI18n()

const menuRef = ref<HTMLElement>()
useLocaleTransition(menuRef, 'p, h2, h3, button.button-orange')

const containerRef = ref(null)

if (!adminStore.products.length) {
  await adminStore.getProducts()
}

const hamburgers = computed(() => adminStore.products)

function getTitle(slide: any): string {
  const t = slide?.title
  if (!t) return ''
  if (typeof t === 'string') return t
  return t[locale.value] || t.en || (Object.values(t)[0] as string) || ''
}

function getDescription(slide: any): string {
  const d = slide?.description
  if (!d) return ''
  if (typeof d === 'string') return d
  return d[locale.value] || d.en || (Object.values(d)[0] as string) || ''
}

const isMobile = import.meta.client && window.innerWidth < 576

const swiper = useSwiper(containerRef, {
  loop: true,
  speed: 1000,
  touchStartPreventDefault: false,
  ...(isMobile ? { autoplay: { delay: 5000, disableOnInteraction: true } } : {}),
  breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 20 },
    640:  { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 2 },
    1536: { slidesPerView: 3 },
  },
  on: {},
})

</script>

<style>
swiper-slide .button-orange {
  pointer-events: auto;
  position: relative;
  z-index: 10;
  cursor: pointer;
}

swiper-container::part(wrapper) {
  align-items: flex-end;
}

</style>