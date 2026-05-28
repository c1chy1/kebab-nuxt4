import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@formkit/nuxt',
    'lenis/nuxt',
    'nuxt-swiper',
    '@nuxtjs/fontaine',
    'nuxt-security',
    '@nuxtjs/i18n',
  ],
  formkit: {
    autoImport: true,
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'de', language: 'de-DE', file: 'de.json' },
      { code: 'pl', language: 'pl-PL', file: 'pl.json' },
      { code: 'tr', language: 'tr-TR', file: 'tr.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales/',
  },
  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 60000,
      headers: true,
    },
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', '*.public.blob.vercel-storage.com', 'uxwing.com'],
      },
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
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/Draggable',
        'lightgallery',
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