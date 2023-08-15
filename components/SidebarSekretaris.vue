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
            <a class="nav-link" href="/pengajuan_cuti_acc_sekretaris">
              <i class="menu-icon mdi mdi-file-document"></i>
              <span class="menu-title">Pengajuan Cuti Sekretaris</span>
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