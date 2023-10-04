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
import MobileSidebar from '../components/MobileSidebarKabid.vue';
import SidebarAccKabid from '../components/SidebarAccKabid.vue';
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

    // Kabid
    case '/dashboard_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/data_pengajuan_cuti_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/pengajuan_cuti_acc_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/rekap_cuti_acc_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/pengguna_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/editPenggunaKabid_:id': // belum solve
      return resolveComponent('SidebarAccKabid')

    default:
      return resolveComponent('SidebarAccKabid')
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