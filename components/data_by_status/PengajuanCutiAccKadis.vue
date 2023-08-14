<template>
  <div class="card">
    <h4 class="card-title">Data Pegajuan Cuti Kadis</h4>
    <div class="card-body">
      <div class="card-pegawai">
        <div class="search">
          <input class="search__input" type="text" placeholder="Search" v-model="searchQuery" @input="search">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Tanggal Awal</th>
              <th>Tanggal Akhir</th>
              <th>Alasan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in data_cuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getNamaPegawai(cuti.pegawai_id) }}</td>
              <td>{{ cuti.tgl_awal }}</td>
              <td>{{ cuti.tgl_akhir }}</td>
              <td>{{ cuti.alasan }}</td>
              <td>
                <button @click="validasi(cuti.id)" class="btn btn-warning btn-sm">ACC</button>
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
  data() {
    return {
      data_cuti: [],
      data_pegawai: [],
      searchQuery: ""
    }
  },
  mounted() {
    this.getDataPengajuanCuti();
    this.getDataPegawai();
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`)
          .then(res => {
            console.log(res.data.data);
            this.data_cuti = res.data.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {
        this.getDataPengajuanCuti();
      }
    },
    getDataPengajuanCuti() {
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_kadis').then(res => {
        console.log(res.data.data);
        this.data_cuti = res.data.data;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getDataPegawai() {
      axios.get('http://127.0.0.1:8000/api/pegawai', {
      }).then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      }).catch(error => {
        console.error('Error fetching pegawai data:', error);
      });
    },
    getNamaPegawai(pegawaiId) {
      const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
      return pegawai ? pegawai.nama : 'Nama Pegawai Tidak Tersedia';
    },
    async validasi(cutiId) {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan menyetujui pengajuan cuti?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, setuju!'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('access_token');
            await axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti_acc_kadis/${cutiId}`);
            Swal.fire(
              'Berhasil!',
              'Pengajuan cuti berhasil disetujui.',
              'success',
              this.getDataPengajuanCuti()
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