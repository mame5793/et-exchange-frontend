// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/icon"],

  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["gsap"],
  },

  app: {
    head: {
      title: "CurrencyExchange",
      link: [
        {
          rel: "icon",
          type: "image/webp",
          href: "/xet_logo.webp", // 👈 favicon from /public folder
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Currency Exchange platform",
        },
      ],
    },
  },

  compatibilityDate: "2024-08-16",
})
