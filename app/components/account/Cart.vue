
<template>


  <div id="cart" ref="cart" v-if="cartItems"
       class="fixed bottom-0 right-0 z-[10000] opacity-0  max-w-xl w-1/2  sm:w-1/3  lg:w-1/4 2xl:w-1/5 shadow-2xl shadow-black  font-mont shadow-dark-sm">

    <div class="text-xs text-white bg-white transition-colors duration-700 rounded-lg overflow-hidden">
      <div id="cartTrigger"
           class="draggable transition-colors duration-700 flex items-center justify-center gap-x-2 px-2 py-3  bg-secondary">
        <button
            id="cartButton"
            :aria-label="$t('cart.toggleCart')"
            class="draggable -left-4 lg:-left-6  top-1  p-1.5  sm:p-2  lg:p-3.5 transition-all duration-700 flex border-2 border-[#b9cf21] dark:border-[#0F172A] bg-secondary  hover:bg-purple-500 absolute   rounded-full text-white hover:rotate-45">
          <Icon name="heroicons:squares-2x2" class="w-4 h-4" aria-hidden="true" />
        </button>

        <h1 class=" sm:text-sm lg:text-lg font-bold"
        >{{ $t('cart.title') }}</h1>
        <span class="relative overflow-hidden inline-block align-middle">
          <Transition :name="countTransition">
            <span :key="cartStore.totalCount" class="xl:text-base whitespace-nowrap block">
              ({{ cartStore.totalCount }} {{ $t('cart.items') }})
            </span>
          </Transition>
        </span>
      </div>

      <transition-group name="list" tag="ul" ref="items" class="py-2 px-0 text-black text-xs md:text-sm lg:text-base xl:text-lg">
        <li
            v-for="item in cartItems"
            :key="item.id"
            class="relative overflow-hidden border-b border-gray-100 last:border-0"
            @touchstart.passive="startSwipe($event, item)"
            @touchmove="moveSwipe($event, item)"
            @touchend="endSwipe($event, item)"
            @touchcancel="cancelSwipe($event, item)"
        >
          <div class="absolute inset-0 bg-red-500 flex items-center justify-between px-3 pointer-events-none sm:hidden">
            <Icon name="heroicons:trash" class="w-5 h-5 text-white" />
            <Icon name="heroicons:trash" class="w-5 h-5 text-white" />
          </div>
          <div :data-swipe-id="item.id" class="swipe-content flex items-center w-full px-1 py-1 bg-white will-change-transform">
            <NuxtImg
                :src="item.img"
                :alt="`${$t('cart.imageAlt')} ${item.title}`"
                class="img-fluid rounded w-12 sm:w-20 lg:w-24 xl:w-32 h-10 sm:h-12 lg:h-16 xl:h-24 shrink-0"/>
            <div class="text-black flex-1 mx-2 sm:mx-3 lg:mx-4 min-w-0">
              <h2 class="font-bold text-xs 2xl:text-base text-black">{{ item.title }}</h2>
              <div class="grid grid-cols-2 items-center mt-0.5">
                <span>{{ item.price }}€</span>
                <div class="flex justify-center">
                  <select ref="select" class="border-2 border-black rounded-xl px-0.5 lg:px-1 cursor-pointer"
                          v-model="item.qty">
                    <option v-for="x in item.countInStock" :key="x" :value="x">{{ x }}</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- Trash: only on non-touch devices -->
            <Icon v-if="!isTouch" name="heroicons:trash"
                  class="text-4xl mr-2 shrink-0 cursor-pointer self-center text-[#DC691D]"
                  @click="cartStore.removeItem(item)" />
          </div>
        </li>
      </transition-group>
      <div class="px-4 py-2 bg-secondary transition-colors duration-700">

        <div class="flex justify-between items-center">
          <span class="text-xs lg:text-sm">{{ $t('cart.delivery') }}</span>
          <span class="text-xs lg:text-sm">{{ cartStore.shippingPrice }} € </span>
        </div>
        <div class="flex justify-between items-center">

          <span class="font-bold lg:text-base xl:text-xl">{{ $t('cart.total') }}</span>
          <span class="font-bold lg:text-base xl:text-xl">{{ cartStore.total }} € </span>
        </div>

        <button
            @click="placeOrderHandler"
            class="block w-full mt-2 bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          {{ $t('cart.checkout') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useCartStore} from '@/stores/useCart'
