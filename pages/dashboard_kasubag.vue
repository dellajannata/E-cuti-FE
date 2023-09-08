<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->

            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <SidebarAccKasubag/>
            <!-- partial -->
            <ContentKasubag />
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
import SidebarAccKasubag from '../components/SidebarAccKasubag.vue';
import Navbar from '../components/Navbar.vue';
import ContentKasubag from '../components/ContentKasubag.vue';

export default {
    components: {
        SidebarAccKasubag,
        Navbar,
        ContentKasubag
    }
}
</script>