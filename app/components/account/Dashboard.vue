<template>

  <aside ref="sidebar"
         id="sidebar"
         class="bottom-0 left-0 max-w-xl w-1/2   sm:w-1/3  lg:w-1/4 2xl:w-60  fixed  z-[1000] flex transition-colors duration-700  bg-secondary shadow-2xl shadow-black  shadow-dark-sm  rounded-tr-lg  opacity-0">

    <div ref="maxToolbar"
         id="dashboardTrigger"
         class="max-toolbar opacity-0 top-0 sm:top-1 xl:top-2 sm:mr-4 h-10 pl-2 -right-2 lg:-right-6 transition-all duration-700 flex items-center justify-center border-2 border-[#b9cf21] absolute rounded-full ">

      <div class="flex items-center space-x-3 pr-2  transition-all duration-70">
        <Icon
            name="heroicons:arrow-right-on-rectangle"
            class="text-white hover:text-black w-6 h-6 cursor-pointer"
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
      <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
    </button>
    <!-- MAX SIDEBAR-->
    <div ref="maxSidebar" class="max  text-sm mt-12 flex-col space-y-2 transition-all duration-700">

      <ul class="flex flex-col text-sm lg:text-base ">

        <li class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full  flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:user" class="w-4 h-4" />
          <button
              @click="showModal('user_modal')"
              class="cursor-pointer">
            {{ store.userInfo?.username }}
          </button>

        </li>
        <li class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:bars-4" class="w-4 h-4" />
          <button
              @click="showModal('settings_modal')"
              class=" cursor-pointer">
            Settings
          </button>

        </li>


        <li v-if="store.isAdmin" class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full  flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:user-group" class="w-4 h-4" />
          <button
              @click="openUsersModal()"
              class="cursor-pointer">
            Users
          </button>
        </li>
        <li class="hover:ml-4 w-full text-white  bg-secondary p-2 pl-8 rounded-full flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:chart-pie" class="w-4 h-4" />

          <button
              @click="showModal('orders_modal')"
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

      <dialog id="users_modal" class="modal font-bold">
        <div class="modal-box max-w-fit overflow-auto">
          <h2 class="section-title">Users</h2>
          <div class="w-full flex flex-col">
            <table class="table text-xs sm:text-sm text-center">
              <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, index) in adminStore.users" :key="user._id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="flex justify-center">
                    <div class="avatar">
                      <div class="mask mask-squircle w-10 h-10">
                        <img :src="user.profilePicture" alt="avatar"/>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span :class="user.role === 'admin' ? 'badge badge-warning' : 'badge badge-ghost'">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <button
                      class="btn btn-info btn-xs"
                      @click="openUserOrdersModal(user)">
                    Orders
                  </button>
                </td>
                <td>
                  <button
                      v-if="user.role !== 'admin'"
                      class="btn btn-error btn-xs"
                      @click="adminStore.removeUser(user._id)">
                    Delete
                  </button>
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

        <dialog id="user_orders_modal" class="modal font-bold">
          <div class="modal-box max-w-fit overflow-auto">
            <h2 class="section-title">{{ adminStore.selectedUsername }}'s Orders</h2>
            <div class="w-full flex flex-col">
              <p v-if="adminStore.selectedUserOrders.length === 0" class="text-center py-4 opacity-60">No orders yet</p>
              <table v-else class="table text-xs sm:text-sm text-center">
                <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in adminStore.selectedUserOrders" :key="item._id">
                  <td>{{ item._id }}</td>
                  <td>
                    <div v-for="order in item.orderItems" :key="order.title">
                      <p>{{ order.title }}</p>
                    </div>
                    <p>Delivery</p>
                  </td>
                  <td>
                    <div v-for="order in item.orderItems" :key="order.title">
                      <p>{{ order.price }} €</p>
                    </div>
                    <p>3 €</p>
                  </td>
                  <td class="align-baseline">
                    <div v-for="order in item.orderItems" :key="order.title">
                      <p>{{ order.qty }}</p>
                    </div>
                  </td>
                  <td>{{ item.totalPrice }} €</td>
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
      </dialog>
    </div>
  </aside>
</template>
<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";
import {useAdminStore} from "@/stores/adminStore";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const store = useUserStore()
const adminStore = useAdminStore()

function showModal(id: string) {
  document.getElementById(id)?.showModal()
}

async function openUsersModal() {
  await adminStore.getUsers()
  showModal('users_modal')
}

async function openUserOrdersModal(user: any) {
  await adminStore.getUserOrders(user._id, user.username ?? user.email)
  showModal('user_orders_modal')
}

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
      bounds: {minX: closedPositionW, maxX: 0},

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

        if (x.value > closedPositionW / 2) {
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