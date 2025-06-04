<template>
  <div class="container mx-auto px-4 py-4 lg:py-8">
    <UiHero />
    <UiCaroussel />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

const { t } = useI18n();
</script>