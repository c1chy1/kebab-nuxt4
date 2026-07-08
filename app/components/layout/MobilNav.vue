<template>

  <div
      id="hamburger"
      @click="toggle()"
      :class="{open : open}"
      class="z-[60] lg:hidden w-6 h-4 sm:w-7 md:w-8 md:h-8 top-4 sm:top-5 lg:top-8 right-4 2xl:top-8 xl:right-8 absolute"
  >
    <span class="top-1  bg-[#3d2514]"></span>
    <span class="top-3  bg-[#3d2514]"></span>
    <span class="top-5  bg-[#3d2514]"></span>

  </div>
  <div class="menu-mobile right-0 top-0 cursor-pointer font-mont " id="menu-mobile">
    <div ref="bgMenu" class=" h-dvh px-6 bg-menu-mobile bg-accent " id="bg-menu-mobile">
      <div class="fixed w-full top-[100px] z-[3]">
      <ul ref="menuContainer" class="space-y-4 text-2xl sm:text-3xl pl-6">
        <li><a href="#header" @click.prevent="navClick('#header')">{{ $t('nav.home') }}</a></li>
        <li><a href="#menu" @click.prevent="navClick('#menu')">{{ $t('nav.menu') }}</a></li>
        <li><a href="#events" @click.prevent="navClick('#events')">{{ $t('nav.events') }}</a></li>
        <li><a href="#login" @click.prevent="navClick('#login')">{{ $t('nav.login') }}</a></li>
        <li><a href="#gallery" @click.prevent="navClick('#gallery')">{{ $t('nav.gallery') }}</a></li>
        <li><a href="#contact" @click.prevent="navClick('#contact')">{{ $t('nav.contact') }}</a></li>
        <li>
          <div class="flex items-center gap-4 pt-2">
            <button
              v-for="loc in allLocales"
              :key="loc.code"
              @click="switchLocale(loc.code)"
              class="flex flex-col items-center gap-0.5 transition-all duration-300"
              :class="locale === loc.code ? 'opacity-100 scale-110' : 'opacity-35 hover:opacity-60'"
            >
              <Icon :name="localeFlags[loc.code]" class="w-9 h-9 sm:w-10 sm:h-10" />
              <span class="text-[10px] tracking-widest uppercase font-bold">{{ loc.code }}</span>
            </button>
          </div>
        </li>
      </ul>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
const { gsap } = useGSAP();
const lenis = useLenis()
const { locale, locales, setLocale } = useI18n()

async function navClick(selector: string) {
  if (!open.value) {
    lenis.value?.scrollTo(selector, { offset: -80 })
    return
  }
  open.value = false
  const width = window.innerWidth
  const items = menuContainer.value?.querySelectorAll('li')

  gsap.to(items ?? [], {
    duration: 0.35,
    x: 0,
    stagger: 0.03,
    ease: 'expo.inOut',
  })
  await gsap.to(bgMenu.value!, {
    duration: 0.45,
    x: 0,
    delay: 0.1,
    ease: 'expo.inOut',
  })
  lenis.value?.scrollTo(selector, { offset: -80 })
}

const open = ref(false)
const menuContainer = ref<HTMLElement>()
const bgMenu = ref<HTMLElement>()

const localeFlags: Record<string, string> = {
  en: 'circle-flags:gb',
  de: 'circle-flags:de',
  pl: 'circle-flags:pl',
  tr: 'circle-flags:tr',
}

const allLocales = computed(() =>
  (locales.value as { code: string }[])
)

const isAnimating = ref(false)

async function switchLocale(code: string) {
  if (isAnimating.value || code === locale.value) return
  isAnimating.value = true
  setLocaleChanging(true)

  const navLinks = menuContainer.value?.querySelectorAll('li')

  await gsap.to(navLinks ?? [], {
    opacity: 0,
    duration: 0.2,
    stagger: 0.04,
    ease: 'power2.in',
  })

  await setLocale(code)
  setLocaleChanging(false)

  gsap.to(navLinks ?? [], {
    opacity: 1,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power2.out',
    onComplete: () => { isAnimating.value = false }
  })
}

function toggle() {
  if (!bgMenu.value || !menuContainer.value) return

  open.value = !open.value
  const width = window.innerWidth
  const items = menuContainer.value.querySelectorAll('li')

  if (open.value) {
    gsap.to(bgMenu.value, { duration: 0.7, x: -width, ease: 'expo.inOut' })
    gsap.to(items, { duration: 0.5, x: -width, delay: 0.2, stagger: 0.04, ease: 'expo.inOut' })
  } else {
    gsap.to(items, { duration: 0.35, x: 0, stagger: 0.03, ease: 'expo.inOut' })
    gsap.to(bgMenu.value!, { duration: 0.45, x: 0, delay: 0.1, ease: 'expo.inOut' })
  }
}

</script>