import {cartItems} from "@/stores/useCart";
const cartStore = useCartStore()
const { t } = useI18n()

const countTransition = ref('count-up')

watch(() => cartStore.totalCount, (newVal, oldVal) => {
  countTransition.value = newVal > oldVal ? 'count-up' : 'count-down'
})

watch(() => cartItems.value?.length, (newLen, oldLen) => {
  if (newLen === oldLen || oldLen === undefined) return
  const trigger = document.getElementById('cartTrigger')
  if (!trigger) return
  const inner = trigger.querySelectorAll('h1, #cartTrigger > span')

  if (newLen > oldLen) {
    gsap.timeline()
      .to(inner, { y: -20, opacity: 0.2, duration: 0.2, ease: 'power2.in' })
      .to(inner, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' })
  } else {
    gsap.fromTo(inner,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }
    )
  }
})
import gsap from 'gsap'

import Draggable from 'gsap/Draggable'

const cart = ref()
const items = ref()
const select = ref()
useLocaleTransition(cart, 'h1, #cartTrigger > span, .bg-secondary button:not(#cartButton)')

const isTouch = ref(false)
onMounted(() => {
  isTouch.value = window.matchMedia('(hover: none) and (pointer: coarse)').matches
})

// Swipe-to-delete (mobile only)
const SWIPE_THRESHOLD = 72
const swipe = reactive({ startX: 0, startY: 0, id: null as any, horizontal: null as boolean | null })

