export default defineNuxtRouteMiddleware((to, from) => {
  // based on roles
  const FALLBACK_ROUTES = {
    ADMIN: '/dashboard',
    KABID: '/dashboard_kabid',
    KASUBAG: '/dashboard_kasubag',
    KADIS: '/dashboard_kadis',
    SEKRETARIS: '/dashboard_sekretaris',
    PEGAWAI: '/dashboard_pegawai'
  }

  const getUserRole = JSON.parse(localStorage.getItem('user'))
  const userRole = getUserRole ? getUserRole.role : null;
  // console.log(`user role = ${userRole}`)

  const checkRole = redirectRoute => {
    if (to.path !== redirectRoute && from.path !== redirectRoute) {
      // console.log(redirectRoute)
      return navigateTo(redirectRoute)
    }
  }

  if (userRole) {
    console.log(`user role = ${userRole}`)
    switch (userRole) {
      case 'admin':
        // return checkRole(FALLBACK_ROUTES.ADMIN)
        return
      case 'kabid':
        return checkRole(FALLBACK_ROUTES.KABID)
      case 'kasubag umum':
        return checkRole(FALLBACK_ROUTES.KASUBAG)
      case 'kadis':
        return checkRole(FALLBACK_ROUTES.KADIS)
      case 'sekretaris':
        return checkRole(FALLBACK_ROUTES.SEKRETARIS)
      case 'pegawai':
        return checkRole(FALLBACK_ROUTES.PEGAWAI)
      default:
        return navigateTo('/login')
    }
  } else {
    return navigateTo('/login')
  }
})