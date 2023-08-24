<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Data Pegajuan Cuti Pegawai</h4>
      <div class="card-pegawai">
        <div class="search__container">
          <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
          <i class="fa fa-search search__icon"></i>
        </div>
        <router-link class="btn btn-primary" :to="'/create_pengajuan_cuti'">Tambah</router-link>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Unit Kerja</th>
              <th>Tanggal Awal</th>
              <th>Tanggal Akhir</th>
              <th>Alasan</th>
              <th>Waktu Pengajuan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in data_cuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getNamaPegawai(cuti.pegawai_id) }}</td>
              <td>{{ formatUnitKerja(getUnitKerja(cuti.pegawai_id)) }}</td>
              <td>{{ cuti.tgl_awal }}</td>
              <td>{{ cuti.tgl_akhir }}</td>
              <td>{{ cuti.alasan }}</td>
              <td>{{ waktu_pengajuan(cuti.created_at) }}</td>
              <td>{{ cuti.status }}</td>
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
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti')
        .then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getDataPegawai() {
      axios.get('http://127.0.0.1:8000/api/pegawai')
        .then(res => {
          console.log(res.data.data);
          this.data_pegawai = res.data.data;
        })
        .catch(error => {
          console.error('Error fetching pegawai data:', error);
        });
    },
    getNamaPegawai(pegawaiId) {
      const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
      return pegawai ? pegawai.nama : 'Nama Pegawai Tidak Tersedia';
    },
    getUnitKerja(pegawaiId) {
      const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
      return pegawai ? pegawai.unit_kerja : 'Unit Kerja Tidak Tersedia';
    },
    formatUnitKerja(unitKerja) {
      if (unitKerja.split(' ').length > 3) {
        const parts = unitKerja.split(' ');
        return `${parts.slice(0, 3).join(' ')}<br><br>${parts.slice(3).join(' ')}`;
      }
      return unitKerja;
    },
    waktu_pengajuan(timestamp) {
      const jakartaTimeZone = 'Asia/Jakarta';
      const created_at = new Date(timestamp);
      const jakartaTime = new Date(created_at.toLocaleString("en-US", { timeZone: jakartaTimeZone }));

      // Opsi untuk menghilangkan zona waktu (GMT +7)
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false // Menggunakan format 24 jam
      };
      const formattedTime = jakartaTime.toLocaleString("en-US", options).replace(/,/, '');
      return formattedTime.replace(/\//g, '-');
    },
  }
}
</script>