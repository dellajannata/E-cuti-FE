<template>
  <div class="card-dashboard">
    <!-- Pengajuan Cuti -->
    <div class="col-lg-3 col-sm-6">
      <div class="card1">
        <div class="card-body">
          <h4 class="card-title">Pengajuan Cuti</h4>
          <div class="d-inline-block">
            <h2>{{ cuti_kadis.length }}</h2>
            <NuxtLink href="/pengajuan_cuti_acc_kadis" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
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
            <h2>{{ rekap_cuti.length }}</h2>
            <NuxtLink to="/rekap_cuti_acc_kadis" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
          </div>
          <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
        </div>
      </div>
    </div>
    <!-- User -->
    <!-- Halo, {{ userLoggedin?.name }} -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cuti_kadis: [],
      rekap_cuti: [],
      data_pegawai: [],
      userLoggedin: null,
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.userLoggedin = user;
      this.getDataPegawai();
    },
    getDataCutiKadis() {
      const accessToken = localStorage.getItem('token');
      const unitKerja = this.getUnitKerjaPegawai();

      axios
        .get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_kadis', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.cuti_kadis = res.data.data.filter(
            (cuti_kadis) => cuti_kadis.pegawai.unit_kerja.nama === unitKerja && cuti_kadis.status === 'ACC Sekretaris'
          );
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    getDataRekapCuti() {
      const accessToken = localStorage.getItem('token');
      const unitKerja = this.getUnitKerjaPegawai();

      axios
        .get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.rekap_cuti = res.data.data.filter(
            (rekap_cuti) => rekap_cuti.pegawai.unit_kerja.nama === unitKerja && rekap_cuti.status === 'Selesai'
          );
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    getDataPegawai() {
      const accessToken = localStorage.getItem('token');
      axios
        .get('http://127.0.0.1:8000/api/pegawai_all', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.data_pegawai = res.data.data;
          this.getDataCutiKadis(); 
          this.getDataRekapCuti(); 
        })
        .catch((error) => {
          console.error('Error fetching pegawai data:', error);
        });
    },
    getPegawaiId() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData ? userData.pegawai_id : ''; 
    },
    getUnitKerjaPegawai() {
      const user = this.getPegawaiId();
      const pegawai = this.data_pegawai.find((pegawai) => pegawai.id === user);

      if (pegawai) {
        console.log('Unit Kerja Pegawai:', pegawai.unit_kerja.nama);
        return pegawai.unit_kerja.nama;
      } else {
        console.log('Unit Kerja Pegawai Tidak Tersedia');
        return 'Unit Kerja Pegawai Tidak Tersedia';
      }
    },
  },
};
</script>
