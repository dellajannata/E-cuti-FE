export default defineNuxtRouteMiddleware((to, from) => {
  // based on roles
  const FALLBACK_ROUTES = {
    ADMIN: '/dashboard',
    KABID: '/pengajuan_cuti_acc_kabid',
    KASUBAG: '/pengajuan_cuti_acc_kasubag',
    KADIS: '/pengajuan_cuti_acc_kadis',
    SEKRETARIS: '/pengajuan_cuti_acc_sekretaris',
    PEGAWAI: '/data_pengajuan_cuti'
  }

  const getUserRole = JSON.parse(localStorage.getItem('user'))
  const userRole = getUserRole ? getUserRole.role : null;
  console.log(`user role = ${userRole}`)

  const checkRole = redirectRoute => {
    if (to.path !== redirectRoute && from.path !== redirectRoute) {
      console.log(redirectRoute)
      return navigateTo(redirectRoute)
    }
  }

  if (userRole) {
    console.log(`user role = ${userRole}`)
    switch (userRole) {
      case 'admin':
        return checkRole(FALLBACK_ROUTES.ADMIN)
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