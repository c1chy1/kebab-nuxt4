<template>
  <div
      :data-theme="themeStore.theme"
      class="duration-700 transition-all">
    <AccountDashboard v-if="user.isLoggedIn"/>
    <main>
      <NuxtPage/>
    </main>

  </div>
</template>
<script setup lang="ts">
import {useThemeStore} from '@/stores/useTheme'
import {useUserStore} from "@/stores/userStore";
import {useCartStore} from "@/stores/useCart";

const themeStore = useThemeStore()
const user = useUserStore()

const {loadCart} = useCartStore()

onBeforeMount(async () => {

  if (user.isLoggedIn) {
    await user.getMyOrders()
    await user.me()
  }
})
onMounted(async () => {
  if (user.isLoggedIn) {
    await user.getMyOrders()
    await user.me()
  }
  themeStore.theme = localStorage.getItem('daisyui-theme') || 'dark';
  themeStore.toggleTheme = themeStore.theme === 'dark';
  if (process.client) {
    window.scrollTo(0, 0);
    loadCart()
  }

});

</script>
<style>
.main-body {
  display: flex;
  height: calc(100vh - var(--header-height));
  overflow-x: hidden;
}

.content {
  flex-grow: 1;
  overflow: auto;
  background-color: var(--background-color);
}
</style>
