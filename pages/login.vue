<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <Icon name="uil:github" class="logo text-primary" size="5rem" />
    <h1 class="text-2xl">{{ t("welcome") }}</h1>
    <div class="flex flex-col gap-4 w-full max-w-md">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Email</legend>
        <input type="email" v-model="email" class="input w-full" />
        <p class="label text-error">{{ t(errorMsg) }}</p>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Password</legend>
        <input type="password" v-model="password" class="input w-full" />
      </fieldset>
      <button @click="signIn" class="btn btn-primary">
        {{ t("login.signin_with_email") }}
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
const errorMsg = ref<string>("");

async function signIn() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    navigateTo("/dashboard");
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
