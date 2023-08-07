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
            <Content />
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
import Content from '../components/Content.vue';
import authMiddleware from '../middleware/auth';

export default {
    auth: true,
    middleware: [authMiddleware],
    beforeMount(){
        const token = localStorage.getItem('access_token');
        if (!token) {
            //MAKA REDIRECT KE HALAMAN LOGIN
            this.$router.push('/login')
        }
    },
    components: {
        Sidebar,
        Navbar,
        Content
    }
}
</script>