<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegawai</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
        <a class="btn btn-primary" href="/create_pegawai">Tambah</a>
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
              <td><template v-if="pegawai.unit_kerja.length > 3">
                  {{ pegawai.unit_kerja.split(' ').slice(0, 3).join('  ') }}
                  <br><br>
                  {{ pegawai.unit_kerja.split(' ').slice(3).join('  ') }}
                </template>
                <template v-else>
                  {{ pegawai.unit_kerja }}
                </template>
              </td>
              <td class="btn-action">
                <NuxtLink :to="`../${pegawai.id}`" class="btn btn-warning btn-sm">Edit</NuxtLink>
                <button @click="deletePegawai(pegawai.id)" class="btn btn-danger btn-sm">Hapus</button>
              </td>
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

export default {
  // auth: true,
  data() {
    return {
      data_pegawai: [],
      searchQuery: ""
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
    search() {
      if (this.searchQuery !== "") {
        axios.get(`http://127.0.0.1:8000/api/pegawai/search/${this.searchQuery}`)
          .then(res => {
            console.log(res.data.data);
            this.data_pegawai = res.data.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {
        this.getDataPegawai();
      }
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
        Swal.fire(
          'Gagal!',
          'Data Anda gagal dihapus karena telah melakukan pengajuan cuti.',
          'warning',
          this.getDataPegawai()
        );
      }
    },
  }
}
</script>