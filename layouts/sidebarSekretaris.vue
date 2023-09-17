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

    // Kabid
    case '/dashboard_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/pengajuan_cuti_acc_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/rekap_cuti_acc_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/pengguna_kabid':
      return resolveComponent('SidebarAccKabid')
    case '/editPenggunaKabid_:id': // belum solve
      return resolveComponent('SidebarAccKabid')

    // Kasubag Umum
    case '/dashboard_kasubag':
      return resolveComponent('SidebarAccKasubag')
    case '/pengajuan_cuti_acc_kasubag_umum':
      return resolveComponent('SidebarAccKasubag')
    case '/rekap_cuti_acc_kasubag':
      return resolveComponent('SidebarAccKasubag')
    case '/pengguna_kasubag':
      return resolveComponent('SidebarAccKasubag')
    case '/editPenggunaKasubag_:id': // belum solve
      return resolveComponent('SidebarAccKasubag')
    
    // Sekretaris
    case '/dashboard_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/pengajuan_cuti_acc_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/rekap_cuti_acc_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/pengguna_sekretaris':
      return resolveComponent('SidebarSekretaris')
    case '/editPenggunaSekretaris_:id': // belum solve
      return resolveComponent('SidebarSekretaris')

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
      return resolveComponent('Sidebar')
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