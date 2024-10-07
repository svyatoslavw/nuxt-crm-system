// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path"

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxt/ui",
    "@prisma/nuxt",
    "@hebilicious/authjs-nuxt"
  ],
  prisma: {
    autoSetupPrisma: true
  },
  icon: {
    serverBundle: {
      collections: ["tabler"]
    }
  },
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie")
  },
  experimental: {
    renderJsonPayloads: true
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL,
        verifyClientOnEveryRequest: true
      }
    }
  }
})
