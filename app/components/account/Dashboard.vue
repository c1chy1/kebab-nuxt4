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
          {{ $t('dashboard.account') }}
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
            {{ $t('dashboard.settings') }}
          </button>

        </li>


        <li v-if="store.isAdmin" class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full  flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:user-group" class="w-4 h-4" />
          <button
              @click="openUsersModal()"
              class="cursor-pointer">
            {{ $t('dashboard.users') }}
          </button>
        </li>
        <li v-if="store.isAdmin" class="hover:ml-4 w-full text-white bg-secondary p-2 pl-8 rounded-full  flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:pencil-square" class="w-4 h-4" />
          <button
              @click="openProductsModal()"
              class="cursor-pointer">
            {{ $t('dashboard.products') }}
          </button>
        </li>
        <li class="hover:ml-4 w-full text-white  bg-secondary p-2 pl-8 rounded-full flex flex-row items-center space-x-3 transition-all duration-700">
          <Icon name="heroicons:chart-pie" class="w-4 h-4" />

          <button
              @click="showModal('orders_modal')"
              class="cursor-pointer">
            {{ $t('dashboard.orders') }}
          </button>
        </li>
      </ul>
    </div>
    <Teleport to="body">
      <dialog id="user_modal" class="modal font-bold">
        <div class="modal-box">
          <h2 class="section-title">{{ $t('dashboard.account') }}</h2>

          <div class="flex flex-col items-center gap-4 py-4">
            <!-- Avatar -->
            <div class="relative">
              <div class="avatar">
                <div class="mask mask-squircle w-20 h-20">
                  <img :src="(store.userInfo as any)?.profilePicture" alt="Avatar"/>
                </div>
              </div>
              <ClientOnly>
                <label
                    ref="avatarOverlay"
                    class="absolute inset-0 flex items-center justify-center bg-black/50 mask mask-squircle cursor-pointer"
                    style="opacity: 0; pointer-events: none;"
                    :title="$t('dashboard.uploadPhoto')">
                  <Icon name="heroicons:camera" class="w-6 h-6 text-white pointer-events-none"/>
                  <input type="file" class="hidden" accept="image/jpeg,image/png,image/webp,image/gif" @change="handleAvatarUpload"/>
                </label>
              </ClientOnly>
            </div>
            <!-- Always in DOM to avoid layout shift, animated with GSAP -->
            <p ref="avatarHint" class="text-xs -mt-2" style="opacity: 0;">{{ $t('dashboard.avatarHint') }}</p>

            <!-- Fields -->
            <div class="w-full space-y-3 text-sm">
              <div class="flex items-center gap-3 h-8">
                <span class="opacity-50 w-14 shrink-0">{{ $t('dashboard.name') }}</span>
                <div class="flex-1 relative h-full flex items-center">
                  <span ref="nameDisplay" class="font-normal">{{ (store.userInfo as any)?.username }}</span>
                  <input
                      ref="nameInput"
                      v-model="editUsername"
                      type="text"
                      class="input input-bordered input-sm absolute inset-0 w-full font-normal"
                      style="opacity: 0; pointer-events: none;"
                  />
                </div>
              </div>
              <div class="flex items-center gap-3 h-8">
                <span class="opacity-50 w-14 shrink-0">{{ $t('dashboard.email') }}</span>
                <span class="flex-1 font-normal">{{ (store.userInfo as any)?.email }}</span>
                <span ref="emailHint" class="text-xs italic shrink-0" style="opacity: 0;">{{ $t('dashboard.emailHint') }}</span>
              </div>
              <div class="flex items-center gap-3 h-8">
                <span class="opacity-50 w-14 shrink-0">{{ $t('register.streetLabel') }}</span>
                <div class="flex-1 relative h-full flex items-center">
                  <span ref="streetDisplay" class="font-normal">{{ (store.userInfo as any)?.street }}</span>
                  <input
                      ref="streetInput"
                      v-model="editStreet"
                      type="text"
                      class="input input-bordered input-sm absolute inset-0 w-full font-normal"
                      style="opacity: 0; pointer-events: none;"
                  />
                </div>
              </div>
              <div class="flex items-center gap-3 h-8">
                <span class="opacity-50 w-14 shrink-0">{{ $t('register.cityLabel') }}</span>
                <div class="flex-1 relative h-full flex items-center">
                  <span ref="cityDisplay" class="font-normal">{{ (store.userInfo as any)?.city }}</span>
                  <input
                      ref="cityInput"
                      v-model="editCity"
                      type="text"
                      class="input input-bordered input-sm absolute inset-0 w-full font-normal"
                      style="opacity: 0; pointer-events: none;"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="modal-action justify-between">
            <template v-if="!isEditing">
              <form method="dialog">
                <button class="button-orange cursor-pointer">{{ $t('dashboard.back') }}</button>
              </form>
              <button class="button-orange cursor-pointer" @click="startEdit">{{ $t('dashboard.edit') }}</button>
            </template>
            <template v-else>
              <button class="button-orange cursor-pointer" @click="cancelEdit">{{ $t('dashboard.cancel') }}</button>
              <button class="button-orange cursor-pointer" @click="saveProfile">{{ $t('dashboard.save') }}</button>
            </template>
          </div>
        </div>
      </dialog>

      <dialog id="settings_modal" class="modal">
        <div class="modal-box">
          <h2 class="section-title text-primary">{{ $t('dashboard.settings') }}</h2>
          <div class="w-full mx-auto flex justify-center">
            <UiButtonTheme/>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="button-orange cursor-pointer">{{ $t('dashboard.back') }}</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="orders_modal" class="modal font-bold">
        <div class="modal-box max-w-fit overflow-auto" data-lenis-prevent>
          <h2 class="section-title">{{ $t('dashboard.orders') }}</h2>
          <div class="w-full flex flex-col ">
            <table class="table text-xs sm:text-sm  text-center">
              <thead>
              <tr>
                <th>{{ $t('dashboard.ordersTable.orderId') }}</th>
                <th>{{ $t('dashboard.ordersTable.title') }}</th>
                <th>{{ $t('dashboard.ordersTable.price') }}</th>
                <th>{{ $t('dashboard.ordersTable.quantity') }}</th>
                <th>{{ $t('dashboard.ordersTable.total') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in store.orders">
                <td>
                  <p > {{ item._id }}</p>
                </td>
                <td>
                  <div
                       v-for="order in item.orderItems">
                    <p> {{ order.title }}</p>

                  </div>
                  <p>{{ $t('dashboard.ordersTable.delivery') }}</p>
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
              <button class="button-orange cursor-pointer">{{ $t('dashboard.back') }}</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="users_modal" class="modal font-bold">
        <div class="modal-box max-w-4xl overflow-y-auto" data-lenis-prevent>
          <h2 class="section-title">{{ $t('dashboard.users') }}</h2>
          <div class="flex gap-2 mb-3">
            <input
                v-model="filterUsername"
                type="text"
                :placeholder="$t('dashboard.usersTable.usernamePlaceholder')"
                class="input input-bordered input-xs flex-1 font-normal"
            />
            <input
                v-model="filterEmail"
                type="text"
                :placeholder="$t('dashboard.usersTable.emailPlaceholder')"
                class="input input-bordered input-xs flex-1 font-normal"
            />
          </div>
          <div class="w-full overflow-auto h-72">
            <table class="table table-xs sm:table-sm text-center">
              <thead class="sticky top-0 z-10 bg-base-100">
              <tr>
                <th class="hidden sm:table-cell">#</th>
                <th>{{ $t('dashboard.usersTable.username') }}</th>
                <th class="hidden sm:table-cell">{{ $t('dashboard.usersTable.email') }}</th>
                <th>{{ $t('dashboard.usersTable.role') }}</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, index) in filteredUsers" :key="user._id">
                <td class="hidden sm:table-cell">{{ index + 1 }}</td>
                <td>
                  <div class="flex items-center gap-2 text-left">
                    <div class="avatar shrink-0">
                      <div class="mask mask-squircle w-7 h-7 sm:w-9 sm:h-9">
                        <img :src="user.profilePicture" alt="avatar"/>
                      </div>
                    </div>
                    <div class="min-w-0">
                      <div class="font-semibold truncate max-w-[100px] sm:max-w-none">{{ user.username }}</div>
                      <div class="text-[10px] sm:hidden opacity-60 font-normal truncate max-w-[100px]">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="hidden sm:table-cell text-left">{{ user.email }}</td>
                <td>
                  <span :class="user.role === 'admin' ? 'badge badge-warning badge-xs sm:badge-sm' : 'badge badge-ghost badge-xs sm:badge-sm'">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <div class="flex flex-col sm:flex-row gap-1 items-center justify-center">
                    <button
                        class="btn btn-info btn-xs text-white cursor-pointer"
                        @click="openUserOrdersModal(user)">
                      <span class="hidden sm:inline">{{ $t('dashboard.orders') }}</span>
                      <Icon name="heroicons:list-bullet" class="w-3 h-3 sm:hidden" />
                    </button>
                    <button
                        v-if="user.role !== 'admin'"
                        class="btn btn-error btn-xs cursor-pointer"
                        @click="adminStore.removeUser(user._id)">
                      <span class="hidden sm:inline">{{ $t('dashboard.usersTable.deleteUser') }}</span>
                      <Icon name="heroicons:trash" class="w-3 h-3 sm:hidden" />
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="button-orange cursor-pointer">{{ $t('dashboard.back') }}</button>
            </form>
          </div>
        </div>

      </dialog>

      <dialog id="user_orders_modal" class="modal font-bold">
        <div class="modal-box w-11/12 max-w-2xl overflow-auto" data-lenis-prevent>
          <h2 class="section-title">{{ adminStore.selectedUsername }}</h2>
          <div class="w-full overflow-auto">
            <p v-if="adminStore.selectedUserOrders.length === 0" class="text-center py-4 opacity-60">{{ $t('dashboard.ordersTable.noOrders') }}</p>
            <table v-else class="table table-xs sm:table-sm text-center w-full">
              <thead>
              <tr>
                <th class="hidden sm:table-cell">{{ $t('dashboard.ordersTable.orderId') }}</th>
                <th>{{ $t('dashboard.ordersTable.title') }}</th>
                <th>{{ $t('dashboard.ordersTable.price') }}</th>
                <th class="hidden sm:table-cell">{{ $t('dashboard.ordersTable.qty') }}</th>
                <th>{{ $t('dashboard.ordersTable.total') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in adminStore.selectedUserOrders" :key="item._id">
                <td class="hidden sm:table-cell font-mono text-[10px] opacity-60">…{{ item._id.slice(-8) }}</td>
                <td class="text-left">
                  <div v-for="order in item.orderItems" :key="order.title" class="flex justify-between gap-2 sm:block">
                    <span>{{ order.title }}</span>
                    <span class="sm:hidden text-[10px] opacity-60">×{{ order.qty }}</span>
                  </div>
                  <div class="opacity-50 text-[10px]">{{ $t('dashboard.ordersTable.delivery') }}</div>
                </td>
                <td class="align-top">
                  <div v-for="order in item.orderItems" :key="order.title">{{ order.price }} €</div>
                  <div>3 €</div>
                </td>
                <td class="hidden sm:table-cell align-top">
                  <div v-for="order in item.orderItems" :key="order.title">{{ order.qty }}</div>
                </td>
                <td class="font-semibold">{{ item.totalPrice }} €</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action">
            <button class="button-orange cursor-pointer" @click="backToUsers()">{{ $t('dashboard.back') }}</button>
          </div>
        </div>
      </dialog>
      <dialog id="products_modal" class="modal font-bold">
        <div class="modal-box w-11/12 max-w-2xl overflow-y-auto" data-lenis-prevent>
          <h2 class="section-title">{{ $t('dashboard.products') }}</h2>
          <div class="w-full overflow-auto">
            <table class="table text-xs sm:text-sm text-center">
              <thead class="sticky top-0 z-10 bg-base-100">
              <tr>
                <th>#</th>
                <th>{{ $t('dashboard.productsTable.title') }}</th>
                <th>{{ $t('dashboard.productsTable.price') }}</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in adminStore.products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>
                  <input
                      v-model="product.title"
                      type="text"
                      class="input input-bordered input-xs w-full font-normal"
                  />
                </td>
                <td>
                  <input
                      v-model.number="product.price"
                      type="number"
                      min="0"
                      step="0.01"
                      class="input input-bordered input-xs w-20 font-normal"
                  />
                </td>
                <td>
                  <button
                      class="btn btn-xs cursor-pointer"
                      @click="saveProduct(product)">
                    {{ $t('dashboard.save') }}
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="button-orange cursor-pointer">{{ $t('dashboard.back') }}</button>
            </form>
          </div>
        </div>
      </dialog>
    </Teleport>
  </aside>
</template>
<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";
import {useAdminStore} from "@/stores/adminStore";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const store = useUserStore()
const adminStore = useAdminStore()

const isEditing = ref(false)
const editUsername = ref('')
const editStreet = ref('')
const editCity = ref('')
const avatarOverlay = ref<HTMLElement>()
const avatarHint = ref<HTMLElement>()
const emailHint = ref<HTMLElement>()
const nameDisplay = ref<HTMLElement>()
const nameInput = ref<HTMLInputElement>()
const streetDisplay = ref<HTMLElement>()
const streetInput = ref<HTMLInputElement>()
const cityDisplay = ref<HTMLElement>()
const cityInput = ref<HTMLInputElement>()

function startEdit() {
  editUsername.value = (store.userInfo as any)?.username ?? ''
  editStreet.value = (store.userInfo as any)?.street ?? ''
  editCity.value = (store.userInfo as any)?.city ?? ''
  isEditing.value = true
  nextTick(() => {
    gsap.to(avatarOverlay.value, { opacity: 1, pointerEvents: 'auto', duration: 0.35, ease: 'power2.out' })
    gsap.to(avatarHint.value, { opacity: 0.5, duration: 0.35, delay: 0.1, ease: 'power2.out' })
    gsap.to(emailHint.value, { opacity: 0.4, duration: 0.35, delay: 0.15, ease: 'power2.out' })
    gsap.to(nameDisplay.value, { opacity: 0, x: -10, duration: 0.2, ease: 'power2.in' })
    gsap.fromTo(nameInput.value,
      { x: 14, opacity: 0 },
      { x: 0, opacity: 1, pointerEvents: 'auto', duration: 0.3, delay: 0.15, ease: 'power3.out' }
    )
    gsap.to(streetDisplay.value, { opacity: 0, x: -10, duration: 0.2, ease: 'power2.in' })
    gsap.fromTo(streetInput.value,
      { x: 14, opacity: 0 },
      { x: 0, opacity: 1, pointerEvents: 'auto', duration: 0.3, delay: 0.2, ease: 'power3.out' }
    )
    gsap.to(cityDisplay.value, { opacity: 0, x: -10, duration: 0.2, ease: 'power2.in' })
    gsap.fromTo(cityInput.value,
      { x: 14, opacity: 0 },
      { x: 0, opacity: 1, pointerEvents: 'auto', duration: 0.3, delay: 0.25, ease: 'power3.out' }
    )
  })
}

function animateExitEdit(onComplete?: () => void) {
  gsap.to([avatarOverlay.value, avatarHint.value, emailHint.value], {
    opacity: 0, duration: 0.2, ease: 'power2.in',
    onComplete: () => gsap.set(avatarOverlay.value, { pointerEvents: 'none' })
  })
  gsap.to(nameInput.value, { opacity: 0, x: 14, duration: 0.2, ease: 'power2.in',
    onComplete: () => gsap.set(nameInput.value, { pointerEvents: 'none' })
  })
  gsap.fromTo(nameDisplay.value,
    { x: -10, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.3, delay: 0.15, ease: 'power3.out', onComplete }
  )
  gsap.to(streetInput.value, { opacity: 0, x: 14, duration: 0.2, ease: 'power2.in',
    onComplete: () => gsap.set(streetInput.value, { pointerEvents: 'none' })
  })
  gsap.fromTo(streetDisplay.value, { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, delay: 0.15, ease: 'power3.out' })
  gsap.to(cityInput.value, { opacity: 0, x: 14, duration: 0.2, ease: 'power2.in',
    onComplete: () => gsap.set(cityInput.value, { pointerEvents: 'none' })
  })
  gsap.fromTo(cityDisplay.value, { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, delay: 0.15, ease: 'power3.out' })
}

function cancelEdit() {
  animateExitEdit(() => { isEditing.value = false })
}

async function saveProfile() {
  await store.updateProfile(editUsername.value, editStreet.value, editCity.value)
  animateExitEdit()
  isEditing.value = false
}

async function handleAvatarUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  await store.uploadAvatar(file)
}

function showModal(id: string) {
  document.getElementById(id)?.showModal()
}

const filterUsername = ref('')
const filterEmail = ref('')
const filteredUsers = computed(() =>
  adminStore.users.filter((u: any) =>
    (u.username ?? '').toLowerCase().includes(filterUsername.value.toLowerCase()) &&
    u.email.toLowerCase().includes(filterEmail.value.toLowerCase())
  )
)

async function openUsersModal() {
  filterUsername.value = ''
  filterEmail.value = ''
  await adminStore.getUsers()
  showModal('users_modal')
}

async function openUserOrdersModal(user: any) {
  document.getElementById('users_modal')?.close()
  await adminStore.getUserOrders(user._id, user.username ?? user.email)
  showModal('user_orders_modal')
}

function backToUsers() {
  document.getElementById('user_orders_modal')?.close()
  showModal('users_modal')
}

async function openProductsModal() {
  await adminStore.getProducts()
  showModal('products_modal')
}

async function saveProduct(product: any) {
  await adminStore.updateProduct(product.id, product.title, product.price)
}

const tl = gsap.timeline()
let mm = gsap.matchMedia();
const sidebar = ref()
const maxSidebar = ref()
const maxToolbar = ref()
useLocaleTransition(sidebar, 'li button')

onMounted(async () => {
  await nextTick()

  const closedPositionW = 35 - sidebar.value.offsetWidth
  const isMobile = window.matchMedia('(max-width: 575px)').matches
  const initialHeight = isMobile ? '2.5rem' : '3.5rem'

  gsap.set(sidebar.value, { x: closedPositionW, height: initialHeight, opacity: 1 })

  let drag: Draggable[];
  drag = Draggable.create(sidebar.value, {
      type: "x",
      zIndexBoost: true,
      trigger: ['#dashboardButton', '#dashboardTrigger'],
      throwProps: true,
      edgeResistance: 0.9,
      maxDuration: 0.3,
      bounds: {minX: closedPositionW, maxX: 0},

      onClick: function () {
        if (gsap.getProperty(sidebar.value, "x") === closedPositionW) {
          tl.to(this.target, 0.3, {x: 0})
              .to(this.target, 0.3, {height: "auto", ease: "power3.inOut"})
              .to(maxToolbar.value, 0.3, { opacity: 1 })
              .fromTo(".max li", {
                x: -200,
                opacity: 0,
                ease: "Expo.easeInOut"
              }, {
                x: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.2,
              })
        } else {
          gsap.set(maxToolbar.value, { opacity: 0 })
          mm.add("(max-width: 575px)", () => {
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
          mm.add("(max-width: 575px)", () => {

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

})


</script>
<style>
.bg-primary {
}

</style>