function getSwipeEl(e: TouchEvent): HTMLElement | null {
  return (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.swipe-content')
}

function startSwipe(e: TouchEvent, item: any) {
  swipe.startX = e.touches[0].clientX
  swipe.startY = e.touches[0].clientY
  swipe.id = item.id
  swipe.horizontal = null
}

function moveSwipe(e: TouchEvent, item: any) {
  if (swipe.id !== item.id) return
  const dx = e.touches[0].clientX - swipe.startX
  const dy = e.touches[0].clientY - swipe.startY

  if (swipe.horizontal === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
    swipe.horizontal = Math.abs(dx) > Math.abs(dy)
  }
  if (!swipe.horizontal) return

  e.preventDefault()
  const el = getSwipeEl(e)
  if (el) gsap.set(el, { x: dx })
}

function endSwipe(e: TouchEvent, item: any) {
  if (swipe.id !== item.id) return
  const dx = e.changedTouches[0].clientX - swipe.startX
  const el = getSwipeEl(e)
  swipe.id = null

  if (swipe.horizontal && Math.abs(dx) > SWIPE_THRESHOLD) {
    const direction = dx > 0 ? '100%' : '-100%'
    if (el) gsap.to(el, { x: direction, duration: 0.2, ease: 'power2.in', onComplete: () => cartStore.removeItem(item) })
  } else {
    if (el) gsap.to(el, { x: 0, duration: 0.25, ease: 'power2.out' })
  }
  swipe.horizontal = null
}

function cancelSwipe(e: TouchEvent, item: any) {
  const el = getSwipeEl(e)
  if (el) gsap.to(el, { x: 0, duration: 0.2 })
  swipe.id = null
  swipe.horizontal = null
}
let tl: gsap.core.Timeline
let mm: gsap.MatchMedia
let closedPositionW = 0

watch(() => cartStore.shouldOpen, (val) => {
  if (!val || !cart.value || !items.value) return
  if (gsap.getProperty(cart.value, 'x') === closedPositionW) {
    tl.to(items.value.$el, 0.3, { backgroundColor: 'white' })
      .to(cart.value, 0.3, { x: 0 })
      .to(cart.value, 0.3, { height: 'auto', ease: 'power3.inOut' })
  }
  cartStore.shouldOpen = false
})

async function placeOrderHandler() {
  try {
    const order = {
      orderItems: cartItems.value,
      totalPrice: cartStore.total
    }
    await cartStore.placeOrder(order)
    cartStore.clearCart()
  } catch (error: any) {
    await Promise.all([
      import('vue3-toastify/dist/index.css'),
      import('~/assets/css/toastify.css'),
    ])
    const { toast } = await import('vue3-toastify')
    toast.error(t(error.data.statusMessage ?? error.data.message))
  }
}


onMounted(async () => {
  gsap.registerPlugin(Draggable)
  tl = gsap.timeline()
  mm = gsap.matchMedia()

  closedPositionW = cart.value.offsetWidth - 35

  tl.set(cart.value, {
    x: closedPositionW
  }).set(cart.value, {
    height: "2.5rem", ease: "power3.inOut",
  })

  mm.add("(max-width: 575px)", () => {

    tl.set(cart.value, {
      x: closedPositionW
    }).set(cart.value, {
      height: "2.5rem",
      opacity: 1
    })
  })
  mm.add("(min-width: 576px)", () => {
    tl.set(cart.value, {
      x: closedPositionW
    }).set(cart.value, {
      height: "3.5rem",
      opacity: 1
    })
  })
  await nextTick()
  const drag = Draggable.create(cart.value, {
      type: "x",
      zIndexBoost: true,
      throwProps: true,
      edgeResistance: 0.9,
      trigger: ['#cartButton', '#cartTrigger'],
      maxDuration: 0.3,
      bounds: {maxX: closedPositionW, minX: 0},
      onClick: function () {


        if (gsap.getProperty(cart.value, "x") === closedPositionW) {

          gsap.set(items.value.$el, { backgroundColor: 'white' })
          tl.to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto", ease: "power3.inOut"})

        } else {
          mm.add("(max-width: 575px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "2.5rem", ease: "power3.inOut"})
                .to(items.value.$el, 0, {backgroundColor: "#c05000"});
          });

          mm.add("(min-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "3.5rem", ease: "power3.inOut"})
                .to(items.value.$el, 0, {backgroundColor: "#c05000"});
          });

        }
      },
      onDragEnd: function () {
        let x = ref(<number>gsap.getProperty(cart.value, "x"))

        if (x.value < drag[0].maxX / 2) {

          gsap.set(items.value.$el, { backgroundColor: 'white' })
          tl.to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto"});
        } else {
          mm.add("(max-width: 575px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "2.5rem"})
                .to(items.value.$el, 0, {backgroundColor: "#c05000"});
          });
          mm.add("(min-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "3.5rem"})
                .to(items.value.$el, 0, {backgroundColor: "#c05000"});
          });
        }
      },
      snap: {
        x: [0, closedPositionW]
      }
    })
})
watch(
    () => cartItems,
    () => {
      cartStore.saveCartToLocalStorage()
    },
    {deep: true},
)
</script>

<style scoped>
/* Dodawanie: licznik wjeżdża z dołu */
.count-up-enter-active,
.count-up-leave-active,
.count-down-enter-active,
.count-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.count-up-leave-active,
.count-down-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.count-up-enter-from { transform: translateY(100%); opacity: 0; }
.count-up-leave-to   { transform: translateY(-100%); opacity: 0; }

/* Usuwanie: licznik zjeżdża w dół */
.count-down-enter-from { transform: translateY(-100%); opacity: 0; }
.count-down-leave-to   { transform: translateY(100%); opacity: 0; }
</style>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to {
  transform:   scale(0);
  opacity: 0;

}
.list-enter-from {
  transform: translateX(30px);
  opacity: 0;

}
.list-leave-active {
  position: absolute;
}
</style>