<template>
    <div class="card">
      <div class="card-body">
        <div class="card-pegawai">
          <h4 class="card-title">Data Pegajuan Cuti</h4>
          <a class="btn btn-success" href="/create_pengajuan_cuti">Tambah</a>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Tanggal Awal</th>
                <th>Tanggal Akhir</th>
                <th>Alasan</th>
                <th>Status</th>
                <th>Action</th>
  
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cuti, index) in data_cuti" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ cuti.tgl_awal }}</td>
                <td>{{ cuti.tgl_akhir }}</td>
                <td>{{ cuti.alasan }}</td>
                <td>{{ cuti.status }}</td>
                <td>
                  <button @click="$event => editCuti($event, cuti.id)" class="btn btn-warning btn-sm">Edit</button>
                </td>
                <td><button @click="$event => deleteCuti($event, cuti.id)" class="btn btn-danger btn-sm">Hapus</button></td>
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
        data_cuti: []
      }
    },
    mounted() {
      this.getDataPengajuanCuti();
    },
    methods: {
      getDataPengajuanCuti() {
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti').then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data;
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
      },
      deleteCuti(event, cutiId) {
        if (confirm('Apakah Anda yakin ingin menghapus?')) {
          event.target.innerText = "Deleting";
          axios.delete(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`).then(res => {
            event.target.innerText = "Delete";
            this.getDataPengajuanCuti();
          })
        }
      },
      editCuti(event, cutiId) {
        axios.put(`http://127.0.0.1:8000/api/pengajuan_cuti/${cutiId}`).then(res => {
          this.getDataPengajuanCuti();
        });
      }
    }
  }
  </script>