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
import MobileSidebar from '../components/MobileSidebarKadis.vue';
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

    // Kadis
    case '/dashboard_kadis':
      return resolveComponent('SidebarKadis')
    case '/pengajuan_cuti_acc_kadis':
      return resolveComponent('SidebarKadis')
    case '/rekap_cuti_acc_kadis':
      return resolveComponent('SidebarKadis')
    case '/pengguna_kadis':
      return resolveComponent('SidebarKadis')
    case '/editPenggunaKadis_:id': // belum solve
      return resolveComponent('SidebarKadis')

    default:
      return resolveComponent('SidebarKadis')
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