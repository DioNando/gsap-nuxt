export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const isAuthenticated = !!user.value;

  // if (!isAuthenticated && to.path !== "/login") {
  //   return navigateTo("/login");
  // }

  // if (isAuthenticated && to.path === "/login") {
  //   return navigateTo("/");
  // }
});
