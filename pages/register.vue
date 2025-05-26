<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen">
        <Icon name="uil:github" class="logo text-primary" size="5rem" />
        <h1 class="text-2xl">{{ t("register.title") }}</h1>
        <div class="flex flex-col gap-4 w-full max-w-md">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">{{ t("register.email") }}</legend>
            <input type="email" v-model="email" class="input w-full" />
            <p class="label text-error">{{ t(errorMsg) }}</p>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">{{ t("register.password") }}</legend>
            <input type="password" v-model="password" class="input w-full" />
        </fieldset>
        <button @click="signUp" class="btn btn-primary">
            {{ t("register.signup") }}
        </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

const { t } = useI18n();
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref("");

async function signUp() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    navigateTo("/");
  } catch (error: any) {
    errorMsg.value = error.message || "An unexpected error occurred.";
  } finally {
    if (!errorMsg.value) {
      email.value = "";
      password.value = "";
    }
  }
}
</script>
