<template>
  <VueLenis ref="lenisRef" root>
  <div
      :data-theme="theme"
      class="duration-700 transition-all">
    <AccountDashboard v-if="user.isLoggedIn"/>
    <AccountCart/>
    <main>
      <div :class="['transition-opacity duration-700', showPage ? 'opacity-100' : 'opacity-0']">
        <NuxtPage />
      </div>
      <LanguageIntro v-if="!lang" />
      <AppIntro v-else-if="showIntro" :lang="lang" @fading="showPage = true" @done="showIntro = false" />
    </main>

  </div>
  </VueLenis>
</template>
<script setup lang="ts">
import {useThemeStore} from '@/stores/useTheme'
import {useUserStore} from "@/stores/userStore";
import {useCartStore} from "@/stores/useCart";
import gsap from 'gsap'

const showIntro = ref(true)
const showPage = ref(false)
// lang-chosen: ustawiany tylko gdy user ŚWIADOMIE wybrał język (LanguageIntro/Navigation)
// preferred-lang: zarządzany przez i18n automatycznie
const langChosenCookie = useCookie('lang-chosen', { maxAge: 60 * 60 * 24 * 365 })
const lang = ref<string | null>(langChosenCookie.value ?? null)

const { introComplete } = useIntroState()
watch(showPage, (val) => { if (val) introComplete.value = true })

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

  window.addEventListener('language-selected', (e: CustomEvent) => {
    lang.value = e.detail
    langChosenCookie.value = e.detail
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      lenisRef.value?.lenis?.stop()
    } else {
      lenisRef.value?.lenis?.start()
    }
  })
})

</script>
<style>
.main-body {
  display: flex;
  height: calc(100dvh - var(--header-height));
  overflow-x: hidden;
}

.content {
  flex-grow: 1;
  overflow: auto;
  background-color: var(--background-color);
}
</style>
