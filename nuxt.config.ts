// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', 'nuxt-lucide-icons'],
  runtimeConfig: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://badger-staging.worldwidepixel.ca' : 'http://localhost:3000'
  }
})
