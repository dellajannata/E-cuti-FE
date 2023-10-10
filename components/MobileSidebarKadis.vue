<template>
    <div class="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/dashboard_kadis">
            <i class="mdi mdi-grid-large menu-icon"></i>
            <span class="menu-title">Dashboard</span>
          </NuxtLink>
        </li>
        <li class="nav-item nav-category ml-2">Data Dan Form</li>
        <li class="nav-item">
          <NuxtLink class="nav-link" data-bs-toggle="collapse" to="/pengajuan_cuti_acc_kadis" aria-expanded="false"
            aria-controls="form-elements">
            <i class="menu-icon mdi mdi-card-text-outline"></i>
            <span class="menu-title">Persetujuan Cuti Kadis</span>
            <!-- <i class="menu-arrow"></i> -->
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/rekap_cuti_acc_kadis">
            <i class="menu-icon mdi mdi-file-document"></i>
            <span class="menu-title">Rekap Cuti</span>
          </NuxtLink>
        </li>
        <li class="nav-item nav-category ml-2">Data Pengguna</li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="/pengguna_kadis" aria-expanded="false" aria-controls="auth">
            <i class="menu-icon mdi mdi-account-circle-outline"></i>
            <span class="menu-title">Pengguna</span>
          </a>
        </li>
        <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" @click="logout()" aria-expanded="false" aria-controls="auth">
          <i class="menu-icon mdi mdi-logout"></i>
          <span class="menu-title">Logout</span>
        </a>
      </li>
      </ul>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      isMobileExpand: false,
      isSidebarOpen: true
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.backLogin()
    },
    backLogin() {
      this.$router.push('/login');
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
      this.$emit('toggleSidebar')
    },
    toggleMobile() {
      this.isMobileExpand = !this.isMobileExpand
      this.$emit('toggleMobile')
    }
  }
}
</script>
<style scoped>
.sidebar {
  width: 100%;
  min-height: 100%;
  background-color: white;
  display: block;
  padding: 12px 0;
}

.nav-link {
  padding-left: 12px !important;
}

a.router-link-active {
  background: #B1141D;
}

a.router-link-active * {
  color: #fff !important;
}</style>