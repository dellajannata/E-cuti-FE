<template>
    <div class="container-scroller">
        <!-- partial:partials/_sidebar.html -->
        <Sidebar />
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_navbar.html -->
            <Navbar />
            <!-- partial -->
            <Data_Pegawai />
            <!-- main-panel ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>
    
<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Data_Pegawai from '../components/Data_Pegawai.vue';

export default {
    name: 'DataPegawai',
    components: {
        Navbar,
        Sidebar,
        Data_Pegawai
    }
}
</script>
    