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
    <div ref="bgMenu" class=" h-screen px-4 bg-menu-mobile bg-accent " id="bg-menu-mobile">
      <ul ref="menu" class="space-y-2  w-full fixed">
        <li><nuxt-link hash="#header" @click="toggle();$scrollTo('#header')" >Home</nuxt-link></li>
        <li><nuxt-link hash="#menu" @click="toggle();$scrollTo('#menu')"  >Menu</nuxt-link></li>
        <li><nuxt-link hash="#events" @click="toggle();$scrollTo('#events')">Events</nuxt-link></li>
        <li><nuxt-link hash="#login" @click="toggle();$scrollTo('#login')">Log In</nuxt-link></li>
        <li><nuxt-link hash="#gallery" @click="toggle();$scrollTo('#gallery')">Gallery</nuxt-link></li>
        <li><nuxt-link hash="#contact" @click="toggle();$scrollTo('#contact')">Contact Us</nuxt-link></li>
      </ul>
    </div>
  </div>


</template>

<script setup lang="ts">
const { gsap } = useGSAP();
const { $scrollTo } = useNuxtApp()

const open = ref(false)
const menu = ref<HTMLElement>()
const bgMenu = ref<HTMLElement>()

function toggle() {
  if (!bgMenu.value || !menu.value) return

  open.value = !open.value
  const width = window.innerWidth
  const items = menu.value.querySelectorAll('li')

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
  top: 100px;
  list-style: none;
  z-index:3;
}

ul li {

  position: relative;
  left:100%;
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