<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" to="dashboard">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </NuxtLink>
      </li>
      <li class="nav-item nav-category">Data Dan Form</li>
      <li class="nav-item">
        <NuxtLink class="nav-link" data-bs-toggle="collapse" href="/data_pegawai" aria-expanded="false" aria-controls="tables">
          <i class="menu-icon mdi mdi-table"></i>
          <span class="menu-title">Data Pegawai</span>
          <!-- <i class="menu-arrow"></i> -->
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink  class="nav-link" data-bs-toggle="collapse" href="/data_pengajuan_cuti" aria-expanded="false"
          aria-controls="form-elements">
          <i class="menu-icon mdi mdi-card-text-outline"></i>
          <span class="menu-title">Pengajuan Cuti</span>
          <!-- <i class="menu-arrow"></i> -->
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" href="/data_rekap_cuti">
          <i class="menu-icon mdi mdi-file-document"></i>
          <span class="menu-title">Rekap Cuti</span>
        </NuxtLink>
      </li>
      <li class="nav-item nav-category">Data Pengguna</li>
      <li class="nav-item">
        <NuxtLink class="nav-link" data-bs-toggle="collapse" href="/pengguna" aria-expanded="false" aria-controls="auth">
          <i class="menu-icon mdi mdi-account-circle-outline"></i>
          <span class="menu-title">Pengguna</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
a.router-link-active {
  background: #B1141D;
}
a.router-link-active * {
  color: #fff !important;
}
</style>