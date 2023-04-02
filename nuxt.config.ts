// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
  },
  runtimeConfig: {
    public: {
      mockApiUrl: 'http://localhost:4001',
      dbApiUrl: 'https://perfume-8b21d-default-rtdb.firebaseio.com',
      authApiUrl: 'https://identitytoolkit.googleapis.com/v1',
      firebaseApiKey: '', // override in .env
    },
  },
})
