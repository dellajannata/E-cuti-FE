<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->
            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <SidebarSelesai />
            <!-- partial -->
            <CutiAccSelesai />
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
import SidebarSelesai from '../components/SidebarSelesai.vue';
import Navbar from '../components/Navbar.vue';
import CutiAccSelesai from '../components/data_by_status/PengajuanCutiAccSelesai.vue';

export default {
    // middleware:'auth',
    components: {
        SidebarSelesai,
        Navbar,
        CutiAccSelesai
    }
}
</script>