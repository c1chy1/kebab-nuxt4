<template>
  <header id="header" class="flex bg-[url('/bg.png')] bg-no-repeat bg-center bg-cover h-screen">
    <swiper-container
        ref="containerRef"
        :init="false"
        class="md:block h-screen shadow-dark-lg background-dark-header transition-all duration-500 w-full"
      >
        <swiper-slide
          v-for="(slide, index) in kebabs"
          :key="slide"

          :data-swiper-autoplay="index === 0 ? 6000 : 4000"
          class="hero w-11/12"
        >
          <div
            class="h-screen xl:w-5/6 relative flex flex-col sm:flex-row items-center justify-center
                   text-center lg:text-left lg:justify-center lg:flex-row-reverse uppercase"
          >
            <div class="relative sm:w-1/2 xl:w-full">
              <nuxt-img
                  alt="kebab"
                preload
                fetchpriority="high"
                format="webp"
                quality="80"
                :src="slide"
                sizes="240px sm:280px md:350px xl:520px"
                width="812"
                height="671"
                loading="eager"
                class="logo-box mx-auto sm:w-full lg:mr-0 cursor-grab active:cursor-grabbing"
              />
              <div
                id="banner"
                class="absolute flex p-1 xl:p-2 items-center justify-center will-change-transform
                       size-18  right-[25%] top-[45%] 2xl:right-[35%] 2xl:top-[65%]
                       sm:size-22
                       md:size-24
                       xl:size-40
                       bg-[#ff6d00] rounded-full opacity-0"
              >
                <article
                  class="flex flex-col items-center justify-center w-full h-full
                         text-[22px] sm:text-[26px] md:text-[32px] 2xl:text-[58px] md:leading-[1.2]
                         border-2 border-dashed border-white rounded-full
                         text-white font-base font-bebas rotate-20"
                >
                  20% <span class="text-[16px] sm:text-[24px] md:text-[26px] 2xl:text-[40px] leading-5 2xl:leading-10">{{ $t('header.discount') }}</span>
                </article>
              </div>
            </div>

            <div ref="textRef" class="px-4 max-w-full sm:w-1/2 xl:w-full xl:text-left flex flex-col items-center lg:items-start">
              <p
                class="py-0 lg:py-2 lg:px-3 px-2 mb-4 text-[16px] md:text-[16px] lg:text-[20px]
                       xl:text-[24px] text-primary border-primary font-medium font-bebas border-dashed
                       border-2 xl:border-4 inline-block rounded-[3px]"
              >
                {{ $t('header.tagline') }}
              </p>
              <h1
                class="lg:mt-4 text-[38px] md:text-[44px] lg:text-[80px] xl:text-[94px] text-primary
                       font-alfa font-medium leading-none tracking-wider
                       drop-shadow-[4px_5px_#fee7ba] whitespace-pre-line overflow-hidden truncate
                       text-ellipsis"
              >
                {{ $t('header.title') }}
                <span class="text-[28px] md:text-[32px] xl:text-[56px] pt-4">{{ $t('header.subtitle') }}</span>
              </h1>
            </div>
          </div>
        </swiper-slide>
    </swiper-container>
  </header>
</template>
<script setup lang="ts">
const containerRef = ref(null)
const textRef = ref<HTMLElement[]>([])
useLocaleTransition(textRef, 'h1, p')

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
    delay: 8000,
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

const { introComplete } = useIntroState()
let bannerTimeline: gsap.core.Timeline | null = null

async function runAnimations() {
  const { default: gsap } = await import('gsap')

  gsap.fromTo('#header h1', { opacity: 0 }, { duration: 0.5, opacity: 1, delay: 0.3, ease: 'power3.inOut' })
  gsap.fromTo('#header img', { opacity: 0.5 }, { duration: 0.5, opacity: 1, ease: 'power3.inOut' })
  gsap.fromTo('#header p', { opacity: 0 }, { duration: 0.5, opacity: 1, delay: 0.2, ease: 'power3.inOut', stagger: 0.1 })
  gsap.fromTo(['#banner', '.shadow'], { opacity: 0 }, { opacity: 1, delay: 2 })

  const bannerEl = document.getElementById('banner')
  const bounceY = bannerEl ? bannerEl.offsetHeight * 0.75 : 80

  bannerTimeline = gsap.timeline({ repeat: -1, yoyo: true, delay: 2 })
  bannerTimeline
    .to('#banner', { duration: 0.65, y: bounceY, ease: 'power4.in' })
    .to('#banner', { duration: 0.08, scaleY: 0.6, scaleX: 1.2, transformOrigin: 'center bottom', ease: 'power2.out' }, '-=0.02')
}

onMounted(async () => {
  await nextTick()
  if (introComplete.value) {
    runAnimations()
  } else {
    const stop = watch(introComplete, (val) => {
      if (val) { runAnimations(); stop() }
    })
  }
})

onUnmounted(() => {
  bannerTimeline?.kill()
})
</script>
