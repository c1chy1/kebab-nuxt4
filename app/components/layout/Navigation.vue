<template>
  <header class=" w-full fixed z-10">
    <nav ref="navbar" class="navbar  w-5/6 lg:w-full fixed z-50
bg-repeat-round  lg:px-12 xl:px-16  font-bebas">
      <div class="navbar-start flex-row py-4  w-full md:w-1/2 lg:w-1/4">
        <UiLogo
            color="Green"
            label="Burger House"
            text-size="text-base lg:text-2xl xl:text-4xl"
            svg-size="w-10 lg:w-12 xl:w-16"
            src="/logo.png"
            format="webp"
            class="space-x-4 flex justify-center items-center"
        />
      </div>
      <div class="navbar-end lg:flex items-end flex-col  text-primary  w-full">
        <div class="hidden sm:flex items-center pr-20 space-x-5 lg:pt-6 lg:pr-9 ">
          <img class="animate-shake delay-500" src="/delivery-icon.png">
          <h3 class=" text-xs md:text-sm lg:text-base text-center font-semibold font-mont py-5 tracking-wider transition-all duration-500">
            Call for Delivery +4 450 68 7474</h3>
        </div>
        <ul ref="menu"
            class="menu menu-horizontal  hidden lg:flex justify-end gap-4 py-0 px-1 lg:text-[18px] xl:text-[24px] tracking-[3px] xl:tracking-[4px] relative uppercase transition-all duration-500">
          <li>
            <nuxt-link hash="#header" @click="scrollTo('#header')">{{ $t('nav.home') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#menu" @click="scrollTo('#menu')">{{ $t('nav.menu') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#events" @click="scrollTo('#events')">{{ $t('nav.events') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#gallery" @click="scrollTo('#gallery')">{{ $t('nav.gallery') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#login" @click="scrollTo('#login')">{{ $t('nav.login') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#contact" @click="scrollTo('#contact')">{{ $t('nav.contact') }}</nuxt-link>
          </li>

          <li class="relative" ref="langSwitcher">
            <div class="dropdown dropdown-end">
              <button tabindex="0" class="flex items-center gap-1.5 px-2 hover:bg-transparent focus:bg-transparent">
                <Icon :name="currentFlag" class="w-6 h-6" />
                <span class="text-sm lg:text-base">{{ locale.toUpperCase() }}</span>
                <svg class="w-3 h-3 fill-current opacity-70" viewBox="0 0 10 6">
                  <path d="M0 0l5 6 5-6z"/>
                </svg>
              </button>
              <ul tabindex="0" class="dropdown-content menu bg-base-100/10 backdrop-blur-sm border border-white/10 rounded-lg p-1 mt-2 w-28 shadow-xl">
                <li v-for="loc in availableLocales" :key="loc.code">
                  <button
                    @click="switchLocale(loc.code)"
                    class="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors w-full text-left"
                    :class="{ 'text-primary font-bold': locale === loc.code }"
                  >
                    <Icon :name="localeFlags[loc.code]" class="w-6 h-6" />
                    <span class="text-sm tracking-widest">{{ loc.code.toUpperCase() }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <button ref="scrollToTopBtn" @click="scrollToTop()" class="scroll-top-button">
              <UiScrollToTop class="fill-white w-4"/>
            </button>
          </li>
        </ul>
      </div>

    </nav>

    <div ref="mobilNav"
         class=" opacity-0 nav-bg w-full h-16  lg:h-[7.5rem] bg-[url('/bg.png')]  duration-1000 xl:duration-750 transition-all filter-dark absolute">
      <LayoutMobilNav/>
    </div>
  </header>
</template>


<script setup lang="ts">
const { gsap, lazyLoadPlugin } = useGSAP();
const { locale, locales, setLocale } = useI18n()

const lenis = useLenis()

const scrollTo = (selector: string) => lenis.value?.scrollTo(selector, { offset: -80 })
const scrollToTop = () => lenis.value?.scrollTo(0)

const navbar = ref<HTMLElement>()
const menu = ref<HTMLElement>()
const mobilNav = ref<HTMLElement>()
const scrollToTopBtn = ref<HTMLElement>()
const langSwitcher = ref<HTMLElement>()

const localeFlags: Record<string, string> = {
  en: 'circle-flags:gb',
  de: 'circle-flags:de',
  pl: 'circle-flags:pl',
  tr: 'circle-flags:tr',
}

const availableLocales = computed(() =>
  (locales.value as { code: string }[]).filter(l => l.code !== locale.value)
)

const currentFlag = computed(() => localeFlags[locale.value] ?? 'circle-flags:un')

const isAnimating = ref(false)

async function switchLocale(code: string) {
  if (isAnimating.value || code === locale.value) return
  isAnimating.value = true

  const navItems = menu.value?.querySelectorAll('li a, li nuxt-link')

  await gsap.to(navItems ?? [], {
    opacity: 0,
    y: -8,
    duration: 0.25,
    stagger: 0.04,
    ease: 'power2.in',
  })

  await setLocale(code)

  gsap.fromTo(
    navItems ?? [],
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
      onComplete: () => { isAnimating.value = false }
    }
  )
}

onMounted(async () => {
  await lazyLoadPlugin("ScrollTrigger");

  gsap.set(scrollToTopBtn.value, {
    opacity: 0,
    xPercent: 200,
  })
  gsap.set(mobilNav.value, {
    opacity: 0,
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      start: 'top+=50',
      end: 'top+=100',
      toggleActions: 'play none reverse none',
      scrub: 2
    }
  })
  tl.to("#hamburger", {
    opacity: 1,

  })
  tl.to(mobilNav.value, {
    opacity: 1,

  }).to(navbar.value, {
    yPercent: -15

  }).to(menu.value, {

    x: -50

  }).to(scrollToTopBtn.value, {
    xPercent: 0,
    opacity: 1,
    backgroundColor: '#006b00'
  })
})
</script>
