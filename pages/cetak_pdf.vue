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
            <a class="btn btn-priamry"  @click="cetak_pdf(pegawai.id)">Cetak_pdf</a>
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
import axios from 'axios';
import Swal from 'sweetalert2';
import authMiddleware from '../middleware/auth';

export default {
  auth: true,
  middleware: [authMiddleware],
  data() {
    return {
      data_pegawai: []
    }
  },
  methods: {
    async cetak_pdf(pegawaiId) {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan menghapus data?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus data ini!'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('access_token');
            await axios.get(`http://127.0.0.1:8000/api/cetak-pdf/${pegawaiId}`);
            Swal.fire(
              'Berhasil!',
              'Data Anda berhasil dihapus.',
              'success',
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>