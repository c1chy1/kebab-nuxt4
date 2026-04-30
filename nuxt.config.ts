// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon',"@pinia/nuxt",'@formkit/nuxt'],
  vite: {
    optimizeDeps: {
      include: [
        'pinia',
        'vue3-toastify',
      ]
    }
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWTSECRET,
  },

  nitro: {
    plugins: ["~~/server/plugins/mongodb.ts"],
  },

})