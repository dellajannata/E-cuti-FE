<template>
    <div class="container-scroller">
      <!-- partial:partials/_navbar.html -->
      <Navbar />
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_settings-panel.html -->
        <!-- partial -->
        <!-- partial:partials/_sidebar.html -->
        <SidebarAccKasubag />
        <!-- partial -->
        <CutiAccSekretaris />
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <!-- <Footer/> -->
        <!-- partial -->
  
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </template>
  <script setup>
  import SidebarAccKasubag from '../components/SidebarAccKasubag.vue';
  import Navbar from '../components/Navbar.vue';
  import CutiAccSekretaris from '../components/data_by_status/PengajuanCutiAccSekretaris.vue';
  
  definePageMeta({
    middleware: ['redirect-login']
  })
  </script>