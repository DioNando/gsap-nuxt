// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: [
    "@hypernym/nuxt-gsap",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/supabase",
    "nuxt-particles",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["@/assets/scss/style.scss", "@/assets/css/style.css"],
  runtimeConfig: {
    public: {
      applicationName: process.env.APPLICATION_NAME,
      baseUrl: process.env.BASE_URL,
      emojisApiUrl: process.env.EMOJIS_API_URL,
    },
  },
  i18n: {
    defaultLocale: "fr",
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English" },
      { code: "fr", language: "fr-FR", file: "fr.json", name: "Français" },
    ],
  },
  supabase: {
    redirect: false,
  },
});
