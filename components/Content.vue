<template>
    <!-- Pegawai -->
    <div class="col-lg-3 col-sm-6">
        <div class="card"> 
            <div class="card-body"> 
                <h3 class="card-title">Total Pegawai</h3>
                <div class="d-inline-block">
                    <h2>{{ data_pegawai.length }}</h2>
                    <p>Uhuuyy</p>
                </div>
                <span class="float-right display-5 opacity-5"><i class="mdi mdi-account"></i></span>
            </div>
        </div>
    </div>       
    
    <!-- Pengajuan Cuti -->
    <div class="col-lg-3 col-sm-6">
        <div class="card"> 
            <div class="card-body"> 
                <h3 class="card-title">Pengajuan Cuti</h3>
                <div class="d-inline-block">
                    <h2>{{ data_cuti.length }}</h2>
                    <p class="text-white">Ayeee ayee</p>
                </div>
                <span class="float-right display-5 opacity-5"><i class="mdi mdi-animation"></i></span>
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
      data_cuti: []
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
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
}
};
</script>