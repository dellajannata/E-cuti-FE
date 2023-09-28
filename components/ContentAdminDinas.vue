<template>
  <div class="card">
    <div class="card-dashboard">
      <h3>{{ unitNama }}</h3>
      <!-- Pegawai -->
      <div class="dashboard-content">
        <div class="col-lg-3 col-sm-6">
          <div class="card1">
            <div class="card-body">
              <h4 class="card-title">Total Pegawai</h4>
              <div class="d-inline-block">
                <h2>{{ filterByUnitKerja.length }}</h2>
                <a href="/data_pegawai" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></a>
              </div>
              <span class="float-right display-5 opacity-5"><i class="mdi mdi-account"></i></span>
            </div>
          </div>
        </div>

        <!-- Pengajuan Cuti -->
        <div class="col-lg-3 col-sm-6">
          <div class="card1">
            <div class="card-body">
              <h4 class="card-title">Pengajuan Cuti</h4>
              <div class="d-inline-block">
                <h2>{{ data_cuti.length }}</h2>
                <a href="/data_pengajuan_cuti" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></a>
              </div>
              <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
            </div>
          </div>
        </div>

        <!-- Rekap Cuti -->
        <div class="col-lg-3 col-sm-6">
          <div class="card1">
            <div class="card-body">
              <h4 class="card-title">Rekap Cuti</h4>
              <div class="d-inline-block">
                <h2>{{ getUniqueUserIds(rekap_cuti).length }}</h2>
                <a href="/data_rekap_cuti" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></a>
              </div>
              <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
            </div>
          </div>
        </div>
      </div>
      <!-- User -->
      <!-- Halo, {{ userLoggedin?.name }} -->
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      data_pegawai: [],
      data_cuti: [],
      rekap_cuti: [],
      unitNama: ''
    }
  },
  mounted() {
    this.getDataPegawai();
    this.getDataPengajuanCuti();
  },
  computed: {
    filterByUnitKerja() {
      const unitKerja = this.getUnitKerja();
      const filteredData = this.data_pegawai.filter(item => {
        return item.unit_kerja.nama === unitKerja;
      });
      console.log(filteredData);
      return filteredData;
    },
  },
  methods: {
    getDataPegawai() {
      const accessToken = localStorage.getItem('token');

      axios.get('http://127.0.0.1:8000/api/pegawai_all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
        this.getDataPengajuanCuti();
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getDataPengajuanCuti() {
      const accessToken = localStorage.getItem('token');
      const unitKerja = this.getUnitKerja();
      console.log(unitKerja);

      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => {
        console.log(res.data.data);
        this.data_cuti = res.data.data.filter(
          (data_cuti) => data_cuti.pegawai.unit_kerja.nama === unitKerja && data_cuti.status === "Belum" | data_cuti.status.includes('ACC')
        );
        this.rekap_cuti = res.data.data.filter(
          (rekap_cuti) => rekap_cuti.pegawai.unit_kerja.nama === unitKerja && rekap_cuti.status === 'Selesai'
        );
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getPegawaiId() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData ? userData.pegawai_id : ''; // Mengambil id user dari objek pengguna
    },
    getUnitKerja() {
      const user = this.getPegawaiId();
      console.log(user);
      const pegawai = this.data_pegawai.find((pegawai) => pegawai.id === user);

      if (pegawai) {
        console.log('Unit Kerja Pegawai:', pegawai.unit_kerja.nama);
        this.unitNama = pegawai.unit_kerja.nama;
        return pegawai.unit_kerja.nama;
      } else {
        console.log('Unit Kerja Tidak Tersedia');
        return 'Unit Kerja Tidak Tersedia';
      }
    },
    getUniqueUserIds(cutiData) {
      // Menggunakan Set untuk mendapatkan nilai unik dari user_id
      const uniqueUserIds = new Set(cutiData.map(cuti => cuti.user_id));
      return [...uniqueUserIds];
    }
  }
};
</script>