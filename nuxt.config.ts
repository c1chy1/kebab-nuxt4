import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
    inlineSSRStyles: true,
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
          src: 'icons/logo-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'icons/logo-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'icons/logo-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'icons/logo-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      cleanupOutdatedCaches: true,
      navigateFallback: null,
      runtimeCaching: [
        {
          urlPattern: /\/_ipx\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'nuxt-images',
            expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /\/images\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-images',
            expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /\/fonts\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  },
  formkit: {
    autoImport: false,
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'preferred-lang',
      redirectOn: 'root',
      cookieCrossOrigin: false,
    },
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
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: '/icons/logo-192.png' },
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', href: '/fonts/Montserrat-Regular.woff2' },
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', href: '/fonts/Montserrat-Bold.woff2' },
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', href: '/fonts/BebasNeue.woff2' },
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', href: '/fonts/AlfaSlabOne-Regular.woff2' },
      ],
      meta: [
        { name: 'theme-color', content: '#1a1a1a' },
        { name: 'mobile-web-app-capable', content: 'yes' },
      ],
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
    },
    '/fonts/**':   { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/icons/**':   { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**':  { headers: { 'cache-control': 'public, max-age=2592000' } },
    '/_ipx/**':    { headers: { 'cache-control': 'public, max-age=2592000' } },
    '/bg.png':     { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/logo.png':   { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/delivery-icon.png': { headers: { 'cache-control': 'public, max-age=2592000' } },
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
        'gsap',
        'gsap/ScrollTrigger',
        'workbox-window',
      ]
    }
  },

  router: {
    options: {}
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
      gzip: true,
    },
  },
})
