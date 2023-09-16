<template>
  <SidebarPerRole>
    <template #dataDashboard>
      <NuxtLink class="nav-link" to="dashboard">
        <i class="mdi mdi-grid-large menu-icon"></i>
        <span class="menu-title">Dashboard</span>
      </NuxtLink>
    </template>
    <template #dataPegawai>
      <NuxtLink class="nav-link" data-bs-toggle="collapse" href="/data_pegawai" aria-expanded="false" aria-controls="tables">
        <i class="menu-icon mdi mdi-table"></i>
        <span class="menu-title">Data Pegawai</span>
      </NuxtLink> 
    </template>
    <template #dataForm>
      <NuxtLink class="nav-link" to="/data_pengajuan_cuti">
        <i class="menu-icon mdi mdi-card-text-outline"></i>
        <span class="menu-title">Data Pengajuan Cuti</span>
      </NuxtLink>
    </template>
    <template #dataRekap>
      <NuxtLink class="nav-link" href="/data_rekap_cuti">
        <i class="menu-icon mdi mdi-file-document"></i>
        <span class="menu-title">Rekap Cuti</span>
      </NuxtLink>
    </template>
    <template #dataPengguna>
      <NuxtLink class="nav-link" data-bs-toggle="collapse" href="/pengguna" aria-expanded="false" aria-controls="auth">
        <i class="menu-icon mdi mdi-account-circle-outline"></i>
        <span class="menu-title">Pengguna</span>
      </NuxtLink>
    </template>
  </SidebarPerRole>
</template>

<script>
import SidebarPerRole from './SidebarPerRole.vue';
</script>

