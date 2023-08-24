<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegajuan Cuti Kasubag Umum</h4>

      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
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
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in data_cuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getNamaPegawai(cuti.pegawai_id) }}</td>
              <td>{{ cuti.tgl_awal }}</td>
              <td>{{ cuti.tgl_akhir }}</td>
              <td>{{ cuti.alasan }}</td>
              <td v-if="cuti.status == 'ACC Kasubag Umum'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'ACC Sekretaris'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'ACC Kadis'">
                Sudah disetujui
              </td>
              <td v-else-if="cuti.status == 'Selesai'">
                Sudah disetujui
              </td>
              <td v-else class="btn-action">
                <button @click="validasi(cuti.id)" class="btn btn-warning btn-sm">ACC</button>
                <button @click="validasiTolak(cuti.id)" class="btn btn-danger btn-sm">Tolak</button>
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
  computed: {
    filteredCutiList() {
      return this.data_cuti.filter(cuti => cuti.pegawai_id === 11);
    },
  },
  methods: {
    search() {
      if (this.searchQuery !== "") {
        axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`)
          .then(res => {
            console.log(res.data.data);
            this.data_cuti = res.data.data.filter(cuti => cuti.status === "ACC Kadis");
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {
        this.getDataPengajuanCuti();
      }
    },
    getDataPengajuanCuti() {
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_kasubag').then(res => {
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
            await axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti_acc_kasubag/${cutiId}`);
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
    async validasiTolak(cutiId) {
      try {
        const result = await Swal.fire({
          title: 'Apakah Anda yakin akan menolak pengajuan cuti?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, tolak!'
        });

        if (result.isConfirmed) {
          if (!this.rememberMe) {
            const accessToken = localStorage.getItem('access_token');
            await axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti_tolak/${cutiId}`);
            Swal.fire(
              'Berhasil!',
              'Pengajuan cuti berhasil ditolak.',
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