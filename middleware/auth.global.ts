export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const isAuthenticated = !!user.value;


  if (!isAuthenticated && to.path === "/dashboard") {
    return navigateTo("/");
  }

  if (isAuthenticated && to.path === "/login") {
    return navigateTo("/");
  }

  if (isAuthenticated && to.path === "/register") {
    return navigateTo("/");
  }
});
