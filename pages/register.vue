<template>
  <div class="flex justify-center">
    <div class="card bg-base-100 shadow-xl w-full max-w-md">
      <div class="card-body flex flex-col items-center gap-4">
        <ApplicationLogo :size="5" />
        <h1 class="text-2xl">{{ t("register.title") }}</h1>
        <FormsRegister />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

const { t } = useI18n();
</script>
