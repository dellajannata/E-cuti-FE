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
import MobileSidebar from '../components/MobileSidebarSekretaris.vue';
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
    // Sekretaris
    case '/dashboard_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/data_pengajuan_cuti_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/pengajuan_cuti_acc_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/rekap_cuti_acc_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/pengguna_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/editPenggunaSekretaris_:id': // belum solve
      return resolveComponent('SidebarSekretaris')

    default:
      return resolveComponent('SidebarSekretaris')
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