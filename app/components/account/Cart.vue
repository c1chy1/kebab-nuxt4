<script setup lang="ts">
import {useCartStore} from '/../stores/useCart'
import {cartItems} from "/../stores/useCart";
import {toast} from 'vue3-toastify'
import IconTrash from "~/components/atoms/IconTrash.vue";

const cartStore = useCartStore()
import gsap from 'gsap'

import Draggable from 'gsap/Draggable'

const cart = ref()
const items = ref()
const select = ref()
const tl = gsap.timeline()
let mm = gsap.matchMedia();
gsap.registerPlugin(Draggable)


async function placeOrderHandler() {
  try {
    const order = {
      orderItems: cartItems.value,
      totalPrice: cartStore.total
    }
    await cartStore.placeOrder(order)
    cartStore.clearCart()
  } catch (error: any) {
    toast.error(error.data.message)
  }
}


onMounted(() => {

  let closedPositionW = cart.value.offsetWidth - 35

  tl.set(cart.value, {
    x: closedPositionW
  }).set(cart.value, {
    height: "2.5rem", ease: "power3.inOut",
  })

  mm.add("(max-width: 576px)", () => {

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
  setTimeout(() => {
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

          tl.to(items.value, 0.3, {backgroundColor: "white"})
              .to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto", ease: "power3.inOut"})

        } else {
          mm.add("(max-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "2.5rem", ease: "power3.inOut"})
                .to(items.value, 0, {backgroundColor: "#ff6d00"});
          });

          mm.add("(min-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "3.5rem", ease: "power3.inOut"})
                .to(items.value, 0, {backgroundColor: "#ff6d00"});
          });

        }
      },
      onDragEnd: function () {
        let x = ref(<number>gsap.getProperty(cart.value, "x"))

        if (x.value < drag[0].maxX / 2) {

          tl.to(items.value, 0.3, {backgroundColor: "white"})
              .to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto"});
        } else {
          mm.add("(max-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "2.5rem"})
                .to(items.value, 0, {backgroundColor: "#ff6d00"});
          });
          mm.add("(min-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "3.5rem"})
                .to(items.value, 0, {backgroundColor: "#ff6d00"});
          });
        }
      },
      snap: {
        x: [0, closedPositionW]
      }
    })
  }, 1000);
})
watch(
    () => cartItems,
    () => {
      cartStore.saveCartToLocalStorage()
    },
    {deep: true},
)
</script>

<template>


  <div id="cart" ref="cart" v-if="cartItems"
       class="fixed bottom-0 right-0 z-[10000] opacity-0  max-w-xl w-1/2  sm:w-1/3  lg:w-1/4 2xl:w-1/5 shadow-2xl shadow-black  font-mont shadow-dark-sm">

    <div class="text-xs text-white bg-white transition-colors duration-700 rounded-lg overflow-hidden">
      <div id="cartTrigger"
           class="draggable transition-colors duration-700 flex items-center justify-center gap-x-2 px-2 py-3  bg-secondary">
        <button
            id="cartButton"
            class="draggable -left-4 lg:-left-6  top-1  p-1.5  sm:p-2  lg:p-3.5 transition-all duration-700 flex border-2 border-[#b9cf21] dark:border-[#0F172A] bg-secondary  hover:bg-purple-500 absolute   rounded-full text-white hover:rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
          </svg>
        </button>

        <h1 class=" sm:text-sm lg:text-lg font-bold"
        >Cart</h1>
        <span class="xl:text-base">({{ cartStore.totalCount }} items)</span>
      </div>

      <transition-group name="list" tag="ul"  ref="items" class="py-2 px-0 text-black text-xs  md:text-sm  lg:text-base  xl:text-lg">
        <li
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center">
          <NuxtImg

              :src="item.img"
              :alt="`image of ${item.title}`"
              class="img-fluid rounded w-12 sm:w-20 lg:w-24 xl:w-32 h-10 sm:h-12 lg:h-16 xl:h-24"/>
          <div class="text-black flex-1 mx-1 sm:mx-2 lg:mx-3 xl:mx-4">

            <h2 class="font-bold text-black">{{ item.title }}</h2>
            <div class="flex  items-center justify-between   xl:w-full 2xl:w-2/3 space-x-2.5 xl:space-x-2 ">
              <span>{{ item.price }}€</span>
              <select ref="select" class="border-2 border-black rounded-xl px-0.5 lg:px-1 cursor-pointer"
                      v-model="item.qty">
                <option
                    v-for="x in item.countInStock"
                    :key="x"
                    :value="x">
                  {{ x }}
                </option>
              </select>
            </div>
          </div>
          <IconTrash class="w-6 sm:w-7 lg:w-10  sm:mr-1 cursor-pointer self-end lg:self-center"
                     @click="cartStore.removeItem(item)">
          </IconTrash>
        </li>


      </transition-group>
      <div class="px-4 py-2 bg-secondary transition-colors duration-700">

        <div class="flex justify-between items-center">
          <span class="text-xs lg:text-sm">Delivery:</span>
          <span class="text-xs lg:text-sm">{{ cartStore.shippingPrice }} € </span>
        </div>
        <div class="flex justify-between items-center">

          <span class="font-bold lg:text-base xl:text-xl">Total:</span>
          <span class="font-bold lg:text-base xl:text-xl">{{ cartStore.total }} € </span>
        </div>

        <button
            @click="placeOrderHandler"
            class="block w-full mt-2 bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
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