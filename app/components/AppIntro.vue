<script setup>
import { gsap } from 'gsap'

defineProps({ lang: String })
const emit = defineEmits(['fading', 'done'])
const root = ref()

onMounted(() => {
  const tl = gsap.timeline()

  tl.from('.intro-greeting', {
    y: -30,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out'
  })

  .from('.bun-top', {
    y: -200,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  })

      .from('.lettuce', {
        x: -200,
        opacity: 0,
        duration: 0.4
      }, '-=0.2')

      .from('.cheese', {
        scale: 0,
        rotation: 90,
        duration: 0.4,
        ease: 'back.out(2)'
      }, '-=0.2')

      .from('.patty', {
        x: 200,
        opacity: 0,
        duration: 0.5
      }, '-=0.2')

      .from('.bun-bottom', {
        y: 200,
        opacity: 0,
        duration: 0.6
      }, '-=0.3')

      .to('.burger', {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      })

      .to(root.value, {
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        onStart: () => emit('fading'),
        onComplete: () => emit('done')
      })
})
</script>

<template>
  <div
      ref="root"
      class="fixed inset-0 z-50 flex items-center justify-center bg-base-100"
  >
    <div class="flex flex-col items-center gap-8">
    <p class="intro-greeting font-bebas text-4xl sm:text-6xl tracking-widest text-primary">{{ $t('intro.greeting') }}</p>
    <div class="burger flex flex-col items-center gap-1">

      <!-- top bun -->
      <div class="bun-top w-28 h-8 sm:w-40 sm:h-10 bg-yellow-400 rounded-t-full shadow-md"></div>

      <!-- lettuce -->
      <div class="lettuce w-32 h-2 sm:w-44 sm:h-3 bg-green-500 rounded"></div>

      <!-- cheese -->
      <div class="cheese w-28 h-2 sm:w-40 bg-yellow-300 rounded"></div>

      <!-- patty -->
      <div class="patty w-30 h-5 sm:w-42 sm:h-6 bg-amber-800 rounded-md"></div>

      <!-- bottom bun -->
      <div class="bun-bottom w-28 h-6 sm:w-40 sm:h-8 bg-yellow-500 rounded-b-full shadow-md"></div>

    </div>
    </div>
  </div>
</template>

<style>
.burger > div {
  filter: drop-shadow(0 8px 10px rgba(0,0,0,0.2));
}

@keyframes steam {
  0% { transform: translateY(0); opacity: 0.4; }
  100% { transform: translateY(-20px); opacity: 0; }
}

</style>