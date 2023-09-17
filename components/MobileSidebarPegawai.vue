<template>
    <div class="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/dashboard_pegawai">
            <i class="mdi mdi-grid-large menu-icon"></i>
            <span class="menu-title">Dashboard</span>
          </NuxtLink>
        </li>
        <li class="nav-item nav-category ml-2">Data Dan Form</li>
        <li class="nav-item">
          <NuxtLink class="nav-link" data-bs-toggle="collapse" to="/data_pengajuan_cuti_pegawai" aria-expanded="false"
            aria-controls="form-elements">
            <i class="menu-icon mdi mdi-card-text-outline"></i>
            <span class="menu-title">Pengajuan Cuti</span>
            <!-- <i class="menu-arrow"></i> -->
          </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/data_rekap_cuti_pegawai">
            <i class="menu-icon mdi mdi-file-document"></i>
            <span class="menu-title">Rekap Cuti</span>
          </NuxtLink>
        </li>
        <li class="nav-item nav-category ml-2">Data Pengguna</li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="/pengguna_pegawai" aria-expanded="false" aria-controls="auth">
            <i class="menu-icon mdi mdi-account-circle-outline"></i>
            <span class="menu-title">Pengguna</span>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
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
  }
  </style>