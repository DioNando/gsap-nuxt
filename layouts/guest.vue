<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 flex flex-col item-center justify-center">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
