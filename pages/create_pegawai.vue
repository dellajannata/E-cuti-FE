<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->
            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <Sidebar />
            <!-- partial -->
            <CreatePegawai />
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
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import CreatePegawai from '../components/CreatePegawai.vue';
import authMiddleware from '../middleware/auth';

export default {
    // auth: true,
    // middleware: [authMiddleware],
    components: {
        Sidebar,
        Navbar,
        CreatePegawai
    },
    // mounted() {
    //     const token = localStorage.getItem('access_token');
    //     if (!token) {
    //         //MAKA REDIRECT KE HALAMAN LOGIN
    //         this.$router.push('/login')
    //     }
    // },
}
</script>