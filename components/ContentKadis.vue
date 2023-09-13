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
              <a href="/pengajuan_cuti_acc_kadis" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
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
              <a href="/pengajuan_cuti_acc_kadis" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
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
        rekap_cuti: [],
      }
    },
    mounted() {
      this.getDataPengajuanCuti();
    },
    methods: {
      getDataPengajuanCuti() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data.filter(data_cuti => data_cuti.status === "ACC Sekretaris" & data_cuti.status !== "Ditolak");
          this.rekap_cuti = res.data.data.filter(data_cuti => data_cuti.status === "Selesai");
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
    }
  };
  </script>