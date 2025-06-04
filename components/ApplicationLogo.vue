<template>
  <div>
    <NuxtLink to="/" class="text-xl p-2 flex items-center gap-2">
      <Icon
        name="majesticons:globe-earth"
        class="logo text-secondary"
        :size="props.size + 'rem'"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  size?: number;
}>();

const config = useRuntimeConfig();
const appName = config.public.appName;
</script>
