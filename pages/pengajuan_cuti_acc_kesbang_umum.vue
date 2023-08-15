<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->
            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <SidebarAccKesbang />
            <!-- partial -->
            <CutiAccKesbang />
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
import SidebarAccKesbang from '../components/SidebarAccKesbang.vue';
import Navbar from '../components/Navbar.vue';
import CutiAccKesbang from '../components/data_by_status/PengajuanCutiAccKesbang.vue';

export default {
    // middleware:'auth',
    components: {
        SidebarAccKesbang,
        Navbar,
        CutiAccKesbang
    }
}
</script>