<template>
  <VueLenis ref="lenisRef" root>
  <div
      :data-theme="theme"
      class="duration-700 transition-all">
    <LazyAccountDashboard v-if="user.isLoggedIn"/>
    <LazyAccountCart/>
    <main>
      <NuxtPage />
      <div v-if="!showPage" class="fixed inset-0 z-[55] bg-base-100 pointer-events-none" />
      <LazyLanguageIntro v-if="!lang" />
      <AppIntro v-else-if="showIntro" :lang="lang" @fading="showPage = true" @done="showIntro = false" />
    </main>

  </div>
  </VueLenis>
</template>
<script setup lang="ts">
import {useThemeStore} from '@/stores/useTheme'
import {useUserStore} from "@/stores/userStore";
import {useCartStore} from "@/stores/useCart";
const i18nHead = useLocaleHead()
useHead(() => ({ htmlAttrs: i18nHead.value.htmlAttrs }))

const { t } = useI18n()
useSeoMeta({ description: () => t('meta.description') })

const showIntro = ref(true)
const showPage = ref(false)

const langChosenCookie = useCookie('lang-chosen', { maxAge: 60 * 60 * 24 * 365 })
const lang = ref<string | null>(langChosenCookie.value ?? null)

const { introComplete } = useIntroState()
watch(showPage, (val) => { if (val) introComplete.value = true })

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const user = useUserStore()

const {loadCart} = useCartStore()

const lenisRef = useTemplateRef('lenisRef')

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
