<template>
  <div class="dropdown">
    <div
      tabindex="0"
      role="button"
      class="btn btn-outline btn-sm btn-square text-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <text
          x="12"
          y="16.5"
          text-anchor="middle"
          font-size="14"
          font-family="sans-serif"
          fill="currentColor"
          stroke="none"
        >
          文
        </text>      </svg>
     <span class="hidden"> {{ t("language.current") }}</span>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 mt-2 shadow-sm"
    >
      <li v-for="locale in locales" :key="locale.code">
        <button
          @click="setLocale(locale.code)"
          class=""
          :class="{ 'text-primary': $i18n.locale === locale.code }"
        >
          {{ locale.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { locales, t, setLocale } = useI18n();
</script>
