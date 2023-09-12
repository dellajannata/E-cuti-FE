<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <Navbar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_settings-panel.html -->

            <!-- partial -->
            <!-- partial:partials/_sidebar.html -->
            <SidebarAccKabid />
            <!-- partial -->
            <ContentKabid />
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
definePageMeta({
    middleware: ['redirect-login']
})
import SidebarAccKabid from '../components/SidebarAccKabid.vue';
import Navbar from '../components/Navbar.vue';
import ContentKabid from '../components/ContentKabid.vue';

export default {

    components: {
        SidebarAccKabid,
        Navbar,
        ContentKabid
    }
}

</script>