import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
  },
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
    '@vite-pwa/nuxt',
  ],
  // @ts-ignore — types generated after nuxt prepare
  pwa: {
    manifest: {
      name: 'Burger House',
      short_name: 'BurgerHouse',
      description: 'The best burgers in town',
      theme_color: '#1a1a1a',
      background_color: '#1a1a1a',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      orientation: 'any',
      lang: 'pl',
      icons: [
        {
          src: 'icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^\/api\/products$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-products',
            expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  },
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
    detectBrowserLanguage: false,
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
        'worker-src': ["'self'"],
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
      force: true,
      include: [
        'pinia',
        'vue3-toastify',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/Draggable',
        'lightgallery',
        'workbox-window',
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
