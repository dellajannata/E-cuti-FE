<template>
  <div class="card-dashboard">
    <!-- Pengajuan Cuti -->
    <div class="col-lg-3 col-sm-6">
      <div class="card1">
        <div class="card-body">
          <h4 class="card-title">Pengajuan Cuti</h4>
          <div class="d-inline-block">
            <h2>{{ cuti_kabid.length }}</h2>
            <NuxtLink href="/pengajuan_cuti_acc_kabid" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
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
              <NuxtLink to="/rekap_cuti_acc_kabid" class="small-box-footer">Selengkapnya <i class="fa fa-arrow-right"></i></NuxtLink>
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
        cuti_kabid: [],
        rekap_cuti: [],
        data_pegawai: []
      }
    },
    mounted() {
      this.getDataRekapCuti();
      this.getDataCutiKabid();
      this.getDataPegawai();
    },
    computed: {
      getUserUnit() {
        const kabidId = JSON.parse(localStorage.getItem('user')).pegawai_id
        if (this.data_pegawai.length) {
          const filtering = JSON.parse(JSON.stringify(this.data_pegawai.find(item => item.id === kabidId)))
          console.log(filtering.unit_kerja)
          return filtering.unit_kerja
        }
      },
    },
    methods: {
      getDataCutiKabid() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_kabid', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.cuti_kabid = res.data.data.filter(cuti_kabid => cuti_kabid.pegawai.unit_kerja === this.getUserUnit & cuti_kabid.status === "Belum");
          console.log(this.getUserUnit);
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
      getDataRekapCuti() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.rekap_cuti = res.data.data.filter(rekap_cuti => rekap_cuti.pegawai.unit_kerja === this.getUserUnit & rekap_cuti.status === "Selesai");
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
      getDataPegawai() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pegawai_all', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.data_pegawai = res.data.data;
        }).catch(error => {
          console.error('Error fetching pegawai data:', error);
        });
      },
    }
  };
  </script>