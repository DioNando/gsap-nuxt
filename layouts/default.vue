<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 bg-gray-200">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
