<template>
  <button class="btn btn-square btn-ghost" @click="toggleTheme">
    <Icon name="majesticons:sun" size="1rem" />
  </button>
</template>

<script setup lang="ts">
const isDark = ref(false);

onMounted(() => {
  // Check if theme is stored in localStorage
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    isDark.value = theme === "dark";
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-theme", "dark");
    isDark.value = true;
  }
});

function toggleTheme() {
  isDark.value = !isDark.value;
  const theme = isDark.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
</script>
