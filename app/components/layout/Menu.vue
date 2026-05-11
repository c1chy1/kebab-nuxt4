<template>
  <section id="menu" class="pt-28 lg:pt-40 pb-12 sm:pb-20 text-center uppercase flex flex-col">
    <h5 class="text-[22px] text-secondary w-56 mb-7 mx-auto font-bebas !bg-neutral inline-block py-4 px-6">
      Always Tasty Burger
    </h5>
    <h2 class="section-title">Choose &amp; Enjoy</h2>
    <p class="text-sm xl:text-[17px] px-7 text-center lowercase">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
      <br class="hidden xl:block">
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
    </p>

    <div class="flex w-full">
      <swiper-container
        ref="containerRef"
        :init="false"
        class="swiper w-full"
      >
        <swiper-slide
          v-for="slide in hamburgers"
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
              <h2 class="card-title py-1 lg:py-2 text-3xl sm:text-[38px] text-primary font-bebas uppercase">
                {{ slide.price }} €
              </h2>
              <div class="card-actions">
                <button @click="cart.addItem(slide)" class="btn button-orange">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div class="box left-1/2 bottom-1/2 absolute z-[1000]" />
        </swiper-slide>
      </swiper-container>
    </div>
  </section>

  <div id="cartbox" class="select-none fixed container bg-red top-5 left-5 w-10 h-16 bg-cover z-[1000]" />
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/useCart'

const cart = useCartStore()

const containerRef = ref(null)

const hamburgers = ref([
  { id: 1, img: 'images/menu-slides/menu_1.png', title: 'Hamburger1', price: 11, countInStock: 9, qty: 1 },
  { id: 2, img: 'images/menu-slides/menu_2.png', title: 'Hamburger2', price: 12, countInStock: 9, qty: 1 },
  { id: 3, img: 'images/menu-slides/menu_3.png', title: 'Hamburger3', price: 10, countInStock: 9, qty: 1 },
  { id: 4, img: 'images/menu-slides/menu_4.png', title: 'Hamburger4', price: 13, countInStock: 9, qty: 1 },
  { id: 5, img: 'images/menu-slides/menu_2.png', title: 'Hamburger5', price: 15, countInStock: 9, qty: 1 },
  { id: 6, img: 'images/menu-slides/menu_3.png', title: 'Hamburger6', price: 12, countInStock: 9, qty: 1 },
])

const swiper = useSwiper(containerRef, {
  loop: true,
  speed: 1000,
  breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 20 },
    640:  { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 2 },
    1536: { slidesPerView: 3 },
  },
})
</script>
