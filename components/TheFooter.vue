<template>
  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <aside>
      <p class="flex items-center">
        {{ t("footer.made_with") }}
        <Icon
          name="majesticons:heart"
          size="1.25rem"
          class="ml-1 text-primary"
        />
      </p>
      <p>{{ t("footer.copyright", { year: new Date().getFullYear() }) }}</p>
    </aside>
  </footer>
</template>

<script setup lang="ts">
const { locales, t, setLocale } = useI18n();
</script>
