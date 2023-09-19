<template>
  <div class="card-dashboard">
    <!-- Pengajuan Cuti -->
    <div class="col-lg-3 col-sm-6">
      <div class="card1">
        <div class="card-body">
          <h4 class="card-title">Pengajuan Cuti</h4>
          <div class="d-inline-block">
            <h2>{{ cuti_sekretaris.length }}</h2>
            <a href="/pengajuan_cuti_acc_sekretaris" class="small-box-footer">Selengkapnya <i
                class="fa fa-arrow-right"></i></a>
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
            <a href="/pengajuan_cuti_acc_sekretaris" class="small-box-footer">Selengkapnya <i
                class="fa fa-arrow-right"></i></a>
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
        cuti_sekretaris: [],
        rekap_cuti: [],
        data_pegawai: []
      }
    },
    mounted() {
      this.getDataCutiSekretaris();
      this.getDataRekapCuti();
      this.getDataPegawai();
    },
    computed: {
      getUserUnit() {
        const SekretarisId = JSON.parse(localStorage.getItem('user')).pegawai_id
        if (this.data_pegawai.length) {
          const filtering = JSON.parse(JSON.stringify(this.data_pegawai.find(item => item.id === SekretarisId)))
          console.log(filtering.unit_kerja)
          return filtering.unit_kerja
        }
      },
    },
    methods: {
      getDataCutiSekretaris() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_acc_sekretaris', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.cuti_sekretaris = res.data.data.filter(data_cuti => data_cuti.pegawai.unit_kerja === this.getUserUnit  & data_cuti.status === "ACC Kasubag Umum");
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