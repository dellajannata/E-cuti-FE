<template>
    <nav class="sidebar sidebar-offcanvas per-role" id="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <slot name="dataDashboard"></slot>
        </li>
        <li class="nav-item nav-category">Data Dan Form</li>
        <li class="nav-item">
          <slot name="dataPegawai"></slot>
        </li>
        <li class="nav-item">
          <slot name="dataForm"></slot>
        </li>
        <li class="nav-item">
          <slot name="dataRekap"></slot>
        </li>
        <li class="nav-item nav-category">Data Pengguna</li>
          <li class="nav-item">
            <slot name="dataPengguna"></slot>
          </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'SidebarPerRole'
  }
  </script>
  
  <style scoped>
  :deep(a.router-link-active) {
    background: #B1141D;
  }
  :deep(a.router-link-active *) {
    color: #fff !important;
  }
  </style>