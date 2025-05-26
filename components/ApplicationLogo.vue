<template>
  <div>
    <NuxtLink to="/" class="text-xl p-2 flex items-center gap-2">
      <Icon
        name="majesticons:flower-2"
        class="logo text-primary"
        :size="props.size + 'rem'"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  size?: number;
}>();
</script>
