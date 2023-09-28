/**
 * nama file selain 'auth' karena akan bentrok dengan default dari package nuxt-sanctum-auth
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("token");
  // if (!token) {
  //   console.log("ini dari middleware");
  //   return navigateTo("/login");
  // }
});