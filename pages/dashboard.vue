<template>
    <div class="container-scroller">
      <!-- partial:partials/_navbar.html -->
      <Navbar />
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_settings-panel.html -->
  
        <!-- partial -->
        <!-- partial:partials/_sidebar.html -->
        <Sidebar />
        <!-- partial -->
        <Content />
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
  definePageMeta({
    middleware: ['redirect-login']
  })
  </script>