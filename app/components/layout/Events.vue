<script setup lang="ts">
const containerRef = ref(null)

const hamburgers = [
  { img: 'images/event/event_1.png', label: 'Discover', title: 'Upcoming Events' },
  { img: 'images/event/event_2.png', label: 'Always Tasty', title: 'Choose & Enjoy' },
  { img: 'images/event/event_1.png', label: 'Discover', title: 'Upcoming Events' },
]

const swiper = useSwiper(containerRef, {
  effect: 'fade',
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 15,
  pagination: {
    clickable: true,
  },
})
</script>

<template>
  <section id="events" class="px-2 pt-30 lg:pt-40 sm:px-4 md:px-16 lg:px-20 lg:py-24 text-center space-y-6">
    <swiper-container
      ref="containerRef"
      :init="false"
      class="overflow-hidden hero shadow-xl relative"
      style="
        --swiper-pagination-bullet-width: 17px;
        --swiper-pagination-bullet-height: 17px;
        --swiper-pagination-color: #ff6d00;
        --swiper-pagination-bullet-horizontal-gap: 6px;
      "
    >
      <swiper-slide
        v-for="slide in hamburgers"
        :key="slide.title"
        class="text-left bg-white"
      >
        <div class="hero-content flex-col-reverse lg:flex-row lg:items-start lg:max-w-full">
          <div class="w-full lg:w-1/2 py-8 lg:py-16 lg:pl-12 lg:pr-7">
            <h2 class="text-[29px] text-primary font-bebas uppercase">
              {{ slide.label }}
            </h2>
            <h2 class="text-[36px] lg:text-[42px] mb-2.5 text-primary leading-tight font-medium font-alfa uppercase">
              {{ slide.title }}
            </h2>
            <p class="xl:text-[21px] xl:leading-8 py-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
              lacus vel facilisis.
            </p>
          </div>
          <nuxt-img
            loading="lazy"
            format="webp"
            :src="slide.img"
            class="w-full lg:w-1/2"
          />
        </div>
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .swiper-container {
    --swiper-pagination-bottom: 4rem;
    --swiper-pagination-left: 4.5rem;
    --swiper-pagination-text-align: left;
  }
}
</style>
