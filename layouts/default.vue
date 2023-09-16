<template>
    <div class="container-scroller">
      <Navbar @toggleSidebar="sidebarControl" @toggleMobile="mobileNavControl" />
      <div class="container-fluid page-body-wrapper">
        <Sidebar v-if="isSidebarActive" />
        <slot />
      </div>
      <div v-if="isMobileExpand" class="mobile-nav">
        <MobileSidebar />
      </div>
    </div>
  </template>
  
  <script setup>
  import MobileSidebar from '../components/MobileSidebar.vue';
  const isSidebarActive = ref(true)
  const isMobileExpand = ref(false)
  const sidebarControl = () => {
    isSidebarActive.value = !isSidebarActive.value
  }
  const mobileNavControl = () => {
    isMobileExpand.value = !isMobileExpand.value
  }
  </script>
  
  <style scoped>
  .mobile-nav {
    height: calc(100vh - 60px);
    background-color: #fff;
    position: absolute;
    z-index: 2000;
    top: 60px;
    right: 0px;
    width: 70%;
    overflow-y: auto;
    box-shadow: -5px -1px 15px #2e2e2e;
  }
  </style>