<template>
    <div class="container-scroller">
      <Navbar @toggleSidebar="sidebarControl" @toggleMobile="mobileNavControl" />
      <div class="container-fluid page-body-wrapper">
        <component :is="getSidebarPage" v-if="isSidebarActive" />
        <slot />
      </div>
      <div v-if="isMobileExpand" class="mobile-nav">
        <MobileSidebar />
      </div>
    </div>
  </template>
  
  <script setup>
  import MobileSidebar from '../components/MobileSidebarPegawai.vue';
  import SidebarAccKabid from '../components/SidebarAccKabid.vue';
  import SidebarAccKasubag from '../components/SidebarAccKasubag.vue';
  import SidebarKadis from '../components/SidebarKadis.vue';
  import SidebarPegawai from '../components/SidebarPegawai.vue';
  import SidebarSekretaris from '../components/SidebarSekretaris.vue';
  const isSidebarActive = ref(true)
  const isMobileExpand = ref(false)
  const sidebarControl = () => {
    isSidebarActive.value = !isSidebarActive.value
  }
  const mobileNavControl = () => {
    isMobileExpand.value = !isMobileExpand.value
  }
  const getSidebarPage = computed(() => {
    const path = useRoute().path
    const id = useRoute().params.id 
    console.log(path, id)
    switch (path) {
      // Pegawai
      case '/dashboard_pegawai':
        return resolveComponent('SidebarPegawai')
      case '/data_pengajuan_cuti_pegawai':
        return resolveComponent('SidebarPegawai')
      case '/create_pengajuan_cuti_pegawai':
        return resolveComponent('SidebarPegawai')
      case '/editCuti_:id': // belum solve
        return resolveComponent('SidebarPegawai')
      case '/data_rekap_cuti_pegawai':
        return resolveComponent('SidebarPegawai')
      case '/pengguna_pegawai':
        return resolveComponent('SidebarPegawai')
      case '/editPengguna_:id': // belum solve
        return resolveComponent('SidebarPegawai')

      default:
        return resolveComponent('SidebarPegawai')
    }
  })
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