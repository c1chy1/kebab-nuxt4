<template>

  <aside ref="sidebar"
         id="sidebar"
         class="bottom-0 left-0 max-w-xl w-1/2   sm:w-1/3  lg:w-1/4 2xl:w-60  fixed  z-[1000] flex transition-colors duration-700  bg-secondary shadow-2xl shadow-black  shadow-dark-sm  rounded-tr-lg  opacity-0">

    <div ref="maxToolbar"
         id="dashboardTrigger"
         class="max-toolbar opacity-0 top-0 sm:top-1 xl:top-2 sm:mr-4 h-10 pl-2 -right-2 lg:-right-6 transition-all duration-700 flex items-center justify-center border-2 border-[#b9cf21] absolute rounded-full ">

      <div class="flex items-center space-x-3 pr-2  transition-all duration-70">
        <UiIconLogOut
            class="fill-white hover:fill-black w-6 h-6 cursor-pointer"
            @click="store.logout()"
        />
      </div>
      <div
          class="pl-4 pr-1 py-1 flex items-center space-x-3 group bg-gradient-to-t dark:from-cyan-500 dark:to-blue-500 from-primary via-primary to-[#b9cf21]  rounded-full text-white  ">
        <div class="transition-all duration-700 mr-8  text-sm">
          Account
        </div>
      </div>
    </div>

    <button
        id="dashboardButton"
        class="-right-4 lg:-right-6 top-1  p-1.5  sm:p-2  lg:p-3.5  transition-all duration-700 flex border-2 border-[#b9cf21] bg-secondary  hover:bg-purple-500 absolute   rounded-full text-white hover:rotate-45">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
           class="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
      </svg>
    </button>
    <!-- MAX SIDEBAR-->
    <div ref="maxSidebar" class="max  text-sm mt-12 flex-col space-y-2 transition-all duration-700">


      <ul class="flex flex-col text-sm lg:text-base ">
        <li class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full  flex flex-row items-center space-x-3 transition-all duration-700">
          <UiIconUser/>
          <button
              onclick="user_modal.showModal()"
              class="cursor-pointer">
            {{ store.userInfo?.username }}
          </button>

        </li>
        <li class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full flex flex-row items-center space-x-3 transition-all duration-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
          </svg>
          <button
              onclick="settings_modal.showModal()"
              class=" cursor-pointer">
            Settings
          </button>

        </li>
        <li class="hover:ml-4 w-full text-white  bg-secondary p-2 pl-8 rounded-full flex flex-row items-center space-x-3 transition-all duration-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/>
          </svg>

          <button
              onclick="orders_modal.showModal()"
              class="cursor-pointer">
            Orders
          </button>
        </li>
      </ul>
    </div>
    <div>
      <dialog id="user_modal" class="modal font-bold">
        <div class="modal-box">
          <h2 class="section-title">Account</h2>
          <div class="w-full mx-auto flex justify-center">
            <div class="">
              <table class="table">
                <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox"/>
                    </label>
                  </th>
                  <th>Profile Picture</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox"/>
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img :src="store.userInfo?.profilePicture" alt="Avatar Tailwind CSS Component"/>
                        </div>
                      </div>

                    </div>
                  </td>
                  <td>

                    {{ store.userInfo?.username }}
                    <!--                      <div class="text-sm opacity-50">{{store.userInfo?.city}}</div>-->

                  </td>
                  <td>{{ store.userInfo?.email }}</td>
                  <th>
                    <button class="btn btn-ghost btn-xs">Edit</button>
                  </th>
                </tr>
                </tbody>

              </table>
            </div>

          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="button-orange">Back</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="settings_modal" class="modal">
        <div class="modal-box">
          <h2 class="section-title">Settings</h2>
          <div class="w-full mx-auto flex justify-center">
            <UiButtonTheme/>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="button-orange">Back</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="orders_modal" class="modal font-bold">
        <div class="modal-box max-w-fit overflow-auto">
          <h2 class="section-title">Orders</h2>
          <div class="w-full flex flex-col ">
            <table class="table text-xs sm:text-sm  text-center">
              <thead>
              <tr>
