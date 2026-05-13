import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon','@pinia/nuxt','@formkit/nuxt','lenis/nuxt','nuxt-swiper','@nuxtjs/fontaine', 'nuxt-security'],
  formkit: {
    autoImport: true,
  },
  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 60000,
      headers: true,
    },
  },
  routeRules: {
    '/api/auth/**': {
      security: {
        rateLimiter: {
          tokensPerInterval: 10,
          interval: 60000,
        }
      }
    }
  },
  css: [
    '~/assets/css/tailwind.css',
    'vue3-toastify/dist/index.css',
  ],

  build: {
    transpile: ['vue3-toastify'],
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'pinia',
        'vue3-toastify',
        'gsap/ScrollTrigger',
        'gsap/Draggable',
        'lightgallery'
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