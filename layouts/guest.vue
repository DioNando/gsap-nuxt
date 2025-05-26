<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <div class="navbar bg-base-200">
      <div class="navbar-start">
        <ApplicationLogo />
      </div>
      <div class="navbar-end flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggler />
      </div>
    </div>
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © 2025 - All rights reserved</p>
      </aside>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
});

const { locales, t, setLocale } = useI18n();
</script>
