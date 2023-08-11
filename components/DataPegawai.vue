<template>
  <div class="card">
    <div class="card-body">
      <div class="card-pegawai">
        <h4 class="card-title">Data Pegawai</h4>
        <a class="btn btn-success" href="/create_pegawai">Tambah</a>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Pangkat</th>
              <th>NIP</th>
              <th>Alamat</th>
              <th>Unit kerja</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pegawai, index) in data_pegawai" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ pegawai.nama }}</td>
              <td>{{ pegawai.jabatan }}</td>
              <td>{{ pegawai.pangkat }}</td>
              <td>{{ pegawai.nip }}</td>
              <td>{{ pegawai.alamat }}</td>
              <td>{{ pegawai.unit_kerja }}</td>
              <td>
                <NuxtLink :to="`../${pegawai.id}`" class="btn btn-warning btn-sm">Edit</NuxtLink>
              </td>
              <td><button @click="deletePegawai(pegawai.id)" class="btn btn-danger btn-sm">Hapus</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import authMiddleware from '../middleware/auth';

export default {
  // auth: true,
  // middleware: [authMiddleware],
  data() {
    return {
      data_pegawai: []
    }
  },
  mounted() {
    this.getDataPegawai();
  },
  methods: {
    getDataPegawai() {
      const accessToken = localStorage.getItem('access_token');
      axios.get('http://127.0.0.1:8000/api/pegawai').then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    async deletePegawai(pegawaiId) {
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
            await axios.delete(`http://127.0.0.1:8000/api/pegawai/${pegawaiId}`);
            Swal.fire(
              'Berhasil!',
              'Data Anda berhasil dihapus.',
              'success',
              this.getDataPegawai()
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