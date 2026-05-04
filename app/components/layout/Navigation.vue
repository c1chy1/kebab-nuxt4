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
            <nuxt-link hash="#header" @click="$scrollTo('#header')">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#menu" @click="$scrollTo('#menu')">Menu</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#events" @click="$scrollTo('#events')">Events</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#gallery" @click="$scrollTo('#gallery')">Gallery</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#register" @click="$scrollTo('#login')">Log In</nuxt-link>
          </li>
          <li>
            <nuxt-link hash="#contact" @click="$scrollTo('#contact')">Contact Us</nuxt-link>
          </li>

          <li>
            <button ref="scrollToTop" @click="$scrollToTop" class="scroll-top-button">
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
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ScrollToTop from "~/components/ui/ScrollToTop.vue";

const {$scrollToTop, $scrollTo} = useNuxtApp()
const {$gsap} = useNuxtApp()
const navbar = ref()
const menu = ref()
const mobilNav = ref()
const scrollToTop = ref()


onMounted(() => {


  $gsap.registerPlugin(ScrollTrigger);


  $gsap.to(scrollToTop.value, {
    opacity: 0,
    xPercent: 200,

  })
  $gsap.to(mobilNav.value, {
    opacity: 0,
  })

  $gsap.set(navbar.value, {
    yPercent: 0
  })

  const tl = $gsap.timeline({
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

  }).to(scrollToTop.value, {
    xPercent: 0,
    opacity: 1,
    backgroundColor: '#006b00'
  })
})
</script>
<style scoped>
.nav-bg {
}
</style>