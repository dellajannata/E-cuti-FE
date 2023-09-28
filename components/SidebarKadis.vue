<template>
  <SidebarPerRole>
    <template #dataDashboard>
    <NuxtLink class="nav-link" to="/dashboard_kadis">
        <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Dashboard</span>
    </NuxtLink>
    </template>
    <template #dataForm>
      <NuxtLink class="nav-link" to="/pengajuan_cuti_acc_kadis">
        <i class="menu-icon mdi mdi-file-document"></i>
        <span class="menu-title">Persetujuan Cuti Kadis</span>
      </NuxtLink>
    </template>
    <template #dataRekap>
      <NuxtLink class="nav-link" to="/rekap_cuti_acc_kadis">
        <i class="menu-icon mdi mdi-file-document"></i>
        <span class="menu-title">Data Rekap Cuti</span>
      </NuxtLink>
    </template>
    <template #dataPengguna>
      <NuxtLink class="nav-link" data-bs-toggle="collapse" href="/pengguna_kadis" aria-expanded="false" aria-controls="auth">
        <i class="menu-icon mdi mdi-account-circle-outline"></i>
        <span class="menu-title">Pengguna</span>
      </NuxtLink>
    </template>
  </SidebarPerRole>
</template>

<script>
import SidebarPerRole from './SidebarPerRole.vue';
</script>