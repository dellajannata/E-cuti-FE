<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Rekapan Cuti Pegawai</h4>
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
              <th>Total Pengajuan Cuti</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cuti, index) in filteredCuti" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ cuti.pegawai.nama }}</td>
              <td>{{ cuti.pegawai.unit_kerja }}</td>
              <td>{{ cuti.totalCuti }}</td>
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
  mounted() {
    this.getDataPengajuanCuti();
    this.getDataPegawai();
  },
  computed: {
    filteredCuti() {
      const uniqueCuti = {};
      if (this.data_cuti.length) {
        this.data_cuti.forEach(item => {
          if (item.status === 'Selesai') {
            uniqueCuti[item.user_id] = uniqueCuti[item.user_id] || { totalCuti: 0, pegawai: item.pegawai };
            uniqueCuti[item.user_id].totalCuti++;
          }
        });
        return Object.values(uniqueCuti);
      } else {
        return [];
      }
    },
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
            
            if (res.data.data !== null) {
              // Cek apakah ada hasil pencarian
              if (res.data.data.length === 0) {
                // Jika tidak ada hasil yang cocok, set data_cuti sebagai array kosong
                this.data_cuti = [];
              } else {
                // Jika ada hasil pencarian, filter data berdasarkan status yang "Selesai"
                this.data_cuti = res.data.data.filter(cuti => cuti.status === 'Selesai');
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
}
</script>
