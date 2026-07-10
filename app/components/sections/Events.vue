<script setup lang="ts">
const { t } = useI18n()
const containerRef = ref(null)
const eventsRef = ref<HTMLElement>()

const hamburgers = computed(() => [
  { img: 'images/event/event_1.png', label: t('events.discover'), title: t('events.upcomingEvents'), desc: t('events.slide1desc') },
  { img: 'images/event/event_2.png', label: t('events.alwaysTasty'), title: t('events.chooseEnjoy'), desc: t('events.slide2desc') },
  { img: 'images/event/event_1.png', label: t('events.discover'), title: t('events.upcomingEvents'), desc: t('events.slide1desc') },
])

const swiper = useSwiper(containerRef, {
  effect: 'fade',
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 15,
})

const { realIndex } = swiper

useLocaleTransition(eventsRef, 'h2')
</script>

<template>
  <section id="events" ref="eventsRef" class="px-2 pt-10 lg:pt-40 sm:px-4 md:px-16 lg:px-20 lg:py-24 text-center space-y-6">
    <ClientOnly>
      <swiper-container
          ref="containerRef"
          :init="false"
          class="overflow-hidden shadow-xl"
      >
        <swiper-slide
            v-for="(slide, i) in hamburgers"
            :key="i"
            class="text-left events"
        >
          <div class=" flex flex-col-reverse lg:flex-row lg:items-stretch w-full p-2">
            <div class="w-full lg:w-1/2 px-2 py-8 lg:py-16 lg:pl-12 lg:pr-7">
              <h2 class="text-primary text-[29px] font-bebas uppercase">
                {{ slide.label }}
              </h2>
              <h2 class="text-primary text-[25px] lg:text-4xl mb-2.5 leading-tight font-medium font-alfa uppercase">
                {{ slide.title }}
              </h2>
              <p class="xl:text-[21px] xl:leading-8 py-6">
                {{ slide.desc }}
              </p>
            </div>
            <nuxt-img
                loading="lazy"
                format="webp"
                :src="slide.img"
                :alt="slide.title"
                width="659"
                height="440"
                class="w-full lg:w-1/2 object-cover"
            />
          </div>
        </swiper-slide>
      </swiper-container>
      <div class="pagination flex items-center justify-center lg:justify-start gap-3 mt-4">
        <button
          v-for="(_, i) in hamburgers"
          :key="i"
          @click="swiper.to(i)"
          :aria-label="`${$t('events.goToSlide')} ${i + 1}`"
          :aria-current="realIndex === i ? 'true' : undefined"
          class="w-4.25 h-4.25 rounded-full transition-colors duration-300 cursor-pointer"
          :class="realIndex === i ? 'bg-secondary' : 'bg-gray-300'"
        />
      </div>
    </ClientOnly>
  </section>
</template>

<style>
swiper-slide:not(.swiper-slide-active) {
  pointer-events: none;
}
</style>
