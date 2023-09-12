<template>
    <div class="card">
      <div class="card-body">
      <h4 class="card-title">Rekapan Cuti</h4>
        <div class="card-pegawai">
          <div class="search__container">
            <input class="search__input" type="text" placeholder="Nama/unit kerja" v-model="searchQuery" @input="search">
            <i class="fa fa-search search__icon"></i>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>Unit Kerja</th>
                <th>Total Pegajuan Cuti</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredCuti.length > 0">
                <td>1</td>
                <td>{{ getNamaPegawai(filteredCuti[0].user_id) }}</td>
                <td>
                  <template v-if="getUnitKerja(filteredCuti[0].user_id).split(' ').length > 3">
                    {{ getUnitKerja(filteredCuti[0].user_id).split(' ').slice(0, 3).join(' ') }}<br><br>
                    {{ getUnitKerja(filteredCuti[0].user_id).split(' ').slice(3).join(' ') }}
                  </template>
                  <template v-else>
                    {{ getUnitKerja(filteredCuti[0].user_id) }}
                  </template>
                </td>
                <td>{{ getTotalCuti(filteredCuti[0].user_id) }}</td>
              </tr>
              <tr v-else>
                <td colspan="4">Belum mengajukan cuti / Pengajuan cuti masih dalam proses ACC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        data_cuti: [],
        data_pegawai: [],
        searchQuery: ""
      }
    },
    computed: {
      filteredCuti() {
        const idUser = this.getIdUserYangLogin(); // Mengambil nama pengguna dari localStorage 1

        // Filter data cuti berdasarkan nama pengguna yang login
        return this.data_cuti.filter(cuti => cuti.user_id === idUser & cuti.status === "Selesai");
      },
    },
    mounted() {
      this.getDataPengajuanCuti();
      this.getDataPegawai();
    },
    methods: {
      search() {
        if (this.searchQuery !== "") {
          const accessToken = localStorage.getItem('token');
          axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti/search/${this.searchQuery}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            })
            .then(res => {
              console.log(res.data.data);
              this.data_cuti = res.data.data.filter(cuti => cuti.status === "Selesai");
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        } else {
          this.getDataPengajuanCuti();
        }
      },
      getIdUserYangLogin() {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData ? userData.id : ''; // Mengambil id pengguna dari objek pengguna
      },
      getDataPengajuanCuti() {
        const accessToken = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
          console.log(res.data.data);
          this.data_cuti = res.data.data;
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
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
        }).catch(error => {
          console.error('Error fetching pegawai data:', error);
        });
      },
      getIdPegawai(pegawaiId) {
        const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
        return pegawai ? pegawai.id : 'Id Pegawai Tidak Tersedia';
      },
      getPegawaiId() {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData ? userData.pegawai_id : ''; // Mengambil id user dari objek pengguna 
      },
      getNamaPegawai(userId) { //2
        const user = this.getPegawaiId(); 
        const pegawai = this.data_pegawai.find(pegawai => pegawai.id === user);
        return pegawai ? pegawai.nama : 'Nama Pegawai Tidak Tersedia';
      },
      getUnitKerja(pegawaiId) {
        const pegawai = this.data_pegawai.find(pegawai => pegawai.id === pegawaiId);
        return pegawai ? pegawai.unit_kerja : 'Unit Kerja Tidak Tersedia';
      },
      getTotalCuti(pegawaiId) {
        const totalCutiSelesai = this.filteredCuti.length;
        return totalCutiSelesai;
      }
    }
  }
  </script>