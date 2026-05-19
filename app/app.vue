<template>
  <VueLenis ref="lenisRef" root>
  <div
      :data-theme="theme"
      class="duration-700 transition-all">
    <AccountDashboard v-if="user.isLoggedIn"/>
    <AccountCart/>
    <main>
      <NuxtPage/>
    </main>

  </div>
  </VueLenis>
</template>
<script setup lang="ts">
import {useThemeStore} from '@/stores/useTheme'
import {useUserStore} from "@/stores/userStore";
import {useCartStore} from "@/stores/useCart";
import gsap from 'gsap'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const user = useUserStore()

const {loadCart} = useCartStore()

const lenisRef = useTemplateRef('lenisRef')

watchEffect((onInvalidate) => {
  function update(time: number) {
    lenisRef.value?.lenis?.raf(time * 1000)
  }
  gsap.ticker.add(update)
  onInvalidate(() => gsap.ticker.remove(update))
})

await callOnce(async () => {
  const headers = useRequestHeaders(['cookie'])
  const data = await $fetch<any>('/api/auth/me', { headers })
  if (data) {
    user.userInfo = data
    user.isAdmin = data.role === 'admin'
    user.isLoggedIn = true
  }
})
onMounted(() => {
  window.scrollTo(0, 0)
  loadCart()
})

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
