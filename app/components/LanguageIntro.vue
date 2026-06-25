
<template>
  <div
      ref="root"
      class="fixed inset-0 flex items-center justify-center bg-base-100"
  >

    <div class="circle relative w-48 h-48 sm:w-72 sm:h-72">

      <button
          v-for="(lang, i) in languages"
          :key="lang.code"
          :class="[
          'flag-item absolute top-1/2 left-1/2 cursor-pointer',
          `flag-${lang.code}`
        ]"
          :style="{
          transform: `translate(-50%, -50%) rotate(${i * 90}deg) translate(${radius}px) rotate(-${i * 90}deg)`
        }"
          @click="select(lang)"
      >
        <Icon :name="lang.icon" :style="{ fontSize: flagSize + 'px' }" />
      </button>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const { setLocale } = useI18n()
const selected = ref(null)
const root = ref()
const radius = ref(130)
const flagSize = ref(100)

const languages = [
  { code: 'de', icon: 'circle-flags:de', color: '#000000' },
  { code: 'tr', icon: 'circle-flags:tr', color: '#E30A17' },
  { code: 'pl', icon: 'circle-flags:pl', color: '#DC143C' },
  { code: 'en', icon: 'circle-flags:gb', color: '#012169' },
]
function select(lang) {
  selected.value = lang.code
  setLocale(lang.code)

  const tl = gsap.timeline()

  tl.to(`.flag-${lang.code}`, {
    scale: 1.4,
    duration: 0.3,
    ease: 'back.out(2)'
  })

      .to('.flag-item', {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4
      })
      .to(root.value, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          window.dispatchEvent(
              new CustomEvent('language-selected', { detail: lang.code })
          )
        }
      })
}

onMounted(() => {
  if (window.innerWidth < 640) {
    radius.value = 82
    flagSize.value = 64
  }

  gsap.fromTo('.circle',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
  )
})
</script>

<style>
/* Hide circle before GSAP initializes to prevent SSR flash */
.circle {
  opacity: 0;
}

.flag-item {
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
}
</style>