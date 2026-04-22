// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
      },
    ],
    '@zadigetvoltaire/nuxt-gtm',
  ],
  imports: {
    dirs: ['stores'],
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      dbApiUrl: process.env.NUXT_DB_API_URL,
      authApiUrl: process.env.NUXT_AUTH_API_URL,
      firebaseApiKey: '', // override in .env
    },
  },
  gtm: {
    id: 'GTM-WWTCV42S',
  },
})
