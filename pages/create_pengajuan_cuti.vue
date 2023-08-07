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
            <CreateCuti />
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
import CreateCuti from '../components/CreateCuti.vue';

export default {
  middleware:'auth',
  components: {
    Sidebar,
    Navbar,
    CreateCuti
  }
}
</script>