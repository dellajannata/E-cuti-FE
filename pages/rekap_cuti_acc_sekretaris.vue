<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->
            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <SidebarSekretaris />
            <!-- partial -->
            <RekapCutiSekretaris />
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
import SidebarSekretaris from '../components/SidebarSekretaris.vue';
import Navbar from '../components/Navbar.vue';
import RekapCutiSekretaris from '../components/DataRekapCutiSelesai.vue';

export default {
    components: {
        SidebarSekretaris,
        Navbar,
        RekapCutiSekretaris
    }
}
</script>