<!--                <th>
                  <label>
                    <input type="checkbox" class="checkbox"/>
                  </label>
                </th>-->
                <th>Order Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in store.orders">

<!--                <td>
                  <div>
                    <label>
                      <input type="checkbox" class="checkbox"/>
                    </label>

                  </div>
                </td>-->
                <td>
                  <p > {{ item._id }}</p>
                </td>
                <td>
                  <div
                       v-for="order in item.orderItems">
                    <p> {{ order.title }}</p>

                  </div>
                  <p>Delivery</p>
                </td>

                <td>
                  <div
                       v-for="order in item.orderItems">
                    <p> {{ order.price }} €</p>
                  </div>
                  <p>3 €</p>
                </td>
                <td class="align-baseline">
                  <div
                       v-for="order in item.orderItems">
                    <p> {{ order.qty }}</p>
                  </div>
                </td>
                <td>
                  <div >
                    <p> {{ item.totalPrice }} €</p>
                  </div>
                </td>
              </tr>
              </tbody>

            </table>

          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="button-orange">Back</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </aside>
</template>
<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const store = useUserStore()
const tl = gsap.timeline()
let mm = gsap.matchMedia();
const sidebar = ref()
const maxSidebar = ref()
const maxToolbar = ref()

onMounted(() => {
  let closedPositionW = 35 - sidebar.value.offsetWidth
  let drag: Draggable[];
  mm.add("(max-width: 576px)", () => {

    tl.set(sidebar.value, {
      x: closedPositionW
    }).set(sidebar.value, {
      height: "2.5rem",
      opacity: 1
    })
  })

  mm.add("(min-width: 576px)", () => {
    tl.set(sidebar.value, {
      x: closedPositionW
    }).set(sidebar.value, {
      height: "3.5rem",
      opacity: 1
    })
  })
  setTimeout(() => {
    drag = Draggable.create(sidebar.value, {
      type: "x",
      zIndexBoost: true,
      trigger: ['#dashboardButton', '#dashboardTrigger'],
      throwProps: true,
      edgeResistance: 0.9,
      maxDuration: 0.3,
      bounds: {maxX: closedPositionW, minX: 0},

      onClick: function () {
        tl.to(maxToolbar.value, 0.5, {
          opacity: 1
        })


        if (gsap.getProperty(sidebar.value, "x") === closedPositionW) {

          tl.to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto", ease: "power3.inOut"})
              .fromTo(".max li", {
                x: -200,
                opacity: 0,
                duration: 0.1,
                ease: "Expo.easeInOut"
              }, {
                x: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.2,

              })

        } else {
          tl.to(maxToolbar.value, 0.5, {
            opacity: 0
          })
          mm.add("(max-width: 576px)", () => {

            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "2.5rem"})

          })

          mm.add("(min-width: 576px)", () => {
            tl.to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "3.5rem"})
          })

        }
      },

      onDragEnd: function () {

        let x = ref(<number>gsap.getProperty(sidebar.value, "x"))

        if (x.value > drag[0].minX / 2) {
          tl.to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto"})
              .fromTo(".max li", {
                x: -200,
                opacity: 0,
                duration: 0.1,
                ease: "Expo.easeInOut"
              }, {
                x: 0,
                opacity: 1,
                duration: 0.1,
                stagger: 0.2,

              }).to(maxToolbar.value, 0.5, {
            opacity: 1
          })

        } else {
          mm.add("(max-width: 576px)", () => {

            tl.to(maxToolbar.value, 0.3, {
              opacity: 0
            }).to(this.target, 0.3, {x: closedPositionW})
                .to(this.target, 0.3, {height: "2.5rem"})

          });

          mm.add("(min-width: 576px)", () => {
            tl.to(maxToolbar.value, 0.3, {
              opacity: 0
            })
                .to(this.target, 0.1, {x: closedPositionW})
                .to(this.target, 0.1, {height: "3.5rem"})

          });
        }
      },
      snap: {
        x: [0, closedPositionW]
      }
    });
  }, 1000);

})


</script>
<style>
.bg-primary {
}

</style>