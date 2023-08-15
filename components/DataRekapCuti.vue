<template>
    <div class="card">
      <div class="card-body">
        <div class="card-pegawai">
          <h4 class="card-title">Data Rekap Cuti</h4>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Status Pengajuan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cuti, index) in data_rekap_cuti" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ cuti.pegawai_id }}</td>
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
  export default {
    data() {
      return {
        data_rekap_cuti: []
      }
    },
    mounted() {
      this.getDataRekapCuti();
    },
    methods: {
      getDataRekapCuti() {
        axios.get('http://127.0.0.1:8000/api/rekap_cuti').then(res => {
          console.log(res.data.data);
          this.data_rekap_cuti = res.data.data;
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
        
      },
    }
  }
  </script>