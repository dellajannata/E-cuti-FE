export default defineNuxtRouteMiddleware((to, from) => {
  // based on roles
  const FALLBACK_ROUTES = {
    admin: '/dashboard', 
    kabid: '/dashboard_kabid',
    kasubag: '/dashboard_kasubag',
    kadis: '/dashboard_kadis',
    sekretaris: '/dashboard_sekretaris',
    pegawai: '/dashboard_pegawai'
  }

  // hak akses url tiap role
  const ROLE_URLS = {
    admin: ['/dashboard', '/data_pegawai', '/data_pengajuan_cuti', '/data_rekap_cuti', '/pengguna'],
    pegawai: ['/dashboard_pegawai', '/data_pengajuan_cuti_pegawai', '/data_rekap_cuti_pegawai', '/pengguna_pegawai'],
    kabid: ['/dashboard_kabid', '/pengajuan_cuti_acc_kabid', '/rekap_cuti_acc_kabid', '/pengguna_kabid'],
    kasubag: ['/dashboard_kasubag', '/pengajuan_cuti_acc_kasubag_umum', '/rekap_cuti_acc_kasubag', '/pengguna_kasubag'],
    sekretaris: ['/dashboard_sekretaris', '/pengajuan_cuti_acc_sekretaris', '/rekap_cuti_acc_sekretaris', '/pengguna_sekretaris'],
    kadis: ['/dashboard_kadis', '/pengajuan_cuti_acc_kadis', '/rekap_cuti_acc_kadis', '/pengguna_kadis']
  }

  const getUserRole = JSON.parse(localStorage.getItem('user'))
  const userRole = getUserRole ? getUserRole.role : null;
  // console.log(`user role = ${userRole}`)

  const isUrlAllowedForRole = (role, url) => {
    return ROLE_URLS[role].includes(url);
  }

  if (userRole) {
    console.log(`user role = ${userRole}`)
    // redirect setelah login
    if (isUrlAllowedForRole(userRole, to.path)) {
      return
    } else {
      return navigateTo(FALLBACK_ROUTES[userRole]);
    }
  } else {
    return navigateTo('/login')
  }
})