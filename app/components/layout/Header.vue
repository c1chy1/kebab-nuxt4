<template>
  <header id="header" class="flex bg-[url('/bg.png')] bg-no-repeat bg-center bg-cover h-screen">
    <swiper-container
        ref="containerRef"
        :init="false"
        class="md:block h-screen shadow-dark-lg background-dark-header transition-all duration-500 w-full"
      >
        <swiper-slide
          v-for="slide in kebabs"
          :key="slide"
          class="hero"
        >
          <div
            class="h-screen lg:px-12 xl:px-16 relative flex flex-col sm:flex-row items-center justify-center
                   text-center lg:text-left lg:justify-center lg:flex-row-reverse uppercase"
          >
            <div class="sm:w-1/2 xl:w-full">
              <nuxt-img
                preload
                format="webp"
                :src="slide"
                class="logo-box mx-auto w-3/4 sm:w-full lg:mr-0 xl:w-11/12 cursor-grab active:cursor-grabbing opacity-0"
              />
              <div
                id="banner"
                class="hidden absolute overflow-hidden xl:flex items-center h-26 w-26 min-w-26
                       md:h-40 md:min-w-40 xl:bottom-50 xl:right-30 p-2 md:p-2.5
                       bg-[#ff6d00] rounded-full object-cover opacity-0"
              >
                <article
                  class="relative flex flex-col items-center justify-center w-full h-full p-2.5
                         text-[30px] md:text-[60px] md:leading-20 border-2 border-dashed border-white
                         rounded-full text-white font-base font-bebas transform rotate-20"
                >
                  20% <span class="text-[24px] md:text-[33px] leading-5">Off</span>
                </article>
              </div>
            </div>

            <div class="max-w-full sm:w-1/2 xl:w-full xl:text-left flex flex-col items-center lg:items-start">
              <h3
                class="py-0 md:py-0 lg:py-2 lg:px-3 px-2 mb-4 text-[16px] md:text-[16px] lg:text-[20px]
                       xl:text-[24px] text-primary border-primary font-medium font-bebas border-dashed
                       border-2 inline-block rounded-[3px] opacity-0"
              >
                It is a good time for the great taste of kebabs
              </h3>
              <h1
                class="lg:mt-4 text-[38px] md:text-[44px] lg:text-[80px] xl:text-[94px] text-primary
                       font-alfa font-medium flex flex-col leading-none tracking-wider
                       drop-shadow-[4px_5px_#fee7ba] whitespace-pre-line overflow-hidden truncate
                       text-ellipsis transition-all duration-500 opacity-0"
              >
                Turkish
                <span class="text-[28px] md:text-[32px] xl:text-[56px] pt-4">Kebab</span>
              </h1>
            </div>
          </div>
        </swiper-slide>
    </swiper-container>
    <div class="absolute bottom-0 left-0 w-full leading-none pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" class="w-full h-12 md:h-20">
        <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="white"/>
      </svg>
    </div>
  </header>
</template>
<script setup lang="ts">
import gsap from 'gsap'

const containerRef = ref(null)

const kebabs = [
  'images/slides/1.png',
  'images/slides/1.png',
]

const swiper = useSwiper(containerRef, {
  slidesPerView: 1,
  loop: true,
  speed: 1000,
  effect: 'creative',
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  creativeEffect: {
    prev: {
      shadow: false,
      translate: ['-100%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
})

onMounted(async () => {
  await nextTick()

  gsap.fromTo(
      '#header h1',
      { opacity: 0, ease: 'power3.inOut' },
      { duration: 0.5, opacity: 1, delay: 1, ease: 'power3.inOut' }
  )

  gsap.fromTo(
      '#header img',
      { opacity: 0.5, ease: 'power3.inOut' },
      { duration: 0.5, opacity: 1, ease: 'power3.inOut' }
  )

  gsap.fromTo(
      '#header h3',
      { y: 0, ease: 'power3.inOut' },
      { duration: 0.5, opacity: 1, y: 0, delay: 0.7, ease: 'power3.inOut', stagger: 0.1 }
  )

  gsap.fromTo(
      ['#banner', '.shadow'],
      { opacity: 0 },
      { opacity: 1, delay: 3 }
  )

  const tl = gsap.timeline({ repeat: -1, delay: 3 })
  tl
      .to('#banner', { duration: 0.65, y: 150, ease: 'power2.in' })
      .to('#banner', {
        duration: 0.10,
        scaleY: 0.8,
        transformOrigin: 'center bottom',
        borderBottomLeftRadius: '40%',
        borderBottomRightRadius: '40%',
        ease: 'none',
      })
      .to('#banner', {
        duration: 0.10,
        scaleY: 1,
        transformOrigin: 'center bottom',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        ease: 'none',
      })
      .to('#banner', { duration: 0.65, y: 0, ease: 'power2.out' })
      .set('#banner', { clearProps: 'scaleY,transformOrigin,borderBottomLeftRadius,borderBottomRightRadius' })
})
</script>

<style scoped>
.shadow {
  width: 60px;
  height: 30px;
  background: radial-gradient(ellipse at center, rgba(88, 24, 69, 1) 0%, rgba(237, 237, 237, 0) 50%);
  transform: translateY(75px);
  z-index: -1;
}
</style>
