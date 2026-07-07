<template>
  <header id="header" class="flex bg-[url('/bg.png')] bg-no-repeat bg-center bg-cover h-dvh">
    <swiper-container
        ref="containerRef"
        :init="false"
        class="md:block h-dvh shadow-dark-lg background-dark-header transition-all duration-500 w-full"
      >
        <swiper-slide
          v-for="(slide, index) in kebabs"
          :key="slide"

          :data-swiper-autoplay="index === 0 ? 6000 : 4000"
          class="hero w-11/12"
        >
          <div
            class="h-dvh xl:w-5/6 relative flex flex-col sm:flex-row items-center justify-center
                   text-center lg:text-left lg:justify-center lg:flex-row-reverse uppercase"
          >
            <div class="sm:w-1/2 xl:w-full">
              <nuxt-img
                  alt="kebab"
                preload
                fetchpriority="high"
                format="webp"
                quality="80"
                :src="slide"
                sizes="160px sm:280px md:350px xl:520px"
                width="812"
                height="671"
                loading="eager"
                class="logo-box mx-auto w-3/4 sm:w-full lg:mr-0 cursor-grab active:cursor-grabbing"
              />
              <div
                id="banner"
                class="hidden absolute xl:flex items-center h-26 w-26 min-w-26 min-h-26
                       md:h-40 md:w-40 md:min-w-40 md:min-h-40 xl:bottom-50 xl:right-30 p-2 md:p-2.5
                       bg-[#ff6d00] rounded-full [clip-path:circle(50%)] opacity-0"
              >
                <article
                  class="relative flex flex-col items-center justify-center w-full h-full p-2.5
                         text-[30px] md:text-[60px] md:leading-20 border-2 border-dashed border-white
                         rounded-full text-white font-base font-bebas transform rotate-20"
                >
                  20% <span class="text-[24px] md:text-[33px] leading-5">{{ $t('header.discount') }}</span>
                </article>
              </div>
            </div>

            <div ref="textRef" class="max-w-full sm:w-1/2 xl:w-full xl:text-left flex flex-col items-center lg:items-start">
              <p
                class="py-0 md:py-0 lg:py-2 lg:px-3 px-2 mb-4 text-[16px] md:text-[16px] lg:text-[20px]
                       xl:text-[24px] text-primary border-primary font-medium font-bebas border-dashed
                       border-4 inline-block rounded-[3px]"
              >
                {{ $t('header.tagline') }}
              </p>
              <h1
                class="lg:mt-4 text-[38px] md:text-[44px] lg:text-[80px] xl:text-[94px] text-primary
                       font-alfa font-medium flex flex-col leading-none tracking-wider
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

async function runAnimations() {
  const { default: gsap } = await import('gsap')
  gsap.fromTo(
      '#header h1',
      { opacity: 0, ease: 'power3.inOut' },
      { duration: 0.5, opacity: 1, delay: 0.3, ease: 'power3.inOut' }
  )

  gsap.fromTo(
      '#header img',
      { opacity: 0.5, ease: 'power3.inOut' },
      { duration: 0.5, opacity: 1, ease: 'power3.inOut' }
  )

  gsap.fromTo(
      '#header p',
      { y: 0, ease: 'power3.inOut' },
      { duration: 0.5, opacity: 1, y: 0, delay: 0.2, ease: 'power3.inOut', stagger: 0.1 }
  )

  gsap.fromTo(
      ['#banner', '.shadow'],
      { opacity: 0 },
      { opacity: 1, delay: 2 }
  )

  const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 2 })
  tl
      .to('#banner', { duration: 0.65, y: 150, ease: 'power4.in' })
      .to('#banner', {
        duration: 0.08,
        scaleY: 0.55,
        scaleX: 1.25,
        transformOrigin: 'center bottom',
        borderBottomLeftRadius: '30%',
        borderBottomRightRadius: '30%',
        ease: 'power2.out',
      }, '-=0.02')
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
</script>
