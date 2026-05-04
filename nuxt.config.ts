// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon','@pinia/nuxt','@formkit/nuxt','@nuxtjs/tailwindcss','@tailwindcss/typography'],
  formkit: {
    autoImport: true,
  },
  vite: {
    optimizeDeps: {
      include: [
        'pinia',
        'vue3-toastify', // TO DO ANOTHER PACKAGE
      ]
    }
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWTSECRET,
  },
  build: {
    transpile: ["gsap"],
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