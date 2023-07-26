<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="dashboard">
              <i class="mdi mdi-grid-large menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class="nav-item nav-category">Data Dan Form</li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="/data_pegawai" aria-expanded="false" aria-controls="tables">
              <i class="menu-icon mdi mdi-table"></i>
              <span class="menu-title">Data Pegawai</span>
              <!-- <i class="menu-arrow"></i> -->
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="/data_pengajuan_cuti" aria-expanded="false" aria-controls="form-elements">
              <i class="menu-icon mdi mdi-card-text-outline"></i>
              <span class="menu-title">Pengajuan Cuti</span>
              <!-- <i class="menu-arrow"></i> -->
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html">
              <i class="menu-icon mdi mdi-file-document"></i>
              <span class="menu-title">Rekap Cuti</span>
            </a>
          </li>
          <li class="nav-item nav-category">Data Pengguna</li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="menu-icon mdi mdi-account-circle-outline"></i>
              <span class="menu-title">Pengguna</span>
            </a>
          </li>
        </ul>
      </nav>
</template>