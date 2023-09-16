<template>
    <div class="card-dashboard">
      <!-- Pengajuan Cuti -->
      <div class="col-lg-3 col-sm-6">
        <div class="card1">
          <div class="card-body">
            <h4 class="card-title">Pengajuan Cuti</h4>
            <div class="d-inline-block">
              <h2>{{ data_cuti.length }}</h2>
              <p class="text-white">Ayeee ayee</p>
              <a href="/data_pengajuan_cuti_pegawai" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
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
              <p class="text-white">Uhuyeeyee</p>
              <a href="/data_rekap_cuti_pegawai" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
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
        data_cuti: [],
        data_pegawai: [],
        rekap_cuti: [],
        userLoggedin: JSON.parse(localStorage.getItem('user')),
      }
    },
    mounted() {
      this.getDataPengajuanCuti();
      this.getDataPegawai();
    },
    methods: {
      getIdUserYangLogin() {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData ? userData.id : ''; // Mengambil id pengguna dari objek pengguna 
      },
      getIdPegawai(pegawaiId) {
        const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
        return pegawai ? pegawai.id : 'Id Pegawai Tidak Tersedia';
      },
      getDataPegawai() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pegawai', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.data_pegawai = res.data.data;

          // Setelah data pegawai tersedia, dapat memanggil getDataPengajuanCuti
          this.getDataPengajuanCuti();
        }).catch(error => {
          console.error('Error fetching pegawai data:', error);
        });
      },
      getDataPengajuanCuti() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          const idUser = this.getIdUserYangLogin();
          // Filter data cuti sesuai dengan nama pengguna yang login
          this.data_cuti = res.data.data.filter(data_cuti => {
              return data_cuti.user_id === idUser &
              data_cuti.status !== "Selesai" &
              data_cuti.status !== "Ditolak Kabid" &
              data_cuti.status !== "Ditolak Kasubag Umum" &
              data_cuti.status !== "Ditolak Sekretaris" &
              data_cuti.status !== "Ditolak Kadis";
          });

          // Filter data rekap cuti sesuai dengan nama pengguna yang login
          this.rekap_cuti = res.data.data.filter(data_cuti => {
              return data_cuti.user_id === idUser &
              data_cuti.status === "Selesai";
          });
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
    }
  };
  </script>