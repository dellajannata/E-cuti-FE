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
                <td>{{ filteredCuti[0].pegawai.nama }}</td>
                <td>{{ filteredCuti[0].pegawai.unit_kerja }}</td>
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
    },
    methods: {
      search() {
        if (this.searchQuery !== "") {
          const accessToken = localStorage.getItem('token');
          axios.get(`http://127.0.0.1:8000/api/pengajuan_cuti_all/search/${this.searchQuery}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            })
            .then(res => {
              console.log(res.data.data);

              if (res.data.data !== null) {
              // Cek apakah ada hasil pencarian
              if (res.data.data.length === 0) {
                // Jika tidak ada hasil yang cocok, set data_cuti sebagai array kosong
                this.data_cuti = [];
              } else {
                // Jika ada hasil pencarian
                this.data_cuti = res.data.data.filter(cuti => cuti.status === "Selesai");
              }
              this.totalPages = res.data.pagination.last_page;
            } else {
              // Respons data null, set data_cuti sebagai array kosong
              this.data_cuti = [];
            }
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
        axios.get('http://127.0.0.1:8000/api/pengajuan_cuti_all', {
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
      getTotalCuti(pegawaiId) {
        const totalCutiSelesai = this.filteredCuti.length;
        return totalCutiSelesai;
      }
    }
  }
  </script>