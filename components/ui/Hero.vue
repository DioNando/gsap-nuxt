<template>
  <!-- Hero Section -->
  <div class="hero bg-base-200 rounded-lg mb-4">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h2 class="text-3xl font-bold">{{ t("homepage.hero.title") }}</h2>
        <p class="py-6">
          {{ t("homepage.hero.description") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
