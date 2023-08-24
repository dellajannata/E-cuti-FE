<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->
            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <SidebarPegawai />
            <!-- partial -->
            <PengajuanCutiKeseluruhan />
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <!-- <Footer/> -->
            <!-- partial -->

            <!-- main-panel ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>
<script>
import SidebarPegawai from '../components/SidebarPegawai.vue';
import Navbar from '../components/Navbar.vue';
import PengajuanCutiKeseluruhan from '../components/PengajuanCutiKeseluruhan.vue';

export default {
    // middleware:'auth',
    components: {
        SidebarPegawai,
        Navbar,
        PengajuanCutiKeseluruhan
    }
}
</script>