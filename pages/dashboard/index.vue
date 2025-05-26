<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <h1 class="text-2xl">{{ t("dashboard.title") }}</h1>
    <div class="flex flex-col gap-4 w-full max-w-md">
      <p>{{ t("dashboard.welcome") }} <span>{{ displayName }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const { t } = useI18n();
const user = useSupabaseUser();
const displayName = computed(
  () => user.value?.user_metadata.display_name || "Guest"
);
</script>
