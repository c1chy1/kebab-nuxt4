// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon','@pinia/nuxt','@formkit/nuxt','@nuxtjs/tailwindcss','lenis/nuxt','@tailwindcss/typography','nuxt-swiper','@nuxtjs/fontaine'],
  formkit: {
    autoImport: true,
  },

  css: [
    'vue3-toastify/dist/index.css',
  ],

  build: {
    transpile: ['vue3-toastify'],
  },

  vite: {
    optimizeDeps: {
      include: [
        'pinia',
        'vue3-toastify',
        'gsap/ScrollTrigger',
        'gsap/Draggable'// TO DO ANOTHER PACKAGE
      ]
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  runtimeConfig: {
    mongodbUri: '',
    jwtSecret: '',
    public: {
      lightgalleryLicense: '',
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.scss',
    viewer: true,
  },
  image: {
    format: ["webp"],
  },
  nitro: {
    plugins: ["~~/server/plugins/mongodb.ts"],
    compressPublicAssets: {
      brotli: true,
      gzip: false,
    },
  },
})