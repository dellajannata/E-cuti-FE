<template>
  <div class="card-dashboard">
    <!-- Pegawai -->
    <div class="col-lg-3 col-sm-6">
        <div class="card1"> 
            <div class="card-body"> 
                <h4 class="card-title">Total Pegawai</h4>
                <div class="d-inline-block">
                    <h2>{{ data_pegawai.length }}</h2>
                    <p class="text-white">Uhuuyy</p>
                    <a href="/data_pegawai" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
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
                    <p class="text-white">Ayeee ayee</p>
                    <a href="/data_pengajuan_cuti" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
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
                    <a href="/data_rekap_cuti" class="small-box-footer">More info <i class="fa fa-arrow-right"></i></a>
                </div>
                <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
            </div>
        </div>
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
      rekap_cuti: []
    }
  },
  mounted() {
    this.getDataPegawai();
    this.getDataPengajuanCuti();
  },
  methods: {
    getDataPegawai() {
      axios.get('http://127.0.0.1:8000/api/pegawai').then(res => {
        console.log(res.data.data);
        this.data_pegawai = res.data.data;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    getDataPengajuanCuti() {
      axios.get('http://127.0.0.1:8000/api/pengajuan_cuti').then(res => {
        console.log(res.data.data);
        this.data_cuti = res.data.data;
        this.rekap_cuti = res.data.data.filter(data_cuti => data_cuti.status === "Selesai");
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
}
};
</script>