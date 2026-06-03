<template>

  <div
      id="hamburger"
      @click="toggle()"
      :class="{open : open}"
      class=" lg:hidden  w-6 h-4 sm:w-7 md:w-8 md:h-8 top-4 sm:top-5  lg:top-8 right-4 2xl:top-8 xl:right-8 absolute"
  >
    <span class="top-1  bg-[#3d2514]"></span>
    <span class="top-3  bg-[#3d2514]"></span>
    <span class="top-5  bg-[#3d2514]"></span>

  </div>
  <div class="menu-mobile right-0 top-0 cursor-pointer font-mont " id="menu-mobile">
    <div ref="bgMenu" class=" h-dvh px-6 bg-menu-mobile bg-accent " id="bg-menu-mobile">
      <div class="fixed w-full top-[100px] z-[3]">
      <ul ref="menuContainer" class="space-y-4 text-2xl sm:text-3xl pl-6">
        <li><nuxt-link hash="#header" @click="toggle();scrollTo('#header')">{{ $t('nav.home') }}</nuxt-link></li>
        <li><nuxt-link hash="#menu" @click="toggle();scrollTo('#menu')">{{ $t('nav.menu') }}</nuxt-link></li>
        <li><nuxt-link hash="#events" @click="toggle();scrollTo('#events')">{{ $t('nav.events') }}</nuxt-link></li>
        <li><nuxt-link hash="#login" @click="toggle();scrollTo('#login')">{{ $t('nav.login') }}</nuxt-link></li>
        <li><nuxt-link hash="#gallery" @click="toggle();scrollTo('#gallery')">{{ $t('nav.gallery') }}</nuxt-link></li>
        <li><nuxt-link hash="#contact" @click="toggle();scrollTo('#contact')">{{ $t('nav.contact') }}</nuxt-link></li>
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

const scrollTo = (selector: string) => lenis.value?.scrollTo(selector, { offset: -80 })

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
    gsap.to(bgMenu.value, {
      duration: 0.7,
      x: -width,
      ease: 'expo.inOut',
    })
    gsap.to(items, {
      duration: 0.5,
      x: -width,
      delay: 0.2,
      stagger: 0.04,
      ease: 'expo.inOut',
    })
  } else {
    gsap.to(items, {
      duration: 0.5,
      x: 0,
      stagger: 0.04,
      ease: 'expo.inOut',
    })
    gsap.to(bgMenu.value!, {
      duration: 0.7,
      x: 0,
      delay: 0.2,
      ease: 'expo.inOut',
    })
  }
}

</script>

<style scoped>

#hamburger{

  z-index: 60;
}

#bg-menu-mobile {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 40;
  right: -100%;
  will-change: transform;
}

ul {
  list-style: none;
}

ul li {
  position: relative;
  left: 100%;
  cursor: pointer;
  will-change: transform;
}

/* hang burger */

#hamburger:hover span:nth-child(1) {
  -webkit-transition: .20s ease-in-out;
  -moz-transition: .20s ease-in-out;
  -o-transition: .20s ease-in-out;
  transition: .20s ease-in-out;
}

#hamburger:hover span:nth-child(3) {
  -webkit-transition: .16s ease-in-out;
  -moz-transition: .16s ease-in-out;
  -o-transition: .16s ease-in-out;
  transition: .16s ease-in-out;
}

#hamburger span {
  z-index: 3;
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  border-radius: 5px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .20s ease-in-out;
  -moz-transition: .20s ease-in-out;
  -o-transition: .20s ease-in-out;
  transition: .25s ease-in-out;
}


#hamburger.open span:nth-child(1) {
  top: 14px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#hamburger.open span:nth-child(2) {
  opacity: 0;
  left: -30px;
  -webkit-transition: .16s ease-in-out;
  -moz-transition: .16s ease-in-out;
  -o-transition: .16s ease-in-out;
  transition: .16s ease-in-out;
}

#hamburger.open span:nth-child(3) {
  top: 14px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
</style>
